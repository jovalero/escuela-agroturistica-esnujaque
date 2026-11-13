import React from 'react';
import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Política de Privacidad y Protección de Datos Comunitarios',
  description:
    'Política de privacidad y tratamiento responsable de datos recolectados en la encuesta comunitaria y formularios del anteproyecto Escuela Técnica Agroturística de La Mesa de Esnujaque.',
  alternates: {
    canonical: '/privacidad',
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <Section variant="dark" className="py-10 sm:py-14">
        <Container size="narrow">
          <Badge variant="warning">Documento informativo · Sujeto a revisión legal</Badge>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-white">
            Política de Privacidad y Protección de Datos
          </h1>
          <p className="mt-2 text-sm sm:text-base text-paramo-100">
            Última actualización: Año {siteConfig.year} · {siteConfig.name}
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
              <strong>Nota:</strong> Esta política de privacidad constituye una versión base transparente para la consulta comunitaria y está marcada para revisión legal definitiva.
            </span>
          </div>

          <Card className="p-6 sm:p-8 space-y-5 text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-200">
            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              1. Responsable del tratamiento
            </h2>
            <p>
              Los datos suministrados voluntariamente a través de los formularios de este sitio web son gestionados por el equipo promotor del anteproyecto «{siteConfig.name}», bajo la autoría del {siteConfig.author.name}, en la {siteConfig.location.fullLabel}.
            </p>

            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              2. Datos que recogemos y principio de minimización
            </h2>
            <p>
              Recogemos únicamente la información estrictamente necesaria para los fines metodológicos y de comunicación del anteproyecto:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Encuesta comunitaria:</strong> sector o comunidad, rol comunitario, áreas de interés formativo, disponibilidad para participar, comentarios y nombre (de carácter opcional).
              </li>
              <li>
                <strong>Buzón de aportes:</strong> sector, categoría temática, sugerencia y nombre (opcional).
              </li>
              <li>
                <strong>Formulario de contacto y suscripción:</strong> nombre, correo electrónico, teléfono/organización (opcional) y mensaje para responder consultas o enviar convocatorias a las asambleas comunitarias.
              </li>
            </ul>

            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              3. Finalidad del uso de los datos
            </h2>
            <p>
              Los datos recabados mediante consentimiento explícito se utilizan exclusivamente con fines estadísticos, académicos, de diagnóstico participativo y de socialización comunitaria e institucional del anteproyecto, en estricto apego a la metodología descrita en el Capítulo 17 del documento. No se comercializan ni se ceden a terceros con fines publicitarios.
            </p>

            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              4. Derechos de acceso, rectificación y eliminación
            </h2>
            <p>
              Cualquier habitante o participante puede solicitar en cualquier momento la consulta, corrección o eliminación total de los datos personales que haya suministrado, escribiendo al correo electrónico de privacidad:{' '}
              <strong className="text-paramo-800 dark:text-paramo-200">
                {siteConfig.contact.privacyEmailDisplay}
              </strong>{' '}
              (o a {siteConfig.contact.emailDisplay}).
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
}
