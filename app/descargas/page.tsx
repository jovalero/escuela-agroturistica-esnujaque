import React from 'react';
import type { Metadata } from 'next';
import { BookOpen, CheckCircle2, Download, FileSpreadsheet, FileText } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getBreadcrumbJsonLd } from '@/lib/schema-org';
import { PrintButton } from '@/components/documento/PrintButton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Descargas: Documento Completo en PDF, Resumen Ejecutivo y Ficha Técnica',
  description:
    'Descargá el documento completo en PDF del anteproyecto Escuela Técnica Agroturística de La Mesa de Esnujaque, el resumen ejecutivo y la ficha informativa para presentación comunitaria e institucional.',
  alternates: {
    canonical: '/descargas',
  },
  openGraph: {
    title: `Centro de Descargas (PDF y Ficha) | ${siteConfig.name}`,
    description:
      'Descargá el anteproyecto completo en PDF para lectura sin conexión, asambleas comunitarias y presentaciones institucionales.',
    url: `${siteConfig.url}/descargas`,
  },
};

export default function DescargasPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Centro de Descargas', url: '/descargas' },
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
            <Badge variant="warning">Lectura sin conexión (Offline)</Badge>
            <Badge variant="paramo">Edición 2026</Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-4xl leading-tight">
            Descargas y Documentos Oficiales
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paramo-100 max-w-3xl leading-relaxed">
            Descargá el anteproyecto íntegro en formato PDF o accedé a las versiones resumidas e imprimibles para compartir en asambleas comunitarias, reuniones institucionales o zonas con baja conectividad.
          </p>
        </Container>
      </Section>

      <Section variant="default">
        <Container className="space-y-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* 1. Documento completo en PDF */}
            <Card className="flex flex-col justify-between border-2 border-paramo-600 dark:border-paramo-400 p-6 sm:p-7">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-paramo-700 text-white">
                  <Download className="h-6 w-6" aria-hidden="true" />
                </div>
                <Badge variant="paramo">Documento Principal · PDF</Badge>
                <h2 className="mt-3 font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Anteproyecto Completo (21 Capítulos)
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  Contiene el texto íntegro del anteproyecto elaborado por el {siteConfig.author.name}, incluyendo portada, índice general, los 21 capítulos, cronograma de 6 meses y las 18 referencias bibliográficas.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-paramo-800">
                <Button
                  href={siteConfig.pdfUrl}
                  download="Anteproyecto-Escuela-Tecnica-Agroturistica-La-Mesa-de-Esnujaque.pdf"
                  variant="primary"
                  className="w-full"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Descargar PDF Completo</span>
                </Button>
              </div>
            </Card>

            {/* 2. Resumen Ejecutivo */}
            <Card className="flex flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tierra-100 dark:bg-tierra-900/60 text-tierra-800 dark:text-tierra-200">
                  <FileText className="h-6 w-6" aria-hidden="true" />
                </div>
                <Badge variant="tierra">Lectura Rápida · 1 Página</Badge>
                <h2 className="mt-3 font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Resumen Ejecutivo
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  Síntesis ejecutiva de una página (marcada pendiente de aprobación del autor) ideal para presentar de forma concisa el propósito, las etapas y el alcance ante posibles aliados e instituciones.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-paramo-800">
                <Button href="/resumen" variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span>Abrir Resumen Ejecutivo</span>
                </Button>
              </div>
            </Card>

            {/* 3. Versión de Lectura Continua e Impresión */}
            <Card className="flex flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-laguna-100 dark:bg-laguna-900/60 text-laguna-800 dark:text-laguna-200">
                  <FileSpreadsheet className="h-6 w-6" aria-hidden="true" />
                </div>
                <Badge variant="laguna">Edición Continua · Print CSS</Badge>
                <h2 className="mt-3 font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Versión de Impresión Web
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  Visualizá los 21 capítulos en una sola página continua optimizada con hojas de estilo de impresión (<code>@media print</code>) para imprimir directamente desde cualquier navegador.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-paramo-800">
                <Button href="/documento/completo" variant="secondary" className="w-full">
                  <span>Abrir versión imprimible</span>
                </Button>
              </div>
            </Card>
          </div>

          {/* Ficha Informativa Imprimible en página */}
          <Card className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-paramo-800 pb-6">
              <div>
                <Badge variant="paramo">Ficha Informativa del Anteproyecto</Badge>
                <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                  Datos clave para presentación comunitaria e institucional
                </h2>
              </div>
              <PrintButton label="Imprimir ficha informativa" />
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm">
              <div className="rounded-xl bg-stone-50 dark:bg-paramo-900/40 p-4">
                <dt className="font-bold text-paramo-800 dark:text-paramo-200">
                  Nombre de la iniciativa
                </dt>
                <dd className="mt-1 text-stone-800 dark:text-stone-200">{siteConfig.name}</dd>
              </div>

              <div className="rounded-xl bg-stone-50 dark:bg-paramo-900/40 p-4">
                <dt className="font-bold text-paramo-800 dark:text-paramo-200">
                  Título completo del documento
                </dt>
                <dd className="mt-1 text-stone-800 dark:text-stone-200">
                  {siteConfig.documentTitle}
                </dd>
              </div>

              <div className="rounded-xl bg-stone-50 dark:bg-paramo-900/40 p-4">
                <dt className="font-bold text-paramo-800 dark:text-paramo-200">Autor y Año</dt>
                <dd className="mt-1 text-stone-800 dark:text-stone-200">
                  {siteConfig.author.name} · Año {siteConfig.year}
                </dd>
              </div>

              <div className="rounded-xl bg-stone-50 dark:bg-paramo-900/40 p-4">
                <dt className="font-bold text-paramo-800 dark:text-paramo-200">
                  Ubicación geográfica
                </dt>
                <dd className="mt-1 text-stone-800 dark:text-stone-200">
                  {siteConfig.location.fullLabel}
                </dd>
              </div>

              <div className="rounded-xl bg-stone-50 dark:bg-paramo-900/40 p-4 sm:col-span-2">
                <dt className="font-bold text-paramo-800 dark:text-paramo-200">
                  Carácter y condición del documento
                </dt>
                <dd className="mt-1 text-stone-800 dark:text-stone-200 leading-relaxed">
                  {siteConfig.detailedDisclaimer}
                </dd>
              </div>
            </dl>

            <div className="mt-6 pt-6 border-t border-stone-200 dark:border-paramo-800">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">
                Resumen de las tres etapas de las Conclusiones:
              </h3>
              <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Etapa 1:</strong> Transformación progresiva del actual liceo en Escuela Técnica Agroturística y evaluación de parte de la sede de la Fundación del Niño para la posible instalación de un Laboratorio de Análisis de Suelos.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Etapa 2:</strong> Conformación de una Comisión Técnica Comunitaria multidisciplinaria para realizar la evaluación integral del lote de terreno ubicado en el sector Chipuén.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Etapa 3:</strong> Investigación jurídica, registral e histórica sobre la condición legal del terreno en el sector Chipuén antes de valorar cualquier eventual incorporación a proyectos comunitarios.
                  </span>
                </li>
              </ul>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
