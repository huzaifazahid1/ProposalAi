import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: "No text provided" }), { status: 400 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
    You are a sentiment analysis assistant.
    Classify the sentiment of the following text as one of:
    Positive, Neutral, or Negative.

    Text:
    """${text}"""
    
    Answer with only one word: Positive, Neutral, or Negative.
    `;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a helpful assistant for sentiment analysis." },
        { role: "user", content: prompt }
      ],
      temperature: 0,
    });

    const sentiment = response.choices[0]?.message?.content?.trim() || "Neutral";

    return new Response(JSON.stringify({ sentiment }), { status: 200 });
  } catch (error) {
    console.error("Sentiment API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
