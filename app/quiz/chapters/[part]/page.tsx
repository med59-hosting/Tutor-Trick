import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";
import NavbarWrapper from "@/components/NavbarWrapper";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const CHAPTERS: Record<string, string[]> = {
  "Part 1": [
    "Complex Numbers", "Functions and Graphs", "Theory of Quadratic Functions",
    "Matrices and Determinants", "Partial Fractions", "Sequences and Series",
    "Permutations and Combinations", "Mathematical Induction and Binomial Theorem",
    "Division of Polynomials", "Trigonometric Identities",
    "Trigonometric Functions and their Graphs", "Limit and Continuity",
    "Differentiation", "Vectors in Space",
  ],
  "Part 2": [
    "Functions and Limits", "Differentiation", "Integration",
    "Introduction to Analytic Geometry", "Linear Inequalities and Linear Programming",
    "Conic Section", "Vectors",
  ],
};

export default async function PartChapters({ params }: { params: Promise<{ part: string }> }) {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;

  const { part } = await params;
  const partName = decodeURIComponent(part);
  const list = CHAPTERS[partName];
  if (!list) notFound();

  // count questions per chapter (tagged as "Part 1 — Complex Numbers" etc.)
  const rows = await prisma.question.groupBy({ by: ["chapter"], _count: true });
  const counts: Record<string, number> = {};
  rows.forEach((r) => { if (r.chapter) counts[r.chapter] = r._count; });

  return (
    <>
      <NavbarWrapper />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <a href="/quiz/chapters" className="text-sm text-[#5a5b76]">← Back to parts</a>
        <h1 className="font-display font-bold text-4xl mt-2 mb-8">{partName} chapters 📖</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          {list.map((ch, i) => {
            const tag = `${partName} — ${ch}`;
            return (
              <a key={ch} href={`/quiz/setup?type=chapter&name=${encodeURIComponent(tag)}`}
                className="bg-white rounded-2xl border border-black/5 p-5 hover:-translate-y-1 transition flex justify-between items-center gap-3">
                <span className="font-display font-bold text-sm"><span className="text-[#5a5b76]">{i + 1}.</span> {ch}</span>
                <span className="text-xs text-[#5a5b76] shrink-0">{counts[tag] || 0} Qs</span>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}