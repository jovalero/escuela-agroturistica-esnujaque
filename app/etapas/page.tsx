import React from 'react';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, ShieldAlert } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getBreadcrumbJsonLd } from '@/lib/schema-org';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Timeline } from '@/components/ui/Timeline';

export const metadata: Metadata = {
  title: 'Hoja de Ruta y Etapas del Anteproyecto',
  description:
    'Conocé las tres etapas propuestas en el anteproyecto Escuela Técnica Agroturística de La Mesa de Esnujaque, las cinco alternativas de ejecución y la proyección de largo plazo.',
  alternates: {
    canonical: '/etapas',
  },
  openGraph: {
    title: `Hoja de Ruta y Etapas | ${siteConfig.name}`,
    description:
      'Etapa 1 (Liceo y Laboratorio de Suelos), Etapa 2 (Comisión Técnica Comunitaria), Etapa 3 (Investigación Jurídica y Registral) y Proyección de Largo Plazo.',
    url: `${siteConfig.url}/etapas`,
  },
};

const FIVE_ALTERNATIVES = [
  {
    number: 'Alternativa 1',
    title: 'Construcción de una nueva infraestructura educativa',
    horizon: 'Mediano o largo plazo',
    summary:
      'Planificación, diseño y construcción de una sede propia con aulas, laboratorios, áreas demostrativas agrícolas, viveros y ambientes agroindustriales. Requiere estudios de factibilidad, terrenos legalmente habilitados y recursos financieros suficientes.',
  },
  {
    number: 'Alternativa 2 (Recomendada)',
    title: 'Aprovechamiento y adecuación de la infraestructura existente',
    horizon: 'Punto de partida recomendado',
    summary:
      'Evaluar la transformación progresiva del actual liceo en Escuela Técnica Agroturística y analizar espacios de la sede de la Fundación del Niño para un posible Laboratorio de Análisis de Suelos, previa determinación de sus condiciones físicas, jurídicas, funcionales y de seguridad.',
  },
  {
    number: 'Alternativa 3',
    title: 'Implementación progresiva por etapas',
    horizon: 'Desarrollo gradual',
    summary:
      'Iniciar con programas de capacitación, cursos, talleres y prácticas en espacios existentes, e incorporar progresivamente laboratorios, viveros y equipamiento conforme se evalúen los resultados de cada etapa.',
  },
  {
    number: 'Alternativa 4',
    title: 'Modelo de gestión y cooperación interinstitucional',
    horizon: 'Articulación transversal',
    summary:
      'Integrar esfuerzos de la comunidad organizada, instituciones educativas, organismos públicos, universidades y productores mediante acuerdos de cooperación y contraloría social.',
  },
  {
    number: 'Alternativa 5',
    title: 'Centro de Formación y Asistencia Técnica Agroturística como etapa inicial',
    horizon: 'Etapa preparatoria',
    summary:
      'Crear un centro preparatorio que ofrezca talleres, asistencia técnica a productores y formación básica mientras se evalúa la demanda y se consolida el diseño definitivo de la Escuela.',
  },
];

export default function EtapasPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Etapas y Hoja de Ruta', url: '/etapas' },
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
            <Badge variant="warning">Capítulos 14, 15 y 19</Badge>
            <Badge variant="paramo">Implementación Gradual y Prudente</Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-4xl leading-tight">
            Hoja de Ruta y Etapas del Anteproyecto
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paramo-100 max-w-3xl leading-relaxed">
            La materialización de la propuesta se concibe como un proceso progresivo, comenzando por el aprovechamiento de los recursos existentes y sujetando cualquier proyección futura al cumplimiento estricto de los estudios técnicos, ambientales, históricos, registrales y jurídicos correspondientes.
          </p>
        </Container>
      </Section>

      {/* Línea de tiempo visual de las 3 Etapas + Proyección de largo plazo */}
      <Section variant="default">
        <Container size="narrow">
          <div className="mb-10">
            <Badge variant="paramo">Capítulo 19 · Conclusiones del Anteproyecto</Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
              Las tres etapas propuestas y su proyección futura
            </h2>
            <p className="mt-2 text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              Cada etapa está diseñada para avanzar con respaldo técnico, participación comunitaria y seguridad jurídica:
            </p>
          </div>

          <Timeline items={siteConfig.roadmapStages} />

          {/* Nota expresa sobre el sector Chipuén y la Fundación del Niño */}
          <div
            role="note"
            className="mt-10 rounded-2xl border-2 border-paramo-300 dark:border-paramo-700 bg-paramo-50/80 dark:bg-paramo-900/45 p-6 text-sm text-stone-800 dark:text-stone-200"
          >
            <p className="font-bold flex items-center gap-2 text-paramo-900 dark:text-paramo-100">
              <ShieldAlert className="h-5 w-5 text-paramo-700 dark:text-paramo-300 shrink-0" aria-hidden="true" />
              <span>Principio de prudencia jurídica e institucional</span>
            </p>
            <p className="mt-2 leading-relaxed">
              Conforme al texto íntegro del anteproyecto, ninguna mención al liceo actual, a la sede de la Fundación del Niño ni al lote ubicado en el sector Chipuén implica anticipar decisiones administrativas ni realizar afirmaciones sobre propiedad o titularidad. Cualquier actuación futura estará condicionada a las determinaciones de los organismos competentes y a los estudios técnicos, registrales, históricos, jurídicos y ambientales pertinentes.
            </p>
          </div>
        </Container>
      </Section>

      {/* Las 5 alternativas analizadas en el Capítulo 14 */}
      <Section variant="muted">
        <Container>
          <div className="max-w-3xl mb-10">
            <Badge variant="tierra">Capítulo 14 · Alternativas para la Ejecución</Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
              Cinco alternativas de ejecución no excluyentes
            </h2>
            <p className="mt-2 text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              El anteproyecto analiza cinco modalidades que la comunidad organizada y las instituciones competentes pueden evaluar, combinar o desarrollar sucesivamente:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FIVE_ALTERNATIVES.map((alt, idx) => (
              <Card
                key={alt.number}
                className={
                  idx === 1
                    ? 'border-2 border-paramo-600 dark:border-paramo-400 bg-paramo-50/40 dark:bg-paramo-900/30'
                    : ''
                }
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <Badge variant={idx === 1 ? 'paramo' : 'neutral'}>{alt.number}</Badge>
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    {alt.horizon}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                  {alt.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {alt.summary}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/documento/alternativas-de-ejecucion" variant="primary">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Leer Capítulo 14 completo</span>
            </Button>
            <Button href="/documento/conclusiones" variant="outline">
              <span>Leer Conclusiones (Capítulo 19)</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
