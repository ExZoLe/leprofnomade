import fs from 'fs';
import path from 'path';

export interface EscaleQuizData {
  lang: string;
  escale: number;
  title: string;
  color: string;
  nextEscaleSlug?: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
}

const quizDir = path.join(process.cwd(), 'src/content/quiz');

export function getQuizBySlug(slug: string): EscaleQuizData | null {
  const filePath = path.join(quizDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as EscaleQuizData;
  } catch {
    return null;
  }
}

export function getAllQuizSlugs(): string[] {
  if (!fs.existsSync(quizDir)) return [];
  return fs
    .readdirSync(quizDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''));
}
