import NavbarWrapper from "@/components/NavbarWrapper";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <main className="min-h-screen">
      <NavbarWrapper />
      <section className="max-w-3xl mx-auto px-6 py-20">
        <Reveal>
          <p className="text-sm font-semibold text-[#6c5ce7] mb-3 uppercase tracking-wide">About us</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">Eight years of getting students where they want to be.</h1>
          <p className="text-lg text-[#5a5b76] leading-relaxed mb-5">
            For over 8 years, TutorTrick has helped students across Pakistan prepare for the toughest entry tests — and walk away with admission to the universities they dreamed of.
          </p>
          <p className="text-lg text-[#5a5b76] leading-relaxed mb-5">
            We believe preparation shouldn&apos;t mean memorizing blindly. Every question we teach comes with a trick — a simple, memorable shortcut that turns confusion into confidence on exam day.
          </p>
          <p className="text-lg text-[#5a5b76] leading-relaxed">
            Year after year, our students earn their place at FAST, NUST, GIKI, UET, COMSATS, AIR, Bahria, and beyond. Their results are the reason we do this.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 text-center">
          {[["8+", "Years"], ["97%", "Success"], ["7+", "Universities"], ["1000s", "Students"]].map(([n, l]) => (
            <div key={l} className="bg-white rounded-2xl border border-black/5 py-6">
              <div className="font-display font-bold text-3xl text-[#f5a524]">{n}</div>
              <div className="text-[#5a5b76] text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>
      <footer className="py-8 text-center text-sm text-[#5a5b76]">© 2026 TutorTrick</footer>
    </main>
  );
}