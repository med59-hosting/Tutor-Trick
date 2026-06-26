import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateQuestions } from "@/lib/gemini";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  const { topic, count } = await req.json();
  if (!topic) return NextResponse.json({ error: "Topic is required." }, { status: 400 });

  // grab a few existing questions on this topic as examples for the AI
  const examples = await prisma.question.findMany({
    where: { topic: { contains: topic } },
    take: 5,
  });

  try {
    const generated = await generateQuestions({
      topic,
      count: Math.min(Number(count) || 5, 10),
      examples,
    });

    // save them all into the pool
    const saved = await Promise.all(
      generated.map((q: any) =>
        prisma.question.create({
          data: {
            topic,
            text: q.text,
            options: q.options,
            correctIndex: q.correctIndex,
            solutionSteps: q.solutionSteps || "",
            trick: q.trick || "",
            difficulty: q.difficulty || "Medium",
            source: "generated",
          },
        })
      )
    );

    return NextResponse.json({ ok: true, count: saved.length });
  } catch (e: any) {
    console.error("Gemini error:", e);
    return NextResponse.json({ error: "Generation failed. Try again." }, { status: 500 });
  }
}