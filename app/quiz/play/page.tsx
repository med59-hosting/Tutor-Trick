import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";
import NavbarWrapper from "@/components/NavbarWrapper";
import { prisma } from "@/lib/prisma";
import QuizRunner from "../QuizRunner";

export default async function PlayQuiz({ searchParams }: { searchParams: Promise<{ subject?: string; chapter?: string; count?: string }> }) {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;

  const { subject, chapter, count } = await searchParams;
  const take = Math.min(Math.max(Number(count) || 10, 1), 50);

  let questions;
  const filter = subject || chapter; // both live in the `chapter` field
  if (filter) {
    const all = await prisma.question.findMany({ where: { chapter: filter }, take: 200 });
    questions = all.sort(() => Math.random() - 0.5).slice(0, take);
  } else {
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