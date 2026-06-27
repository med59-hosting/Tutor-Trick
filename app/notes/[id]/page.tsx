import NavbarWrapper from "@/components/NavbarWrapper";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";

export default async function ViewNote({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note) notFound();

  return (
    <main className="min-h-screen">
      <NavbarWrapper />
      <section className="max-w-4xl mx-auto px-6 py-10">
        <a href="/notes" className="text-sm text-[#5a5b76]">← Back to notes</a>
        <h1 className="font-display font-bold text-3xl mt-2 mb-1">{note.title}</h1>
        <p className="text-[#5a5b76] mb-6">{note.subject} · by {note.uploadedBy}</p>
        <div className="rounded-2xl overflow-hidden border border-black/10">
          <iframe
            src={`/api/notes/file?p=${encodeURIComponent(note.url)}#toolbar=0&navpanes=0`}
            className="w-full"
            style={{ height: "80vh" }}
          />
        </div>
        <p className="text-xs text-[#5a5b76] mt-3">This material is for reading only.</p>
      </section>
    </main>
  );
}