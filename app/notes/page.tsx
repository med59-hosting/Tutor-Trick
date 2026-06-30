import NavbarWrapper from "@/components/NavbarWrapper";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";

export default async function Notes() {
  const { allowed, user } = await getAccess();
  if (!allowed) return <LockedScreen />;
  const isTeacher = user?.role === "teacher";
  const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="min-h-screen">
      <NavbarWrapper />
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="font-display font-bold text-4xl">Study notes 📒</h1>
            <p className="text-[#5a5b76] mt-1">Read-only study material from your teachers.</p>
          </div>
          {isTeacher && (
            <a href="/notes/upload" className="px-5 py-3 rounded-xl bg-[#1b1b2e] text-white font-semibold hover:opacity-90 transition">+ Upload notes</a>
          )}
        </div>

        {notes.length === 0 ? (
          <p className="text-[#5a5b76]">No notes uploaded yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes.map((n, i) => (
              <Reveal key={n.id} delay={i * 60}>
                <div className="bg-white rounded-2xl border border-black/5 p-6 h-full flex flex-col hover:-translate-y-1 transition">
                  <div className="text-3xl mb-3">📄</div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#f5a524] mb-1">{n.subject}</p>
                  <h3 className="font-display font-bold text-lg mb-1">{n.title}</h3>
                  <p className="text-xs text-[#5a5b76] mb-4">by TutorTrick</p>
                  <a href={`/notes/${n.id}`} className="mt-auto text-center px-4 py-2 rounded-lg bg-[#f5a524] text-[#1b1b2e] font-bold hover:opacity-90 transition">Read</a>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}