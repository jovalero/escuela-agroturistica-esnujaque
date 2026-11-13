import React from 'react';
import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Términos de Uso y Naturaleza del Anteproyecto',
  description:
    'Términos de uso, propiedad intelectual y aclaratoria institucional sobre la naturaleza consultiva del anteproyecto Escuela Técnica Agroturística de La Mesa de Esnujaque.',
  alternates: {
    canonical: '/terminos',
  },
};

export default function TerminosPage() {
  return (
    <>
      <Section variant="dark" className="py-10 sm:py-14">
        <Container size="narrow">
          <Badge variant="warning">Documento informativo · Sujeto a revisión legal</Badge>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-white">
            Términos de Uso y Aclaratoria Institucional
          </h1>
          <p className="mt-2 text-sm sm:text-base text-paramo-100">
            Año {siteConfig.year} · {siteConfig.name}
          </p>
        </Container>
      </Section>

      <Section variant="default">
        <Container size="narrow" className="space-y-6">
          <div
            role="note"
            className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40 p-4 text-xs sm:text-sm text-amber-950 dark:text-amber-100"
          >
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              <strong>Nota:</strong> Estos términos de uso están marcados para revisión legal y precisan el alcance estrictamente propositivo y consultivo del portal.
            </span>
          </div>

          <Card className="p-6 sm:p-8 space-y-5 text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-200">
            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              1. Naturaleza de anteproyecto en consulta
            </h2>
            <p>
              El presente sitio web tiene por único objeto divulgar y someter a consideración comunitaria e institucional el anteproyecto titulado <em>«{siteConfig.documentTitle}»</em>, elaborado por el {siteConfig.author.name}.
            </p>
            <p>
              Todas las acciones, etapas, alternativas de ejecución y proyecciones descritas en el sitio tienen carácter de propuesta inicial condicionada a la validación de la Asamblea de Ciudadanos y Ciudadanas y a los estudios técnicos, jurídicos, registrales, históricos, ambientales, administrativos y económicos que determinen los organismos competentes.
            </p>

            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              2. Ausencia de compromisos institucionales previos o afirmaciones registrales
            </h2>
            <p>
              La mención de organismos públicos municipales, regionales o nacionales, universidades o entes de cooperación internacional (como UNESCO, FAO o PNUD) se realiza exclusivamente a título de posibles aliados futuros conforme al marco institucional del anteproyecto, sin sugerir convenios, financiamientos ni compromisos ya asumidos. Asimismo, ninguna referencia a espacios o terrenos (como el sector Chipuén o la sede de la Fundación del Niño) constituye afirmación sobre su titularidad o condición legal.
            </p>

            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              3. Propiedad intelectual y citación académica
            </h2>
            <p>
              Los textos del anteproyecto pertenecen a su autor, <strong>{siteConfig.author.name} ({siteConfig.year})</strong>. Se autoriza su lectura, descarga, impresión y difusión comunitaria o académica sin fines de lucro, citando siempre la fuente y el nombre del autor.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
}
