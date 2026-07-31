import { getAllPosts, blogPays } from '@/lib/blog';

describe('Blog MDX — intégrité des données', () => {
  test('3 pays sont définis', () => {
    expect(blogPays.length).toBe(3);
  });

  for (const pays of blogPays) {
    const posts = getAllPosts(pays);

    test(`${pays} — 10 articles existent`, () => {
      expect(posts.length).toBe(10);
    });

    test(`${pays} — chaque article a les champs requis`, () => {
      for (const p of posts) {
        expect(p.title.length).toBeGreaterThan(0);
        expect(p.category.length).toBeGreaterThan(0);
        expect(p.readTime).toBeGreaterThan(0);
        expect(p.image).toMatch(/^https:\/\//);
        expect(p.excerpt.length).toBeGreaterThan(0);
        expect(p.relatedEscale).toBeGreaterThanOrEqual(1);
        expect(p.relatedEscale).toBeLessThanOrEqual(12);
      }
    });

    test(`${pays} — pas de slugs dupliqués`, () => {
      const slugs = posts.map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    test(`${pays} — les ordres sont uniques`, () => {
      const orders = posts.map((p) => p.order);
      expect(new Set(orders).size).toBe(orders.length);
    });
  }
});
