import NavbarWrapper from "@/components/NavbarWrapper";
import Reveal from "@/components/Reveal";
import ProgressCarousel from "@/components/ProgressCarousel";

export default function Progress() {
  return (
    <main className="min-h-screen">
      <NavbarWrapper />
      <section className="max-w-5xl mx-auto px-6 py-20">
        <Reveal>
          <p className="text-sm font-semibold text-[#6c5ce7] mb-3 uppercase tracking-wide text-center">Our progress</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 text-center">Real students. Real results.</h1>
          <p className="text-lg text-[#5a5b76] text-center mb-14 max-w-xl mx-auto">Meet some of the students who prepared with us and earned their place at top universities.</p>
        </Reveal>
        <ProgressCarousel />
      </section>
      <footer className="py-8 text-center text-sm text-[#5a5b76]">© 2026 TutorTrick</footer>
    </main>
  );
}