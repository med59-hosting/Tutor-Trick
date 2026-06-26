"use client";
import { useEffect, useState } from "react";

export default function Typewriter({ lines }: { lines: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[index % lines.length];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 1700);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
      return;
    }
    const t = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, deleting ? 30 : 60);
    return () => clearTimeout(t);
  }, [text, deleting, index, lines]);

  return (
    <span>
      {text}
      <span className="inline-block w-[3px] h-[1em] bg-[#f5a524] align-middle ml-1 animate-pulse"></span>
    </span>
  );
}