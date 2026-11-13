import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getAllChapters } from '@/lib/content';
import { getBreadcrumbJsonLd } from '@/lib/schema-org';
import { ChapterReader } from '@/components/documento/ChapterReader';
import { PrintButton } from '@/components/documento/PrintButton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Lectura Continua del Documento Completo (21 Capítulos)',
  description:
    'Versión de lectura continua e impresión de los 21 capítulos íntegros del anteproyecto Escuela Técnica Agroturística de La Mesa de Esnujaque.',
  alternates: {
    canonical: '/documento/completo',
  },
  openGraph: {
    title: `Documento Completo (Lectura Continua) | ${siteConfig.name}`,
    description:
      'Versión íntegra de lectura continua optimizada para imprimir de los 21 capítulos del anteproyecto.',
    url: `${siteConfig.url}/documento/completo`,
  },
};

export default function DocumentoCompletoPage() {
  const chapters = getAllChapters();
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Documento', url: '/documento' },
    { name: 'Lectura Continua', url: '/documento/completo' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Section variant="dark" className="py-12 sm:py-16 print:bg-white print:text-black print:py-4">
        <Container size="narrow">
          <div className="mb-4 print:hidden">
            <Link
              href="/documento"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-paramo-100 hover:text-amber-300"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Volver al índice por capítulos</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3 print:hidden">
            <Badge variant="warning">Edición Íntegra · 21 Capítulos</Badge>
            <Badge variant="paramo">Optimizada para Impresión</Badge>
          </div>

          <p className="hidden print:block text-xs font-bold uppercase tracking-wider mb-2">
            República Bolivariana de Venezuela · Estado Trujillo · Municipio Urdaneta · Comunidad La Mesa de Esnujaque
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white print:text-black leading-tight">
            {siteConfig.name}
          </h1>
          <p className="mt-3 font-serif text-base sm:text-xl text-paramo-100 print:text-black leading-relaxed">
            {siteConfig.documentTitle}
          </p>
          <p className="mt-3 text-xs sm:text-sm text-paramo-200 print:text-black">
            <strong>Autor:</strong> {siteConfig.author.name} · <strong>Año:</strong> {siteConfig.year} ·{' '}
            <span>{siteConfig.legalDisclaimer}</span>
          </p>

          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            <PrintButton />
            <Button
              href={siteConfig.pdfUrl}
              download="Anteproyecto-Escuela-Tecnica-Agroturistica-La-Mesa-de-Esnujaque.pdf"
              variant="outline"
              className="border-white/70 text-white hover:bg-white/15 dark:border-white/70 dark:text-white"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Descargar PDF</span>
            </Button>
          </div>
        </Container>
      </Section>

      <Section variant="default">
        <Container size="narrow">
          {/* Índice rápido de salto */}
          <nav
            aria-label="Índice rápido del documento completo"
            className="mb-12 rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark p-6 shadow-sm print:border-black"
          >
            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Tabla general de capítulos
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {chapters.map((ch) => (
                <li key={ch.slug}>
                  <a
                    href={`#capitulo-${ch.order}`}
                    className="text-paramo-800 dark:text-paramo-200 hover:underline font-medium"
                  >
                    {ch.order}. {ch.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Los 21 capítulos en secuencia */}
          <div className="space-y-16">
            {chapters.map((chapter, idx) => (
              <section
                key={chapter.slug}
                id={`capitulo-${chapter.order}`}
                className="scroll-mt-24 border-b border-stone-200 dark:border-paramo-800 pb-14 last:border-b-0"
              >
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-paramo-700 dark:text-paramo-300">
                    Capítulo {chapter.order} de 21 · {chapter.category}
                  </span>
                  <h2 className="mt-1 font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                    {chapter.order}. {chapter.title}
                  </h2>
                </div>

                <ChapterReader content={chapter.content} showControls={idx === 0} />
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
