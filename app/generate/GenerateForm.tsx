"use client";
import { useState } from "react";

export default function GenerateForm() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [status, setStatus] = useState("");

  async function generate() {
    setStatus("Generating… this takes a few seconds ⏳");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, count }),
    });
    const data = await res.json();
    if (res.ok) setStatus(`✅ Added ${data.count} questions on "${topic}" to the pool!`);
    else setStatus(`❌ ${data.error || "Something went wrong."}`);
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 space-y-4">
      <h1 className="text-2xl font-bold">✨ Generate questions with AI</h1>
      <p className="text-gray-500 text-sm">
        Enter a topic. The AI mixes new questions with variations of existing ones, each with a memory trick.
      </p>
      <input className="w-full border rounded p-2" placeholder="Topic (e.g. Photosynthesis)"
        value={topic} onChange={(e) => setTopic(e.target.value)} />
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">How many:</label>
        <input type="number" min={1} max={10} className="w-20 border rounded p-2"
          value={count} onChange={(e) => setCount(Number(e.target.value))} />
      </div>
      <button onClick={generate} disabled={!topic}
        className="w-full bg-black text-white rounded p-2 font-semibold disabled:opacity-40">
        Generate
      </button>
      {status && <p className="text-sm">{status}</p>}
      <a href="/quiz" className="block text-center text-sm text-amber-600">Go take the quiz →</a>
    </div>
  );
}