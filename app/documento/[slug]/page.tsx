import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Download, User } from 'lucide-react';
import { siteConfig } from '@/data/site';
import {
  getAdjacentChapters,
  getAllChaptersMeta,
  getChapterBySlug,
} from '@/lib/content';
import { getBreadcrumbJsonLd, getChapterArticleJsonLd } from '@/lib/schema-org';
import { ChapterNavigation } from '@/components/documento/ChapterNavigation';
import { ChapterReader } from '@/components/documento/ChapterReader';
import { ReadingProgressBar } from '@/components/documento/ReadingProgressBar';
import { ShareButtons } from '@/components/documento/ShareButtons';
import { TableOfContents } from '@/components/documento/TableOfContents';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

interface ChapterPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllChaptersMeta().map((chapter) => ({
    slug: chapter.slug,
  }));
}

export function generateMetadata({ params }: ChapterPageProps): Metadata {
  const chapter = getChapterBySlug(params.slug);
  if (!chapter) {
    return {
      title: 'Capítulo no encontrado',
    };
  }

  const pageTitle = `Cap. ${chapter.order}: ${chapter.title}`;
  const ogImageUrl = `/api/og?title=${encodeURIComponent(`${chapter.order}. ${chapter.title}`)}&description=${encodeURIComponent(chapter.description)}&badge=${encodeURIComponent(`Capítulo ${chapter.order} de 21 · ${chapter.category}`)}`;

  return {
    title: pageTitle,
    description: chapter.description,
    alternates: {
      canonical: `/documento/${chapter.slug}`,
    },
    openGraph: {
      type: 'article',
      title: `${pageTitle} | ${siteConfig.name}`,
      description: chapter.description,
      url: `${siteConfig.url}/documento/${chapter.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | ${siteConfig.name}`,
      description: chapter.description,
      images: [ogImageUrl],
    },
  };
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const chapter = getChapterBySlug(params.slug);

  if (!chapter) {
    notFound();
  }

  const { prev, next } = getAdjacentChapters(chapter.order);
  const articleJsonLd = getChapterArticleJsonLd(chapter);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Documento', url: '/documento' },
    { name: `${chapter.order}. ${chapter.title}`, url: `/documento/${chapter.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ReadingProgressBar />

      {/* Encabezado del capítulo con H1 único */}
      <Section variant="dark" className="py-10 sm:py-14">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 print:hidden">
            <Link
              href="/documento"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-paramo-100 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Volver al índice de los 21 capítulos</span>
            </Link>

            <a
              href={siteConfig.pdfUrl}
              download="Anteproyecto-Escuela-Tecnica-Agroturistica-La-Mesa-de-Esnujaque.pdf"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300 underline hover:text-amber-200"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Descargar PDF completo</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="warning">Capítulo {chapter.order} de 21</Badge>
            <Badge variant="paramo">{chapter.category}</Badge>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight max-w-4xl">
            {chapter.title}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-paramo-100 max-w-3xl leading-relaxed">
            {chapter.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-xs sm:text-sm text-paramo-200">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <span>{siteConfig.author.name}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <span>Tiempo estimado de lectura: {chapter.readingTimeMinutes} min</span>
            </span>
          </div>
        </Container>
      </Section>

      {/* Cuerpo del capítulo con TOC lateral sticky en desktop y acordeón en móvil */}
      <Section variant="default" className="py-10 sm:py-14">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Sidebar TOC */}
            <div className="lg:col-span-4 lg:order-2">
              <TableOfContents headings={chapter.headings} />
            </div>

            {/* Lector del capítulo */}
            <div className="lg:col-span-8 lg:order-1 space-y-10">
              <ChapterReader content={chapter.content} />

              <ShareButtons title={chapter.title} slug={chapter.slug} />

              <ChapterNavigation prev={prev} next={next} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
