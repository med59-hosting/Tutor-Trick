import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";
import NavbarWrapper from "@/components/NavbarWrapper";
import { prisma } from "@/lib/prisma";
import QuizRunner from "../QuizRunner";

export default async function PlayQuiz({ searchParams }: { searchParams: Promise<{ chapter?: string; count?: string }> }) {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;

  const { chapter, count } = await searchParams;

  let questions;
  if (chapter) {
    questions = await prisma.question.findMany({ where: { chapter }, take: 30 });
  } else {
    const take = Math.min(Number(count) || 10, 50);
    // random-ish: grab more, shuffle, slice
    const all = await prisma.question.findMany({ take: 200 });
    questions = all.sort(() => Math.random() - 0.5).slice(0, take);
  }

  return (
    <>
      <NavbarWrapper />
      <QuizRunner questions={JSON.parse(JSON.stringify(questions))} />
    </>
  );
}