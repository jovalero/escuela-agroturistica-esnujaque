import { siteConfig } from '@/data/site';
import type { ChapterMeta } from './content';

export function getBaseJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.documentTitle,
        inLanguage: 'es-VE',
        publisher: {
          '@id': `${siteConfig.url}/#author`,
        },
      },
      {
        '@type': 'EducationalOrganization',
        '@id': `${siteConfig.url}/#project-organization`,
        name: `${siteConfig.name} (Anteproyecto en Consulta Comunitaria)`,
        description: `${siteConfig.documentTitle}. ${siteConfig.legalDisclaimer}`,
        url: siteConfig.url,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'La Mesa de Esnujaque, Municipio Urdaneta',
          addressRegion: 'Estado Trujillo',
          addressCountry: 'VE',
        },
        founder: {
          '@id': `${siteConfig.url}/#author`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#author`,
        name: siteConfig.author.name,
        jobTitle: siteConfig.author.role,
        url: `${siteConfig.url}/autor`,
      },
      {
        '@type': 'Place',
        '@id': `${siteConfig.url}/#place`,
        name: 'Comunidad La Mesa de Esnujaque',
        description:
          'Comunidad andina ubicada en el Municipio Urdaneta del Estado Trujillo, República Bolivariana de Venezuela, con patrimonio agrícola, paisajístico, hídrico y cultural.',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.location.coordinates.lat,
          longitude: siteConfig.location.coordinates.lng,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'La Mesa de Esnujaque',
          addressRegion: 'Trujillo',
          addressCountry: 'VE',
        },
      },
    ],
  };
}

export function getChapterArticleJsonLd(chapter: ChapterMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${chapter.order}. ${chapter.title} — ${siteConfig.name}`,
    description: chapter.description,
    inLanguage: 'es-VE',
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: `${siteConfig.url}/autor`,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    datePublished: '2026-01-01',
    dateModified: '2026-09-18',
    mainEntityOfPage: `${siteConfig.url}/documento/${chapter.slug}`,
    isPartOf: {
      '@type': 'CreativeWork',
      name: siteConfig.documentTitle,
      url: `${siteConfig.url}/documento`,
    },
  };
}

export function getBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}
