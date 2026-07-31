import { getAllLessons } from '@/lib/lessons';

const langs = ['anglais', 'coreen', 'italien'] as const;

describe('Leçons MDX — intégrité des données', () => {
  for (const lang of langs) {
    const lessons = getAllLessons(lang);

    test(`${lang} — 60 leçons existent`, () => {
      expect(lessons.length).toBe(60);
    });

    test(`${lang} — 12 escales de 5 leçons chacune`, () => {
      const byEscale: Record<number, number> = {};
      for (const l of lessons) {
        byEscale[l.escale] = (byEscale[l.escale] || 0) + 1;
      }
      expect(Object.keys(byEscale).length).toBe(12);
      for (let e = 1; e <= 12; e++) {
        expect(byEscale[e]).toBe(5);
      }
    });

    test(`${lang} — chaque leçon a un titre et un escaleTitle`, () => {
      for (const l of lessons) {
        expect(l.title.length).toBeGreaterThan(0);
        expect(l.escaleTitle.length).toBeGreaterThan(0);
      }
    });

    test(`${lang} — pas de slugs dupliqués`, () => {
      const slugs = lessons.map((l) => l.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    test(`${lang} — les numéros de leçon vont de 1 à 5 dans chaque escale`, () => {
      const byEscale = new Map<number, number[]>();
      for (const l of lessons) {
        const arr = byEscale.get(l.escale) || [];
        arr.push(l.lesson);
        byEscale.set(l.escale, arr);
      }
      for (const [, nums] of Array.from(byEscale.entries())) {
        expect(nums.sort()).toEqual([1, 2, 3, 4, 5]);
      }
    });
  }
});
