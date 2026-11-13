import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Download, FileText, Layers } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getAllChaptersMeta, getSearchIndex } from '@/lib/content';
import { getBreadcrumbJsonLd } from '@/lib/schema-org';
import { DocumentSearch } from '@/components/documento/DocumentSearch';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Índice General del Anteproyecto (21 Capítulos)',
  description:
    'Consultá el índice completo del anteproyecto Escuela Técnica Agroturística de La Mesa de Esnujaque dividido en 21 capítulos independientes, con buscador interno y descarga en PDF.',
  alternates: {
    canonical: '/documento',
  },
  openGraph: {
    title: `Índice del Anteproyecto (21 Capítulos) | ${siteConfig.name}`,
    description:
      'Lectura completa por capítulos con índice enlazado, buscador interno, tiempos de lectura y descarga en PDF.',
    url: `${siteConfig.url}/documento`,
  },
};

export default function DocumentoIndexPage() {
  const chapters = getAllChaptersMeta();
  const searchItems = getSearchIndex();
  const totalMinutes = chapters.reduce((acc, ch) => acc + ch.readingTimeMinutes, 0);

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Documento del Anteproyecto', url: '/documento' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Section variant="dark" className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="warning">{siteConfig.statusBadge}</Badge>
            <Badge variant="paramo">21 capítulos íntegros · ~{totalMinutes} min de lectura total</Badge>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-4xl leading-tight">
            Documento del Anteproyecto
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paramo-100 max-w-3xl leading-relaxed">
            {siteConfig.documentTitle}.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              href="/documento/reflexion-inicial"
              className="bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Comenzar por el Capítulo 1</span>
            </Button>
            <Button
              href="/documento/completo"
              variant="outline"
              className="border-white/65 text-white hover:bg-white/15 dark:border-white/65 dark:text-white"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Lectura continua (para imprimir)</span>
            </Button>
            <Button
              href={siteConfig.pdfUrl}
              download="Anteproyecto-Escuela-Tecnica-Agroturistica-La-Mesa-de-Esnujaque.pdf"
              variant="secondary"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Descargar PDF completo</span>
            </Button>
          </div>
        </Container>
      </Section>

      <Section variant="default">
        <Container className="space-y-10">
          {/* Buscador instantáneo sin servidor */}
          <DocumentSearch items={searchItems} />

          {/* Lista de los 21 capítulos en tarjetas */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                Índice de los 21 capítulos
              </h2>
              <span className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Texto migrado de forma íntegra y fiel al documento original de {siteConfig.author.name}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter) => (
                <Card
                  key={chapter.slug}
                  hoverable
                  className="flex flex-col justify-between p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-paramo-700 text-xs font-bold text-white">
                        {chapter.order}
                      </span>
                      <Badge variant="paramo">{chapter.category}</Badge>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                      <Link
                        href={`/documento/${chapter.slug}`}
                        className="hover:text-paramo-700 dark:hover:text-paramo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600 rounded"
                      >
                        {chapter.title}
                      </Link>
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      {chapter.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-200/80 dark:border-paramo-800/80 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Clock className="h-3.5 w-3.5 text-paramo-700 dark:text-paramo-300" aria-hidden="true" />
                        {chapter.readingTimeMinutes} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Layers className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
                        {chapter.headings.length}{' '}
                        {chapter.headings.length === 1 ? 'sección' : 'secciones'}
                      </span>
                    </div>

                    <Link
                      href={`/documento/${chapter.slug}`}
                      aria-label={`Leer capítulo ${chapter.order}: ${chapter.title}`}
                      className="inline-flex items-center gap-1 font-bold text-paramo-800 dark:text-paramo-200 hover:underline"
                    >
                      <span>Leer</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
