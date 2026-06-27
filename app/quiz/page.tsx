import { prisma } from "@/lib/prisma";
import QuizRunner from "./QuizRunner";
import NavbarWrapper from "@/components/NavbarWrapper";

export default async function QuizPage() {
  const questions = await prisma.question.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <NavbarWrapper />
      <QuizRunner questions={JSON.parse(JSON.stringify(questions))} />
    </>
  );
}