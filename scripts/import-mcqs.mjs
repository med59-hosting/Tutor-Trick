import "dotenv/config";
import mammoth from "mammoth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 👇 change this to your docx filename / chapter label if needed
const FILE = "ch7-80-mcqs.docx";

const stripBold = (s) => s.replace(/\*\*/g, "").trim();

async function run() {
  // mammoth gives us the text; we mark bold so we can detect the correct option
  const { value: html } = await mammoth.convertToHtml({ path: FILE });
  // turn html into line-ish text, keeping <strong> as ** markers
  const text = html
    .replace(/<strong>/g, "**").replace(/<\/strong>/g, "**")
    .replace(/<\/p>/g, "\n").replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&radic;/g, "√");

  const lines = text.split("\n");
  const questions = [];
  let chapter = "General";
  let q = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    const clean = stripBold(line);

    // chapter header
    const chMatch = clean.match(/Chapter\s*\d+\s*:\s*.+$/i);
    if (line.includes("MCQs") && chMatch) {
      chapter = clean.replace(/^.*MCQs\s*[—-]\s*/i, "").trim();
      continue;
    }

    // question
    const qMatch = clean.match(/^Q\d+\.\s*(.+)$/);
    if (qMatch) {
      if (q) questions.push(q);
      q = { chapter, text: qMatch[1].trim(), options: [], correctIndex: -1 };
      continue;
    }
    if (!q) continue;

    // correct answer line
    if (line.includes("Correct Answer")) {
      const m = clean.match(/Correct Answer:\s*([a-d])\)/i);
      if (m) q.correctIndex = "abcd".indexOf(m[1].toLowerCase());
      continue;
    }

    // option
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
  console.log(`Parsed ${questions.length} questions, ${valid.length} valid.`);

  let saved = 0;
  for (const x of valid) {
    await prisma.question.create({
      data: {
        topic: x.chapter,
        chapter: x.chapter,
        text: x.text,
        options: x.options,
        correctIndex: x.correctIndex,
        solutionSteps: "",
        trick: "",
        difficulty: "Medium",
        source: "imported",
      },
    });
    saved++;
  }
  console.log(`✅ Saved ${saved} questions to the database.`);
  await prisma.$disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });