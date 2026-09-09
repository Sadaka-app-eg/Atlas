module.exports = async function handler(req, res) {  
  const { messages, catalog, enrolledIds } = req.body;

  const systemPrompt = `أنت مساعد توجيه تعليمي في منصة "أطلس" التعليمية.
قائمة الكورسات المتاحة (متخترعش كورس مش موجود في القائمة):
${catalog}

الطالب مشترك حالياً في الكورسات دي (id): ${JSON.stringify(enrolledIds || [])}

قواعدك:
1. لو الطالب مشترك في كورس معين بالفعل، متنصحوش بيه تاني — رشحله الكورس المكمّل أو الخطوة الجاية بدل ما تكرر عليه.
2. افهم رغبته (يتعلم إيه/يشتغل إيه) وارشحله كورس واحد أو اتنين بس من القائمة.
3. اشرح باختصار هيفيده في إيه وهيقدر يشتغل في إيه بعده.
4. لو مناسب اقترح شهادة مجانية خارجية معروفة تكمل بيها الـ CV.
5. في آخر ردك ضيف سطر بالشكل ده بالظبط:
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
      messages: messages
    })
  });

  const data = await response.json();
  const rawText = data.content?.[0]?.text || "";

  const match = rawText.match(/RECOMMENDED_IDS:\s*(.+)/);
  const recommendedIds = match ? match[1].split(",").map(s => s.trim()) : [];
  const reply = rawText.replace(/RECOMMENDED_IDS:.*/s, "").trim();

  res.status(200).json({ reply, recommendedIds });
}
