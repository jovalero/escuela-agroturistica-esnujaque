import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { slugifyHeading } from './utils';

export interface ChapterHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ChapterMeta {
  order: number;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  readingTimeMinutes: number;
  wordCount: number;
  headings: ChapterHeading[];
}

export interface Chapter extends ChapterMeta {
  content: string;
}

export interface SearchableItem {
  order: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  headings: string[];
  plainText: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'documento');

function extractHeadings(markdown: string): ChapterHeading[] {
  const lines = markdown.split(/\r?\n/);
  const headings: ChapterHeading[] = [];
  const usedIds = new Set<string>();

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match || h3Match) {
      const text = (h2Match ? h2Match[1] : h3Match![1]).trim();
      const level: 2 | 3 = h2Match ? 2 : 3;
      let id = slugifyHeading(text);
      let suffix = 2;
      while (usedIds.has(id)) {
        id = `${slugifyHeading(text)}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(id);
      headings.push({ id, text, level });
    }
  }

  return headings;
}

function calculateReadingTime(markdown: string): { readingTimeMinutes: number; wordCount: number } {
  const words = markdown
    .replace(/[#>*|-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 185));
  return { readingTimeMinutes, wordCount: words };
}

export function getAllChapters(): Chapter[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort();

  const chapters: Chapter[] = files.map((file) => {
    const fullPath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(raw);
    const trimmedContent = content.trim();
    const headings = extractHeadings(trimmedContent);
    const { readingTimeMinutes, wordCount } = calculateReadingTime(trimmedContent);

    return {
      order: Number(data.order),
      slug: String(data.slug),
      title: String(data.title),
      shortTitle: String(data.shortTitle || `${data.order}. ${data.title}`),
      description: String(data.description),
      category: String(data.category || 'Documento'),
      readingTimeMinutes,
      wordCount,
      headings,
      content: trimmedContent,
    };
  });

  return chapters.sort((a, b) => a.order - b.order);
}

export function getAllChaptersMeta(): ChapterMeta[] {
  return getAllChapters().map(({ content: _content, ...meta }) => meta);
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return getAllChapters().find((chapter) => chapter.slug === slug);
}

export function getAdjacentChapters(order: number): {
  prev: ChapterMeta | null;
  next: ChapterMeta | null;
} {
  const all = getAllChaptersMeta();
  const index = all.findIndex((ch) => ch.order === order);
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index >= 0 && index < all.length - 1 ? all[index + 1] : null,
  };
}

export function getSearchIndex(): SearchableItem[] {
  return getAllChapters().map((ch) => ({
    order: ch.order,
    slug: ch.slug,
    title: ch.title,
    category: ch.category,
    description: ch.description,
    headings: ch.headings.map((h) => h.text),
    plainText: ch.content
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/[>*_`|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  }));
}
