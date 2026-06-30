import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src/content');

export interface LessonMeta {
  slug: string;
  title: string;
  escale: number;
  escaleTitle: string;
  lesson: number;
  description: string;
  lang: 'anglais' | 'coreen' | 'italien';
}

export function getAllLessons(lang: string): LessonMeta[] {
  const langDir = path.join(contentDir, lang);
  if (!fs.existsSync(langDir)) return [];

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.mdx'));

  return files
    .map(filename => {
      const filePath = path.join(langDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        slug: filename.replace('.mdx', ''),
        title: data.title || '',
        escale: data.escale || 1,
        escaleTitle: data.escaleTitle || '',
        lesson: data.lesson || 1,
        description: data.description || '',
        lang: lang as LessonMeta['lang'],
      };
    })
    .sort((a, b) => a.escale - b.escale || a.lesson - b.lesson);
}

export function getLessonContent(lang: string, slug: string) {
  const filePath = path.join(contentDir, lang, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return { meta: data, content };
}
