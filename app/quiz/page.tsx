import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";
import NavbarWrapper from "@/components/NavbarWrapper";
import { prisma } from "@/lib/prisma";

export default async function QuizHome() {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;

  // get the distinct chapters that have questions
  const rows = await prisma.question.findMany({ select: { chapter: true } });
  const chapters = [...new Set(rows.map((r) => r.chapter))].sort();

  return (
    <>
      <NavbarWrapper />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display font-bold text-4xl mb-2">Quizzes 📝</h1>
        <p className="text-[#5a5b76] mb-10">Pick how you want to practice.</p>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* chapter-wise */}
          <a href="/quiz/chapters" className="bg-white rounded-2xl border border-black/5 p-6 hover:-translate-y-1 transition">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-display font-bold text-xl mb-1">Chapter-wise quiz</h3>
            <p className="text-[#5a5b76] text-sm">Practice one chapter at a time.</p>
          </a>

          {/* random */}
          <a href="/quiz/random" className="bg-white rounded-2xl border border-black/5 p-6 hover:-translate-y-1 transition">
            <div className="text-3xl mb-3">🎲</div>
            <h3 className="font-display font-bold text-xl mb-1">Random quiz</h3>
            <p className="text-[#5a5b76] text-sm">Mixed questions from all chapters — you choose how many.</p>
          </a>

          {/* AI */}
          <a href="/generate" className="bg-white rounded-2xl border border-black/5 p-6 hover:-translate-y-1 transition">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-display font-bold text-xl mb-1">AI quiz</h3>
            <p className="text-[#5a5b76] text-sm">Generate fresh questions on any topic with AI.</p>
          </a>
        </div>

        {chapters.length > 0 && (
          <p className="text-xs text-[#5a5b76] mt-8">{chapters.length} chapter(s) available.</p>
        )}
      </section>
    </>
  );
}