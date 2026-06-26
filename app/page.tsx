import Navbar from "@/components/Navbar";
import Typewriter from "@/components/Typewriter";
import Reveal from "@/components/Reveal";

const unis = ["FAST", "NUST", "GIKI", "UET", "COMSATS", "AIR", "BAHRIA"];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
        <p className="text-sm font-semibold text-[#6c5ce7] mb-4 tracking-wide uppercase">Entry-test preparation academy</p>
        <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight mb-6">
          Your seat at Pakistan&apos;s<br />top universities starts here.
        </h1>
        <p className="text-lg md:text-xl text-[#1b1b2e] font-medium min-h-[3.5rem] max-w-2xl mx-auto mb-9">
          <Typewriter lines={[
            "Preparation for every entry test — MDCAT, ECAT, NTS & more.",
            "Built for the top universities across Pakistan.",
            "A proven 97% success ratio.",
            "Admissions into FAST, NUST, GIKI, UET, COMSATS, AIR & BAHRIA.",
          ]} />
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="/register" className="px-7 py-3.5 rounded-xl bg-[#f5a524] text-[#1b1b2e] font-bold hover:opacity-90 transition">Start preparing free</a>
          <a href="/progress" className="px-7 py-3.5 rounded-xl border-2 border-[#1b1b2e]/15 font-bold hover:border-[#1b1b2e]/40 transition">See our results</a>
        </div>
      </section>

      {/* stats band */}
      <section className="bg-[#1b1b2e] text-white py-14">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["8+", "Years of experience"], ["97%", "Success ratio"], ["7+", "Top universities"], ["1000s", "Students placed"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-display font-bold text-4xl text-[#f5a524]">{n}</div>
              <div className="text-white/70 text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* universities */}
      <section className="py-14 border-b border-black/5">
        <p className="text-center text-sm font-semibold text-[#5a5b76] mb-6 uppercase tracking-wide">Our students get into</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 font-display font-bold text-xl text-[#1b1b2e]/70">
          {unis.map((u) => <span key={u}>{u}</span>)}
        </div>
      </section>

      {/* features */}
      <section className="bg-white py-24 border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal><h2 className="font-display font-bold text-3xl text-center mb-3">Why students choose us</h2>
          <p className="text-center text-[#5a5b76] mb-14 max-w-lg mx-auto">Practice that actually sticks — with a trick for every question.</p></Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: "🧠", title: "Smart quizzes", desc: "Instant feedback and full solutions on every question." },
              { icon: "✨", title: "Memory tricks", desc: "A one-line trick after each answer so it sticks for the exam." },
              { icon: "🤖", title: "AI practice", desc: "Generate fresh questions on any topic in seconds." },
              { icon: "🏆", title: "Leaderboard", desc: "Track accuracy and compete with fellow students." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="p-7 rounded-2xl bg-[#f7f6f2] border border-black/5 h-full hover:-translate-y-1 transition">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
                  <p className="text-[#5a5b76]">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="bg-[#1b1b2e] text-white py-24">
        <Reveal>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="font-display font-bold text-4xl mb-5">Ready to secure your admission?</h2>
            <p className="text-white/70 mb-8 text-lg">Free to start. No card needed.</p>
            <a href="/register" className="inline-block px-8 py-4 rounded-xl bg-[#f5a524] text-[#1b1b2e] font-bold hover:opacity-90 transition">Create your free account</a>
          </div>
        </Reveal>
      </section>

      <footer className="py-8 text-center text-sm text-[#5a5b76]">© 2026 TutorTrick · Built with Next.js</footer>
    </main>
  );
}