import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { getAllChaptersMeta } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/resumen',
    '/documento',
    '/documento/completo',
    '/territorio',
    '/etapas',
    '/cronograma',
    '/participa',
    '/autor',
    '/descargas',
    '/contacto',
    '/privacidad',
    '/terminos',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date('2026-09-18'),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.85,
  }));

  const chapterEntries: MetadataRoute.Sitemap = getAllChaptersMeta().map((chapter) => ({
    url: `${siteConfig.url}/documento/${chapter.slug}`,
    lastModified: new Date('2026-09-18'),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...chapterEntries];
}
