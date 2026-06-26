import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  const { questionId, chosenIndex, isCorrect } = await req.json();
  await prisma.attempt.create({
    data: { userId, questionId, chosenIndex, isCorrect },
  });
  return NextResponse.json({ ok: true });
}