"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadNote() {
  const r = useRouter();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function upload() {
    if (!file || !title) { setStatus("Add a title and choose a PDF."); return; }
    setStatus("Uploading… ⏳");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", title);
    fd.append("subject", subject);
    const res = await fetch("/api/notes", { method: "POST", body: fd });
    if (res.ok) { setStatus("✅ Uploaded!"); setTimeout(() => r.push("/notes"), 800); }
    else setStatus(`❌ ${(await res.json()).error || "Upload failed."}`);
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 space-y-4">
      <h1 className="font-display font-bold text-2xl">Upload notes (PDF)</h1>
      <input className="w-full border rounded p-2" placeholder="Title (e.g. Physics Ch 3)" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Subject (e.g. Physics)" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full border rounded p-2" />
      <button onClick={upload} className="w-full bg-[#1b1b2e] text-white rounded p-2 font-semibold">Upload</button>
      {status && <p className="text-sm">{status}</p>}
      <a href="/notes" className="block text-center text-sm text-gray-500">← Back to notes</a>
    </div>
  );
}