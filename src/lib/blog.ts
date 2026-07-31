import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ============================================================
// LeProfNomade — Le blog (carnets de route)
// Articles MDX rangés par pays dans src/content/blog/{pays}/.
// Même mécanique que lessons.ts : gray-matter + slug = nom de fichier.
// ============================================================

const blogDir = path.join(process.cwd(), 'src/content/blog');

export const blogPays = ['coreen', 'italien', 'anglais'] as const;
export type BlogPays = (typeof blogPays)[number];

export interface PostMeta {
  slug: string;
  title: string;
  category: string;
  readTime: number;
  image: string;
  excerpt: string;
  relatedEscale: number;
  order: number;
  pays: string;
}

export function getAllPosts(pays: string): PostMeta[] {
  const dir = path.join(blogDir, pays);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const { data } = matter(fs.readFileSync(path.join(dir, filename), 'utf-8'));
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title || '',
        category: data.category || '',
        readTime: data.readTime || 4,
        image: data.image || '',
        excerpt: data.excerpt || '',
        relatedEscale: data.relatedEscale || 1,
        order: data.order || 99,
        pays,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getPost(pays: string, slug: string) {
  const filePath = path.join(blogDir, pays, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'));
  return { meta: data, content };
}

// Catégories présentes pour un pays, dans l'ordre d'apparition
export function getCategories(pays: string): string[] {
  const seen: string[] = [];
  getAllPosts(pays).forEach((p) => {
    if (p.category && seen.indexOf(p.category) === -1) seen.push(p.category);
  });
  return seen;
}
