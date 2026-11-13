import React from 'react';
import type { Metadata } from 'next';
import { BookOpen, Calendar, CheckCircle2, Info } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getBreadcrumbJsonLd } from '@/lib/schema-org';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Cronograma de Actividades (6 Meses y 15 Actividades)',
  description:
    'Planificación preliminar de seis meses y quince actividades para el desarrollo participativo del anteproyecto Escuela Técnica Agroturística de La Mesa de Esnujaque.',
  alternates: {
    canonical: '/cronograma',
  },
  openGraph: {
    title: `Cronograma de Actividades (6 Meses) | ${siteConfig.name}`,
    description:
      'Tabla accesible con las 15 actividades y las 4 fases de desarrollo del anteproyecto.',
    url: `${siteConfig.url}/cronograma`,
  },
};

const FOUR_PHASES = [
  {
    phase: 'Fase I. Investigación y Diagnóstico',
    months: 'Meses 1 a 3',
    items: [
      'Revisión documental y bibliográfica.',
      'Observación directa de las condiciones de la comunidad.',
      'Entrevistas y encuestas a habitantes, productores, estudiantes, líderes comunitarios y otros actores locales.',
      'Identificación de las necesidades educativas, agrícolas, turísticas, ambientales y sociales de la comunidad.',
      'Identificación de los recursos y potencialidades existentes para el desarrollo de la propuesta.',
    ],
  },
  {
    phase: 'Fase II. Formulación de la Propuesta',
    months: 'Meses 3 a 5',
    items: [
      'Análisis e interpretación de la información obtenida.',
      'Diseño de la propuesta de creación de la Escuela Técnica Agroturística.',
      'Definición de sus objetivos, áreas de formación y principales componentes.',
      'Redacción y estructuración del anteproyecto.',
    ],
  },
  {
    phase: 'Fase III. Validación Comunitaria',
    months: 'Mes 5',
    items: [
      'Presentación y socialización del anteproyecto ante la comunidad.',
      'Discusión y recepción de observaciones, sugerencias y propuestas.',
      'Incorporación de los ajustes que resulten pertinentes.',
      'Validación comunitaria del anteproyecto.',
    ],
  },
  {
    phase: 'Fase IV. Gestión Institucional',
    months: 'Mes 6',
    items: [
      'Presentación del anteproyecto ante la alcaldía, gobernación y ministerios u organismos competentes.',
      'Solicitud de apoyo técnico e institucional.',
      'Evaluación de la propuesta por parte de los organismos correspondientes.',
      'Inicio de las acciones necesarias para la formulación del proyecto definitivo.',
    ],
  },
];

export default function CronogramaPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Cronograma de Actividades', url: '/cronograma' },
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
            <Badge variant="warning">Capítulo 18 del Anteproyecto</Badge>
            <Badge variant="paramo">6 Meses · 15 Actividades · 4 Fases</Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-4xl leading-tight">
            Cronograma de Actividades
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paramo-100 max-w-3xl leading-relaxed">
            El desarrollo del anteproyecto se plantea para un período estimado de seis meses, organizado de manera progresiva de acuerdo con las fases metodológicas propuestas.
          </p>
        </Container>
      </Section>

      <Section variant="default">
        <Container className="space-y-12">
          {/* Tabla real y accesible (con scroll horizontal controlado en pantallas pequeñas) */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                Matriz semestral de actividades (Mes 1 a Mes 6)
              </h2>
              <span className="text-xs text-stone-600 dark:text-stone-400">
                Deslizá horizontalmente en pantallas pequeñas o consultá las tarjetas móviles debajo
              </span>
            </div>

            <div className="w-full overflow-x-auto rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark shadow-sm">
              <table
                aria-label="Cronograma de 15 actividades en 6 meses"
                className="w-full min-w-[640px] border-collapse text-left font-sans text-xs sm:text-sm"
              >
                <thead>
                  <tr className="bg-paramo-800 text-white">
                    <th scope="col" className="w-14 px-3 py-3.5 text-center font-bold">
                      N.º
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-bold">
                      Actividades
                    </th>
                    {[1, 2, 3, 4, 5, 6].map((m) => (
                      <th
                        key={m}
                        scope="col"
                        className="w-16 px-2 py-3.5 text-center font-bold"
                      >
                        Mes {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-paramo-800">
                  {siteConfig.cronogramaActivities.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-paramo-50/60 dark:hover:bg-paramo-900/35 transition-colors"
                    >
                      <td className="px-3 py-3 text-center font-bold text-paramo-800 dark:text-paramo-300">
                        {item.id}
                      </td>
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-stone-900 dark:text-stone-100"
                      >
                        <span className="block">{item.activity}</span>
                        <span className="mt-0.5 block text-[11px] font-normal text-stone-500 dark:text-stone-400">
                          {item.phase}
                        </span>
                      </th>
                      {item.months.map((active, mIdx) => (
                        <td
                          key={mIdx}
                          className="px-2 py-3 text-center align-middle"
                        >
                          {active ? (
                            <span
                              aria-label={`Programada en Mes ${mIdx + 1}`}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-paramo-700 text-xs font-bold text-white shadow-xs"
                            >
                              X
                            </span>
                          ) : (
                            <span
                              aria-label={`No programada en Mes ${mIdx + 1}`}
                              className="text-stone-300 dark:text-stone-600"
                            >
                              —
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-stone-100 dark:bg-paramo-900/50 border border-stone-200 dark:border-paramo-800 p-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <Info className="h-4 w-4 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                <strong>Nota:</strong> El cronograma representa una planificación preliminar y podrá modificarse de acuerdo con las condiciones y necesidades que surjan durante el desarrollo del proceso comunitario e institucional.
              </p>
            </div>
          </div>

          {/* Vista en tarjetas optimizada para celulares */}
          <div className="md:hidden space-y-3">
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              Vista detallada por actividad (móvil)
            </h3>
            {siteConfig.cronogramaActivities.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-paramo-700 text-xs font-bold text-white">
                    {item.id}
                  </span>
                  <Badge variant="paramo">{item.phase}</Badge>
                </div>
                <p className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                  {item.activity}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.months.map((active, mIdx) => (
                    <span
                      key={mIdx}
                      className={cn(
                        'rounded-lg px-2.5 py-1 text-xs font-bold',
                        active
                          ? 'bg-paramo-700 text-white'
                          : 'bg-stone-100 dark:bg-paramo-900/40 text-stone-400'
                      )}
                    >
                      Mes {mIdx + 1} {active ? '✓' : ''}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Las 4 fases para el desarrollo del anteproyecto */}
          <div>
            <div className="max-w-3xl mb-8">
              <Badge variant="tierra">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                Articulación Operativa
              </Badge>
              <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                Fases para el desarrollo del anteproyecto
              </h2>
              <p className="mt-2 text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                El desarrollo del anteproyecto se organiza en cuatro fases articuladas, orientadas a garantizar una formulación progresiva, participativa y sustentada en las características y necesidades de la comunidad:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {FOUR_PHASES.map((p) => (
                <Card key={p.phase} className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="paramo">{p.months}</Badge>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                    {p.phase}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-stone-700 dark:text-stone-300">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <CheckCircle2
                          className="h-4 w-4 text-paramo-600 dark:text-paramo-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Button href="/documento/cronograma-y-fases" variant="outline">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>Ver Capítulo 18 en el lector del documento</span>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
