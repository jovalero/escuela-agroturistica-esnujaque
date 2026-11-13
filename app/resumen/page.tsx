import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { AlertTriangle, BookOpen, CheckCircle2, Download, FileText } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { getBreadcrumbJsonLd } from '@/lib/schema-org';

export const metadata: Metadata = {
  title: 'Resumen Ejecutivo del Anteproyecto',
  description:
    'Síntesis ejecutiva de una página del anteproyecto Escuela Técnica Agroturística de La Mesa de Esnujaque (Municipio Urdaneta, Estado Trujillo), para lectura rápida de la comunidad e instituciones.',
  alternates: {
    canonical: '/resumen',
  },
  openGraph: {
    title: `Resumen Ejecutivo | ${siteConfig.name}`,
    description:
      'Síntesis en una página de objetivos, alternativas de ejecución, etapas e impactos esperados del anteproyecto.',
    url: `${siteConfig.url}/resumen`,
  },
};

export default function ResumenPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Resumen Ejecutivo', url: '/resumen' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Section variant="dark" className="py-12 sm:py-16">
        <Container size="narrow">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-full border-2 border-amber-300/60 bg-[#FAF8F5] p-0.5 shadow-sm">
              <Image
                src={siteConfig.logo.emblem}
                alt={siteConfig.logo.alt}
                width={56}
                height={56}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="warning">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                Pendiente de aprobación del autor
              </Badge>
              <Badge variant="paramo">Lectura de 1 página · 4 min</Badge>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Resumen Ejecutivo del Anteproyecto
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paramo-100 leading-relaxed">
            {siteConfig.documentTitle}
          </p>
          <p className="mt-2 text-xs sm:text-sm text-paramo-200">
            <strong>Autor:</strong> {siteConfig.author.name} ·{' '}
            <strong>Ubicación:</strong> {siteConfig.location.fullLabel} ·{' '}
            <strong>Año:</strong> {siteConfig.year}
          </p>
        </Container>
      </Section>

      <Section variant="default">
        <Container size="narrow" className="space-y-8">
          {/* Aviso de revisión del autor y naturaleza de anteproyecto */}
          <div
            role="note"
            aria-label="Aviso de estado del resumen ejecutivo"
            className="rounded-2xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50/90 dark:bg-amber-950/40 p-5 text-sm text-amber-950 dark:text-amber-100"
          >
            <p className="font-bold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden="true" />
              <span>Síntesis ejecutiva pendiente de aprobación del autor</span>
            </p>
            <p className="mt-1.5 leading-relaxed">
              Este resumen ejecutivo ha sido redactado fielmente a partir de los 21 capítulos del anteproyecto original para facilitar una lectura rápida de una página ante la comunidad e instituciones, y se encuentra sujeto a la revisión y aprobación final del autor ({siteConfig.author.name}). Para consultar el texto literal completo, visitá el{' '}
              <Link href="/documento" className="font-bold underline">
                Índice del Documento
              </Link>
              .
            </p>
          </div>

          {/* 1. Ficha de identificación */}
          <Card className="p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-paramo-900 dark:text-paramo-100 mb-4">
              1. Naturaleza y propósito de la propuesta
            </h2>
            <p className="text-base leading-relaxed text-stone-800 dark:text-stone-200">
              El anteproyecto propone estudiar la viabilidad de la <strong>creación progresiva de una Escuela Técnica Agroturística</strong> en la comunidad La Mesa de Esnujaque (Municipio Urdaneta, Estado Trujillo), concebida como una alternativa educativa orientada al reconocimiento, protección, recuperación y aprovechamiento responsable del patrimonio territorial.
            </p>
            <p className="mt-3 text-base leading-relaxed text-stone-800 dark:text-stone-200">
              Su finalidad es articular la educación técnica con seis componentes estratégicos: <strong>agricultura sostenible, turismo rural y agroturismo, conservación ambiental y de recursos hídricos, agroindustria, emprendimiento comunitario e investigación aplicada</strong>, promoviendo que los habitantes —especialmente los jóvenes— encuentren oportunidades de formación y desarrollo en su propio territorio.
            </p>
          </Card>

          {/* 2. Justificación y patrimonio territorial */}
          <Card className="p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-paramo-900 dark:text-paramo-100 mb-4">
              2. Diagnóstico y potencialidades del territorio
            </h2>
            <p className="text-base leading-relaxed text-stone-800 dark:text-stone-200">
              La Mesa de Esnujaque cuenta con una arraigada tradición agrícola andina, paisajes de montaña, recursos hídricos y atractivos naturales y culturales como el <strong>Santuario de Durí</strong>, la <strong>Laguna de la Estrella</strong> y la <strong>Laguna de Pozo Negro</strong>. Sin embargo, estas potencialidades conviven con la necesidad de espacios de formación técnica especializados en el manejo sostenible de suelos, uso eficiente del agua, valoración turística responsable y transformación agroindustrial.
            </p>
          </Card>

          {/* 3. Alternativa recomendada y hoja de ruta en tres etapas */}
          <Card className="p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-paramo-900 dark:text-paramo-100 mb-4">
              3. Alternativa recomendada y etapas de materialización
            </h2>
            <p className="text-base leading-relaxed text-stone-800 dark:text-stone-200 mb-4">
              Tras analizar cinco alternativas no excluyentes (construcción de sede nueva, adecuación de infraestructura existente, implementación por etapas, cooperación interinstitucional y centro inicial de capacitación), el anteproyecto recomienda una ruta progresiva estructurada en tres etapas y una visión de largo plazo:
            </p>
            <ul className="space-y-3 text-sm sm:text-base text-stone-800 dark:text-stone-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Primera etapa (Infraestructura existente):</strong> Evaluar la transformación progresiva del actual liceo en Escuela Técnica Agroturística y analizar el posible aprovechamiento de espacios de la sede de la Fundación del Niño para instalar un <strong>Laboratorio de Análisis de Suelos</strong> al servicio de estudiantes y productores, sujeto a viabilidad técnica, jurídica e institucional.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Segunda etapa (Comisión Técnica Comunitaria):</strong> Conformar una comisión integrada por la comunidad, autoridades y especialistas (hidrología, saneamiento ambiental, agronomía, ingeniería, turismo y conservación) para realizar una evaluación técnica y ambiental integral del lote ubicado en el <strong>sector Chipuén</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Tercera etapa (Investigación jurídica, registral e histórica):</strong> Promover un estudio legal riguroso sobre los antecedentes de propiedad, titularidad y delimitación del terreno en el sector Chipuén, evitando que cualquier iniciativa se adelante al esclarecimiento objetivo de su condición jurídica.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-tierra-600 dark:text-tierra-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Proyección de largo plazo:</strong> Únicamente si las condiciones jurídicas, técnicas, ambientales y económicas lo permiten en el futuro, proyectar un <strong>Parque Agroturístico Comunitario y Centro de Prácticas</strong> con parcelas demostrativas, viveros y educación ambiental.
                </span>
              </li>
            </ul>
          </Card>

          {/* 4. Metodología, cronograma y marco legal */}
          <Card className="p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-paramo-900 dark:text-paramo-100 mb-4">
              4. Sustento legal, metodología y cronograma (6 meses)
            </h2>
            <p className="text-base leading-relaxed text-stone-800 dark:text-stone-200">
              La propuesta se fundamenta en la Constitución de la República Bolivariana de Venezuela (arts. 102, 127 y 299), las leyes orgánicas de Educación, Ambiente, Tierras y Desarrollo Agrario, Aguas, Turismo, Comunas, Planificación Pública y Popular, Gestión Integral de la Basura, y los <strong>ODS 4, 8, 12, 13 y 15 de la Agenda 2030 (ONU, 2015)</strong>.
            </p>
            <p className="mt-3 text-base leading-relaxed text-stone-800 dark:text-stone-200">
              Su metodología descriptiva, de campo y documental contempla un <strong>cronograma preliminar de 6 meses y 15 actividades</strong> que culmina con la socialización y validación ante la Asamblea de Ciudadanos y Ciudadanas (Mes 5) y la presentación ante los organismos públicos competentes (Mes 6) como paso previo a la formulación del proyecto definitivo.
            </p>
          </Card>

          {/* Acciones finales */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-paramo-200 dark:border-paramo-800 bg-paramo-50/80 dark:bg-paramo-900/40 p-6 print:hidden">
            <div className="space-y-1">
              <p className="font-serif text-lg font-bold text-paramo-900 dark:text-paramo-100">
                ¿Deseás profundizar en el documento completo?
              </p>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                Accedé a los 21 capítulos íntegros o descargá el archivo PDF para lectura sin conexión.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/documento" variant="primary">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>Ver los 21 capítulos</span>
              </Button>
              <Button
                href={siteConfig.pdfUrl}
                download="Anteproyecto-Escuela-Tecnica-Agroturistica-La-Mesa-de-Esnujaque.pdf"
                variant="outline"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Descargar PDF</span>
              </Button>
              <Button href="/documento/completo" variant="secondary">
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Versión imprimible</span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
