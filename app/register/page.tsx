"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const r = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student", phone: "", address: "" });
  const [file, setFile] = useState<File | null>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setErr("");
    if (!form.name || !form.email || !form.password || !form.phone || !form.address || !file) {
      setErr("Please fill everything and add a profile picture.");
      return;
    }
    setLoading(true);
    try {
      // 1) upload the picture first
      const fd = new FormData();
      fd.append("file", file);
      const up = await fetch("/api/profile-image", { method: "POST", body: fd });
      const upData = await up.json();
      if (!up.ok) { setErr(upData.error || "Image upload failed."); setLoading(false); return; }

      // 2) create the account with the image url
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image: upData.url }),
      });
      if (res.ok) r.push("/login");
      else setErr((await res.json()).error || "Something went wrong.");
    } catch {
      setErr("Something went wrong. Try again.");
    }
    setLoading(false);
  }

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 space-y-3">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <p className="text-xs text-gray-500">These details can&apos;t be changed later, so enter them carefully.</p>
      <input className="w-full border rounded p-2" placeholder="Full name" onChange={(e) => set("name", e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Email" type="email" onChange={(e) => set("email", e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Phone number" onChange={(e) => set("phone", e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Address" onChange={(e) => set("address", e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Password" type="password" onChange={(e) => set("password", e.target.value)} />
      <select className="w-full border rounded p-2" onChange={(e) => set("role", e.target.value)}>
        <option value="student">I&apos;m a student</option>
        <option value="teacher">I&apos;m a teacher</option>
      </select>
      <div>
        <label className="text-sm text-gray-600">Profile picture</label>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full border rounded p-2 mt-1" />
      </div>
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button onClick={submit} disabled={loading} className="w-full bg-black text-white rounded p-2 font-semibold disabled:opacity-50">
        {loading ? "Creating…" : "Sign up"}
      </button>
      <a href="/login" className="block text-center text-sm text-gray-500">Already have an account? Log in</a>
    </div>
  );
}