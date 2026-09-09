module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({ status: "API is alive, use POST" });
    }

    const { messages, catalog, enrolledIds } = req.body || {};

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "OPENROUTER_API_KEY is missing on server" });
    }

    const systemPrompt = `أنت مساعد توجيه تعليمي في منصة "أطلس" التعليمية.
قائمة الكورسات المتاحة (متخترعش كورس مش موجود في القائمة):
${catalog || ""}

الطالب مشترك حالياً في الكورسات دي (id): ${JSON.stringify(enrolledIds || [])}

قواعدك:
1. لو الطالب مشترك في كورس معين بالفعل، متنصحوش بيه تاني — رشحله الكورس المكمّل أو الخطوة الجاية بدل ما تكرر عليه.
2. افهم رغبته (يتعلم إيه/يشتغل إيه) وارشحله كورس واحد أو اتنين بس من القائمة.
3. اشرح باختصار هيفيده في إيه وهيقدر يشتغل في إيه بعده.
4. لو مناسب اقترح شهادة مجانية خارجية معروفة تكمل بيها الـ CV.
5. في آخر ردك ضيف سطر بالشكل ده بالظبط:
RECOMMENDED_IDS: id1,id2`;

    const orMessages = [
      { role: "system", content: systemPrompt },
      ...(messages || []).map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content
      }))
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        max_tokens: 700,
        messages: orMessages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: "OpenRouter API error", details: data });
    }

    const rawText = data.choices?.[0]?.message?.content || "";
    const match = rawText.match(/RECOMMENDED_IDS:\s*(.+)/);
    const recommendedIds = match ? match[1].split(",").map(s => s.trim()) : [];
    const reply = rawText.replace(/RECOMMENDED_IDS:.*/s, "").trim();

    return res.status(200).json({ reply, recommendedIds });

  } catch (err) {
    console.error("AI Assistant Error:", err);
    return res.status(500).json({ error: err.message || "Unknown server error" });
  }
};
