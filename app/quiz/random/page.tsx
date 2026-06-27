import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";
import NavbarWrapper from "@/components/NavbarWrapper";

export default async function RandomSetup() {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;
  return (
    <>
      <NavbarWrapper />
      <section className="max-w-md mx-auto px-6 py-20 text-center">
        <a href="/quiz" className="text-sm text-[#5a5b76] block mb-4">← Back</a>
        <h1 className="font-display font-bold text-3xl mb-6">Random quiz 🎲</h1>
        <p className="text-[#5a5b76] mb-6">How many questions do you want?</p>
        <div className="flex flex-col gap-3">
          {[5, 10, 20, 30].map((n) => (
            <a key={n} href={`/quiz/play?count=${n}`}
              className="bg-[#1b1b2e] text-white rounded-xl py-3 font-semibold hover:opacity-90 transition">
              {n} questions
            </a>
          ))}
        </div>
      </section>
    </>
  );
}