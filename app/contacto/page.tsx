import React from 'react';
import type { Metadata } from 'next';
import { Mail, MapPin, MessageCircle, User } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getBreadcrumbJsonLd } from '@/lib/schema-org';
import { ContactForm } from '@/components/forms/ContactForm';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Contacto Institucional y Comunitario',
  description:
    'Comunicate con el autor y promotor del anteproyecto Escuela Técnica Agroturística de La Mesa de Esnujaque (Msc. José Ramón Valero) para consultas, articulación institucional o participación comunitaria.',
  alternates: {
    canonical: '/contacto',
  },
  openGraph: {
    title: `Contacto | ${siteConfig.name}`,
    description:
      'Formulario y canales directos de contacto para la comunidad, instituciones públicas, universidades y posibles aliados.',
    url: `${siteConfig.url}/contacto`,
  },
};

export default function ContactoPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Contacto', url: '/contacto' },
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
            <Badge variant="paramo">Canal Directo</Badge>
            <Badge variant="tierra">Comunidad · Instituciones · Universidades</Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-4xl leading-tight">
            Contacto y Articulación
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paramo-100 max-w-3xl leading-relaxed">
            Escribinos para coordinar presentaciones ante la comunidad, enlaces con instituciones públicas, asesoría técnica universitaria o consultas sobre el anteproyecto.
          </p>
        </Container>
      </Section>

      <Section variant="default">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-6 space-y-5">
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Datos de contacto
                </h2>

                <div className="space-y-4 text-sm text-stone-700 dark:text-stone-300">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        Autor y promotor del anteproyecto
                      </p>
                      <p>{siteConfig.author.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">Ubicación</p>
                      <p>{siteConfig.location.fullLabel}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        Correo electrónico
                      </p>
                      <p className="font-medium text-paramo-800 dark:text-paramo-200">
                        {siteConfig.contact.emailDisplay}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">WhatsApp</p>
                      <p className="font-medium text-paramo-800 dark:text-paramo-200">
                        {siteConfig.contact.whatsappDisplay}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 dark:border-paramo-800">
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                    Redes y canales comunitarios
                  </p>
                  <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                    {siteConfig.contact.socialLinks.map((social) => (
                      <li key={social.name}>
                        <strong>{social.name}:</strong> {social.placeholder}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
