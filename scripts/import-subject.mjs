import "dotenv/config";
import mammoth from "mammoth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// usage: node scripts/import-subject.mjs "adv-maths.docx" "Advanced Maths"
const FILE = process.argv[2];
const SUBJECT = process.argv[3];

if (!FILE || !SUBJECT) {
  console.error('Usage: node scripts/import-subject.mjs "file.docx" "Subject Name"');
  process.exit(1);
}

const stripBold = (s) => s.replace(/\*\*/g, "").trim();

async function run() {
  const { value: html } = await mammoth.convertToHtml({ path: FILE });
  const text = html
    .replace(/<strong>/g, "**").replace(/<\/strong>/g, "**")
    .replace(/<\/p>/g, "\n").replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&radic;/g, "√");

  const lines = text.split("\n");
  const questions = [];
  let q = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const clean = stripBold(line);

    const qMatch = clean.match(/^Q\d+\.\s*(.+)$/);
    if (qMatch) {
      if (q) questions.push(q);
      q = { text: qMatch[1].trim(), options: [], correctIndex: -1 };
      continue;
    }
    if (!q) continue;

    if (line.includes("Correct Answer")) {
      const m = clean.match(/Correct Answer:\s*([a-d])\)/i);
      if (m) q.correctIndex = "abcd".indexOf(m[1].toLowerCase());
      continue;
    }

    const optMatch = clean.match(/^([a-d])\)\s*(.+)$/i);
    if (optMatch) {
      const idx = "abcd".indexOf(optMatch[1].toLowerCase());
      q.options[idx] = optMatch[2].trim();
      if (raw.includes("**") && q.correctIndex === -1) q.correctIndex = idx;
      continue;
    }
  }
  if (q) questions.push(q);

  const valid = questions.filter((x) => x.options.filter(Boolean).length === 4 && x.correctIndex >= 0);
  console.log(`Parsed ${questions.length}, valid ${valid.length}, subject "${SUBJECT}"`);

  let saved = 0;
  for (const x of valid) {
    await prisma.question.create({
      data: {
        topic: SUBJECT, subject: SUBJECT, chapter: "",
        text: x.text, options: x.options, correctIndex: x.correctIndex,
        solutionSteps: "", trick: "", difficulty: "Medium", source: "imported",
      },
    });
    saved++;
  }
  console.log(`✅ Saved ${saved} questions under subject "${SUBJECT}".`);
  await prisma.$disconnect();
}
run().catch((e) => { console.error(e); process.exit(1); });