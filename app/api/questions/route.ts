import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if ((session?.user as any)?.role !== "teacher") {
    return NextResponse.json({ error: "Teachers only." }, { status: 403 });
  }
  const d = await req.json();
  await prisma.question.create({
    data: {
      topic: d.topic, text: d.text, options: d.options,
      correctIndex: d.correctIndex, solutionSteps: d.solutionSteps,
      trick: d.trick, difficulty: d.difficulty || "Easy", source: "seed",
    },
  });
  return NextResponse.json({ ok: true });
}