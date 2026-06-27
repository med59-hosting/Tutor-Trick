import { prisma } from "@/lib/prisma";
import QuizRunner from "./QuizRunner";
import NavbarWrapper from "@/components/NavbarWrapper";
import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";

export default async function QuizPage() {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;

  const questions = await prisma.question.findMany({ take: 10, orderBy: { createdAt: "desc" } });
  return (
    <>
      <NavbarWrapper />
      <QuizRunner questions={JSON.parse(JSON.stringify(questions))} />
    </>
  );
}