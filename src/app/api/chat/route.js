// app/api/chat/route.js
// ===========================================
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(request) {
  try {
    const { userInfo, aiModel } = await request.json();
    
    const systemPrompt = `You are an experienced ${userInfo.profession} with a proven record of delivering results for clients on Upwork.

I will give you:
1. The job description
2. My relevant experience & portfolio links  
3. Any personal touch or story I want to add

Your task:
- Write a short, human-sounding proposal (max 150–200 words)
- Start with a friendly greeting and a strong hook showing deep understanding of the client's problem
- Mention my most relevant past result within the first 2–3 lines without focusing too much on me
- Use simple language, short sentences, and a natural, conversational tone
- Make it easy to scan (short paragraphs, bullet points if needed)
- End with a clear, inviting call-to-action that encourages a reply
- Keep the focus on how I solve the client’s pain, with minimal self-promotion

Avoid generic phrases like "I am passionate about..." or "I can do this job."
Instead, sound like a real person speaking directly to the client.

Here’s the job description: ${userInfo.jobDescription}
Here’s my experience: ${userInfo.experience}
Here’s my personal touch: ${userInfo.personalTouch}`;


    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: 'Generate a winning Upwork proposal based on the information provided.'
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 400
    });

    const proposal = chatCompletion.choices[0]?.message?.content;
    
    return Response.json({ proposal });
  } catch (error) {
    console.error('Error generating proposal:', error);
    return Response.json({ 
      error: 'Failed to generate proposal',
      message: error.message 
    }, { status: 500 });
  }
}
