import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";
import NavbarWrapper from "@/components/NavbarWrapper";
import { prisma } from "@/lib/prisma";

export default async function Chapters() {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;

  const rows = await prisma.question.groupBy({ by: ["chapter"], _count: true });
  const chapters = rows.sort((a, b) => a.chapter.localeCompare(b.chapter));

  return (
    <>
      <NavbarWrapper />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <a href="/quiz" className="text-sm text-[#5a5b76]">← Back</a>
        <h1 className="font-display font-bold text-4xl mt-2 mb-8">Choose a chapter 📚</h1>
        {chapters.length === 0 ? (
          <p className="text-[#5a5b76]">No chapters yet. Import some questions first.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {chapters.map((c) => (
              <a key={c.chapter} href={`/quiz/play?chapter=${encodeURIComponent(c.chapter)}`}
                className="bg-white rounded-2xl border border-black/5 p-5 hover:-translate-y-1 transition flex justify-between items-center">
                <span className="font-display font-bold">{c.chapter}</span>
                <span className="text-xs text-[#5a5b76]">{c._count} Qs</span>
              </a>
            ))}
          </div>
        )}
      </section>
    </>
  );
}