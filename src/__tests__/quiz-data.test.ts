import fs from 'fs';
import path from 'path';

const quizDir = path.join(process.cwd(), 'src/content/quiz');
const quizFiles = fs.readdirSync(quizDir).filter((f) => f.endsWith('.json'));

describe('Quiz JSON — intégrité des données', () => {
  test('36 fichiers quiz existent (12 escales × 3 langues)', () => {
    expect(quizFiles.length).toBe(36);
  });

  test.each(quizFiles)('%s est un JSON valide avec les champs requis', (file) => {
    const raw = fs.readFileSync(path.join(quizDir, file), 'utf-8');
    const quiz = JSON.parse(raw);

    expect(quiz).toHaveProperty('lang');
    expect(quiz).toHaveProperty('escale');
    expect(quiz).toHaveProperty('title');
    expect(quiz).toHaveProperty('questions');
    expect(Array.isArray(quiz.questions)).toBe(true);
    expect(quiz.questions.length).toBeGreaterThanOrEqual(10);
  });

  test.each(quizFiles)('%s — chaque question a 3 options et un correct valide', (file) => {
    const quiz = JSON.parse(fs.readFileSync(path.join(quizDir, file), 'utf-8'));

    for (const q of quiz.questions) {
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('options');
      expect(q).toHaveProperty('correct');
      expect(q).toHaveProperty('explanation');
      expect(q.options.length).toBe(3);
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.options.length);
      expect(typeof q.explanation).toBe('string');
      expect(q.explanation.length).toBeGreaterThan(0);
    }
  });

  test('les préfixes de langue sont cohérents (en → anglais, kr → coréen, it → italien)', () => {
    const langMap: Record<string, string> = { en: 'anglais', kr: 'coreen', it: 'italien' };

    for (const file of quizFiles) {
      const prefix = file.split('-')[0];
      const quiz = JSON.parse(fs.readFileSync(path.join(quizDir, file), 'utf-8'));
      expect(quiz.lang).toBe(langMap[prefix]);
    }
  });
});
