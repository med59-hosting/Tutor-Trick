import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";
import NavbarWrapper from "@/components/NavbarWrapper";
import { prisma } from "@/lib/prisma";
import CountForm from "./CountForm";

export default async function Setup({ searchParams }: { searchParams: Promise<{ type?: string; name?: string }> }) {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;

  const { type, name } = await searchParams;
  const label = name || "";
  const where = type === "subject" ? { subject: label } : { chapter: label };
  const available = await prisma.question.count({ where });

  return (
    <>
      <NavbarWrapper />
      <section className="max-w-md mx-auto px-6 py-20 text-center">
        <a href={type === "subject" ? "/quiz/subjects" : "/quiz/chapters"} className="text-sm text-[#5a5b76] block mb-4">← Back</a>
        <h1 className="font-display font-bold text-3xl mb-2">{label}</h1>
        <p className="text-[#5a5b76] mb-8">{available} question(s) available.</p>
        {available === 0 ? (
          <p className="text-[#5a5b76]">No questions here yet.</p>
        ) : (
          <CountForm type={type || "chapter"} name={label} max={Math.min(available, 50)} />
        )}
      </section>
    </>
  );
}