import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ClipboardList, MessageSquarePlus, ShieldCheck, Users } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getBreadcrumbJsonLd } from '@/lib/schema-org';
import { CommunitySurveyForm } from '@/components/forms/CommunitySurveyForm';
import { SuggestionsForm } from '@/components/forms/SuggestionsForm';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Participación Comunitaria: Encuesta, Buzón de Aportes y Asambleas',
  description:
    'Participá en la encuesta comunitaria y el buzón de sugerencias del anteproyecto Escuela Técnica Agroturística de La Mesa de Esnujaque (Municipio Urdaneta, Estado Trujillo).',
  alternates: {
    canonical: '/participa',
  },
  openGraph: {
    title: `Participación Comunitaria | ${siteConfig.name}`,
    description:
      'Encuesta comunitaria, buzón de aportes y convocatoria a las Asambleas de Ciudadanos y Ciudadanas de La Mesa de Esnujaque.',
    url: `${siteConfig.url}/participa`,
  },
};

export default function ParticipaPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Participación Comunitaria', url: '/participa' },
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
            <Badge variant="paramo">Metodología Participativa · Fases I, II y IV</Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-4xl leading-tight">
            Participá en la Construcción del Anteproyecto
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paramo-100 max-w-3xl leading-relaxed">
            Cuando las comunidades participan activamente en los proyectos relacionados con su territorio, se favorece la apropiación social de las iniciativas y se garantiza que las acciones respondan a sus necesidades reales.
          </p>
        </Container>
      </Section>

      {/* Invitación a las Asambleas de Ciudadanos y Ciudadanas */}
      <Section variant="accent" className="py-10">
        <Container>
          <Card className="border-2 border-paramo-600 dark:border-paramo-500 p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="tierra">
                    <Users className="h-3.5 w-3.5" aria-hidden="true" />
                    Asamblea de Ciudadanos y Ciudadanas
                  </Badge>
                  <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                    Fase de Socialización y Validación Comunitaria
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Invitación abierta a las asambleas comunitarias
                </h2>
                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                  De acuerdo con el Capítulo 17 (Metodología) y el Capítulo 18 (Cronograma), el anteproyecto será presentado ante la Asamblea de Ciudadanos y Ciudadanas y demás espacios comunitarios de La Mesa de Esnujaque para su discusión, recepción de observaciones, ajustes y validación colectiva.
                </p>
              </div>
              <div className="lg:col-span-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 p-4 text-xs sm:text-sm text-amber-950 dark:text-amber-100">
                <p className="font-bold flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Convocatoria:</span>
                </p>
                <p className="mt-1 font-medium">
                  {siteConfig.announcementBanner.text}
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Encuesta comunitaria */}
      <Section id="encuesta" variant="default">
        <Container size="narrow">
          <div className="mb-8">
            <Badge variant="paramo">
              <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
              Instrumento de Consulta Comunitaria
            </Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
              1. Encuesta Comunitaria
            </h2>
            <p className="mt-2 text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              Completá esta breve encuesta para ayudarnos a identificar las prioridades de formación técnica, las necesidades de tu sector y tu disponibilidad para participar en el desarrollo de la propuesta.
            </p>
          </div>

          <CommunitySurveyForm />
        </Container>
      </Section>

      {/* Buzón de aportes y sugerencias */}
      <Section id="buzon-aportes" variant="muted">
        <Container size="narrow">
          <div className="mb-8">
            <Badge variant="warning">
              <MessageSquarePlus className="h-3.5 w-3.5" aria-hidden="true" />
              Buzón Abierto de Observaciones
            </Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white">
              2. Buzón de Aportes y Sugerencias
            </h2>
            <p className="mt-2 text-base text-paramo-100 leading-relaxed">
              ¿Tenés una propuesta específica sobre el currículo, el Laboratorio de Análisis de Suelos, la protección de las lagunas, el Santuario de Durí o la articulación interinstitucional? Dejala aquí para que sea incorporada al análisis del anteproyecto.
            </p>
          </div>

          <SuggestionsForm />

          {/* Nota de privacidad y protección de datos comunitarios */}
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark p-5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            <ShieldCheck className="h-5 w-5 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-stone-900 dark:text-stone-100">
                Compromiso de privacidad con la comunidad
              </p>
              <p className="mt-1 leading-relaxed">
                Solo recogemos los datos mínimos necesarios para sistematizar la consulta comunitaria del anteproyecto. Tu nombre es opcional y en cualquier momento podés solicitar la actualización o eliminación de tus datos escribiendo a{' '}
                <strong className="text-paramo-800 dark:text-paramo-200">
                  {siteConfig.contact.privacyEmailDisplay}
                </strong>
                . Consultá más detalles en nuestra{' '}
                <Link href="/privacidad" className="font-semibold underline">
                  Política de Privacidad
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
