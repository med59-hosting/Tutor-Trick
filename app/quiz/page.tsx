import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";
import NavbarWrapper from "@/components/NavbarWrapper";

export default async function QuizHome() {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;

  const modes = [
    { href: "/quiz/subjects", icon: "📚", title: "Subject-wise quiz", desc: "Basic Maths, Physics, Reasoning & more." },
    { href: "/quiz/chapters", icon: "📖", title: "Chapter-wise quiz", desc: "Practice one chapter at a time." },
    { href: "/quiz/random", icon: "🎲", title: "Random quiz", desc: "Mixed questions from everything." },
    { href: "/generate", icon: "✨", title: "AI quiz", desc: "Generate fresh questions with AI." },
  ];

  return (
    <>
      <NavbarWrapper />
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display font-bold text-4xl mb-2">Quizzes 📝</h1>
        <p className="text-[#5a5b76] mb-10">Pick how you want to practice.</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {modes.map((m) => (
            <a key={m.href} href={m.href} className="bg-white rounded-2xl border border-black/5 p-6 hover:-translate-y-1 transition">
              <div className="text-3xl mb-3">{m.icon}</div>
              <h3 className="font-display font-bold text-xl mb-1">{m.title}</h3>
              <p className="text-[#5a5b76] text-sm">{m.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}