import { prisma } from "@/lib/prisma";
import QuizRunner from "./QuizRunner";

export default async function QuizPage() {
  const questions = await prisma.question.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });
  return <QuizRunner questions={JSON.parse(JSON.stringify(questions))} />;
}