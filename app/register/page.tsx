"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const r = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [err, setErr] = useState("");

  async function submit() {
    setErr("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) r.push("/login");
    else setErr((await res.json()).error || "Something went wrong.");
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 space-y-3">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <input className="w-full border rounded p-2" placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="w-full border rounded p-2" placeholder="Email" type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full border rounded p-2" placeholder="Password" type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select className="w-full border rounded p-2"
        onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="student">I'm a student</option>
        <option value="teacher">I'm a teacher</option>
      </select>
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button onClick={submit} className="w-full bg-black text-white rounded p-2 font-semibold">
        Sign up
      </button>
      <a href="/login" className="block text-center text-sm text-gray-500">Already have an account? Log in</a>
    </div>
  );
}