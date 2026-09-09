module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({ status: "API is alive, use POST" });
    }

    const { messages, catalog, enrolledIds } = req.body || {};

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: "ANTHROPIC_API_KEY is missing on server" });
    }

    const systemPrompt = `أنت مساعد توجيه تعليمي في منصة "أطلس" التعليمية.
قائمة الكورسات المتاحة (متخترعش كورس مش موجود في القائمة):
${catalog || ""}

الطالب مشترك حالياً في الكورسات دي (id): ${JSON.stringify(enrolledIds || [])}

قواعدك:
1. لو الطالب مشترك في كورس معين بالفعل، متنصحوش بيه تاني.
2. افهم رغبته وارشحله كورس واحد أو اتنين بس من القائمة.
3. اشرح باختصار هيفيده في إيه.
4. في آخر ردك ضيف سطر بالشكل ده بالظبط:
RECOMMENDED_IDS: id1,id2`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 700,
        system: systemPrompt,
        messages: messages || []
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: "Anthropic API error", details: data });
    }

    const rawText = data.content?.[0]?.text || "";
    const match = rawText.match(/RECOMMENDED_IDS:\s*(.+)/);
    const recommendedIds = match ? match[1].split(",").map(s => s.trim()) : [];
    const reply = rawText.replace(/RECOMMENDED_IDS:.*/s, "").trim();

    return res.status(200).json({ reply, recommendedIds });

  } catch (err) {
    console.error("AI Assistant Error:", err);
    return res.status(500).json({ error: err.message || "Unknown server error" });
  }
};
