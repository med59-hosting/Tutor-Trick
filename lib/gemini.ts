import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type GenInput = { topic: string; count: number; examples: any[] };

export async function generateQuestions({ topic, count, examples }: GenInput) {
  const exampleText = examples.length
    ? `Here are existing questions on this topic. Make some NEW variations of these and some brand-new ones:\n${JSON.stringify(
        examples.map((e) => ({ question: e.text, options: e.options, trick: e.trick })),
        null, 2
      )}`
    : `There are no existing questions yet. Create brand-new ones.`;

  const prompt = `You are a quiz generator for a study app.
Topic: "${topic}"
${exampleText}

Generate exactly ${count} multiple-choice questions.
Return ONLY a JSON array, no markdown, no extra text. Each item must be:
{
  "text": "the question",
  "options": ["A", "B", "C", "D"],
  "correctIndex": 0,
  "solutionSteps": "short clear explanation of how to solve it",
  "trick": "a 1-2 line memory trick to remember the answer",
  "difficulty": "Easy" | "Medium" | "Hard"
}`;

  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let raw = (res.text ?? "").trim();
  // strip ```json fences if the model adds them
  raw = raw.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();

  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}