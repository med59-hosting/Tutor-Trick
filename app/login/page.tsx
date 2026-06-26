"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit() {
    setErr("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) setErr("Wrong email or password.");
    else r.push("/dashboard");
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 space-y-3">
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <input className="w-full border rounded p-2" placeholder="Email" type="email"
        onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Password" type="password"
        onChange={(e) => setPassword(e.target.value)} />
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button onClick={submit} className="w-full bg-black text-white rounded p-2 font-semibold">
        Log in
      </button>
      <a href="/register" className="block text-center text-sm text-gray-500">Create an account</a>
    </div>
  );
}