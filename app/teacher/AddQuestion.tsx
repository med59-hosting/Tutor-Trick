"use client";
import { useState } from "react";

export default function AddQuestion() {
  const [q, setQ] = useState({
    topic: "", text: "", options: ["", "", "", ""], correctIndex: 0,
    solutionSteps: "", trick: "", difficulty: "Easy",
  });
  const [saved, setSaved] = useState(false);

  async function save() {
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(q),
    });
    if (res.ok) {
      setSaved(true);
      setQ({ topic: "", text: "", options: ["", "", "", ""], correctIndex: 0,
        solutionSteps: "", trick: "", difficulty: "Easy" });
      setTimeout(() => setSaved(false), 1500);
    }
  }

  const set = (k: string, v: any) => setQ({ ...q, [k]: v });

  return (
    <div className="space-y-3">
      <input className="w-full border rounded p-2" placeholder="Topic (e.g. Mathematics)"
        value={q.topic} onChange={(e) => set("topic", e.target.value)} />
      <textarea className="w-full border rounded p-2" placeholder="Question"
        value={q.text} onChange={(e) => set("text", e.target.value)} />
      {q.options.map((o, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input type="radio" name="correct" checked={q.correctIndex === i}
            onChange={() => set("correctIndex", i)} />
          <input className="flex-1 border rounded p-2" placeholder={`Option ${"ABCD"[i]}`}
            value={o} onChange={(e) => {
              const opts = [...q.options]; opts[i] = e.target.value; set("options", opts);
            }} />
        </div>
      ))}
      <p className="text-xs text-gray-500">Click the circle next to the correct option.</p>
      <textarea className="w-full border rounded p-2" placeholder="Solution / steps (shown if wrong)"
        value={q.solutionSteps} onChange={(e) => set("solutionSteps", e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="1–2 line memory trick"
        value={q.trick} onChange={(e) => set("trick", e.target.value)} />
      <button onClick={save} className="w-full bg-black text-white rounded p-2 font-semibold">
        {saved ? "Saved! ✓" : "Save question"}
      </button>
    </div>
  );
}