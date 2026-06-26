import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* nav */}
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1b1b2e] text-white grid place-items-center font-display font-bold">T</div>
          <span className="font-display font-bold text-lg">TutorTrick</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <a href="/login" className="px-4 py-2 rounded-lg font-semibold hover:bg-black/5 transition">Log in</a>
          <a href="/register" className="px-4 py-2 rounded-lg bg-[#1b1b2e] text-white font-semibold hover:opacity-90 transition">Sign up</a>
        </div>
      </nav>

      {/* hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
        <p className="text-sm font-semibold text-[#6c5ce7] mb-4 tracking-wide uppercase">Study smarter, not harder</p>
        <h1 className="font-display font-bold text-5xl md:text-6xl leading-tight mb-6">
          Every quiz comes with<br />a <span className="hl">memory trick</span>.
        </h1>
        <p className="text-lg text-[#5a5b76] max-w-xl mx-auto mb-9">
          Answer questions, learn from your mistakes, and walk away with a one-line trick that makes the answer impossible to forget.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="/register" className="px-7 py-3.5 rounded-xl bg-[#f5a524] text-[#1b1b2e] font-bold hover:opacity-90 transition">Start learning free</a>
          <a href="/login" className="px-7 py-3.5 rounded-xl border-2 border-[#1b1b2e]/15 font-bold hover:border-[#1b1b2e]/40 transition">I have an account</a>
        </div>

        {/* floating preview card */}
        <Reveal delay={150}>
          <div className="float mt-16 max-w-md mx-auto bg-white rounded-2xl border border-black/5 shadow-xl p-6 text-left">
            <p className="text-xs font-bold uppercase tracking-wide text-[#f5a524] mb-2">Mathematics</p>
            <p className="font-display font-bold text-xl mb-4">What is 15% of 80?</p>
            <div className="space-y-2 mb-4">
              <div className="p-3 rounded-lg border-2 border-green-500 bg-green-50 font-medium">B. 12 ✓</div>
              <div className="p-3 rounded-lg border-2 border-black/10 font-medium opacity-50">C. 15</div>
            </div>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">✎ Memory trick</p>
            <p className="font-semibold"><span className="bg-[#fbd9a3] px-1">Find 10%, halve it for 5%, then add.</span></p>
          </div>
        </Reveal>
      </section>

      {/* features */}
      <section className="bg-white py-24 border-y border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <h2 className="font-display font-bold text-3xl text-center mb-3">Everything you need to actually remember</h2>
            <p className="text-center text-[#5a5b76] mb-14 max-w-lg mx-auto">Four tools that turn studying into something that sticks.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: "🧠", title: "Smart quizzes", desc: "Pick an answer, get instant feedback, and see the full solution when you slip." },
              { icon: "✨", title: "Memory tricks", desc: "Every question ends with a one-line trick so the answer locks into your brain." },
              { icon: "🤖", title: "AI question generator", desc: "Type a topic and AI builds fresh questions — each with its own trick — in seconds." },
              { icon: "🏆", title: "Leaderboard & stats", desc: "Track your accuracy, climb the ranks, and see exactly where you stand." },
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

      {/* how it works */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <Reveal><h2 className="font-display font-bold text-3xl text-center mb-14">How it works</h2></Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "1", t: "Pick a topic", d: "Choose from existing questions or generate new ones with AI." },
            { n: "2", t: "Take the quiz", d: "Answer, learn from mistakes, and grab the memory trick." },
            { n: "3", t: "Climb the board", d: "Watch your accuracy rise and your rank on the leaderboard." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#6c5ce7] text-white grid place-items-center font-display font-bold text-2xl mx-auto mb-5">{s.n}</div>
                <h3 className="font-display font-bold text-xl mb-2">{s.t}</h3>
                <p className="text-[#5a5b76]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* final cta */}
      <section className="bg-[#1b1b2e] text-white py-24">
        <Reveal>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="font-display font-bold text-4xl mb-5">Ready to learn the tricks?</h2>
            <p className="text-white/70 mb-8 text-lg">Free to start. No card needed.</p>
            <a href="/register" className="inline-block px-8 py-4 rounded-xl bg-[#f5a524] text-[#1b1b2e] font-bold hover:opacity-90 transition">Create your free account</a>
          </div>
        </Reveal>
      </section>

      <footer className="py-8 text-center text-sm text-[#5a5b76]">
        © 2026 TutorTrick · Built with Next.js
      </footer>
    </main>
  );
}