import NavbarWrapper from "@/components/NavbarWrapper";

export default function LockedScreen() {
  return (
    <>
      <NavbarWrapper />
      <section className="max-w-md mx-auto px-6 py-28 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="font-display font-bold text-3xl mb-3">This is for enrolled students</h1>
        <p className="text-[#5a5b76] mb-8">Enroll once to unlock all quizzes, notes, and AI practice.</p>
        <a href="/enroll" className="inline-block px-8 py-4 rounded-xl bg-[#f5a524] text-[#1b1b2e] font-bold hover:opacity-90 transition">Enroll Now</a>
      </section>
    </>
  );
}