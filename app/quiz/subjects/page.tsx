import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";
import NavbarWrapper from "@/components/NavbarWrapper";
import { prisma } from "@/lib/prisma";

const SUBJECTS = [
  { name: "Basic Maths", icon: "➗" },
  { name: "Advanced Maths", icon: "📐" },
  { name: "Physics", icon: "⚛️" },
  { name: "Analytical Reasoning", icon: "🧩" },
  { name: "Intelligence", icon: "💡" },
];

export default async function Subjects() {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;

  const rows = await prisma.question.groupBy({ by: ["subject"], _count: true });
  const counts: Record<string, number> = {};
  rows.forEach((r) => { if (r.subject) counts[r.subject] = r._count; });

  return (
    <>
      <NavbarWrapper />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <a href="/quiz" className="text-sm text-[#5a5b76]">← Back</a>
        <h1 className="font-display font-bold text-4xl mt-2 mb-8">Choose a subject 📚</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          {SUBJECTS.map((s) => (
            <a key={s.name} href={`/quiz/setup?type=subject&name=${encodeURIComponent(s.name)}`}
              className="bg-white rounded-2xl border border-black/5 p-6 hover:-translate-y-1 transition flex items-center justify-between">
              <div className="flex items-center gap-3"><span className="text-2xl">{s.icon}</span><span className="font-display font-bold text-lg">{s.name}</span></div>
              <span className="text-xs text-[#5a5b76]">{counts[s.name] || 0} Qs</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}