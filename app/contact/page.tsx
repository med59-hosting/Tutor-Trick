import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="max-w-3xl mx-auto px-6 py-20">
        <Reveal>
          <p className="text-sm font-semibold text-[#6c5ce7] mb-3 uppercase tracking-wide">Contact</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">Get in touch.</h1>
          <p className="text-lg text-[#5a5b76] mb-10">Questions about admissions or our courses? Reach out — we usually reply within a day.</p>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5">
          {[["📧", "Email", "hello@tutortrick.pk"], ["📞", "Phone", "+92 300 0000000"], ["📍", "Location", "Lahore, Pakistan"]].map(([icon, label, val]) => (
            <div key={label} className="bg-white rounded-2xl border border-black/5 p-6 text-center">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-display font-bold">{label}</div>
              <div className="text-[#5a5b76] text-sm mt-1 break-words">{val}</div>
            </div>
          ))}
        </div>
      </section>
      <footer className="py-8 text-center text-sm text-[#5a5b76]">© 2026 TutorTrick</footer>
    </main>
  );
}