import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";
import NavbarWrapper from "@/components/NavbarWrapper";

export default async function Chapters() {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;

  const parts = [
    { key: "Part 1", icon: "📘", desc: "14 chapters — Complex Numbers, Functions, Matrices & more." },
    { key: "Part 2", icon: "📗", desc: "7 units — Functions & Limits, Differentiation, Integration & more." },
  ];

  return (
    <>
      <NavbarWrapper />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <a href="/quiz" className="text-sm text-[#5a5b76]">← Back</a>
        <h1 className="font-display font-bold text-4xl mt-2 mb-8">Choose a part 📖</h1>
        <div className="grid sm:grid-cols-2 gap-5">
          {parts.map((p) => (
            <a key={p.key} href={`/quiz/chapters/${encodeURIComponent(p.key)}`}
              className="bg-white rounded-2xl border border-black/5 p-6 hover:-translate-y-1 transition">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-display font-bold text-xl mb-1">{p.key}</h3>
              <p className="text-[#5a5b76] text-sm">{p.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}