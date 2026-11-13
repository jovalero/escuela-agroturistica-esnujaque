import React from 'react';
import type { Metadata } from 'next';
import { Award, BookOpen, Briefcase, GraduationCap, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getBreadcrumbJsonLd } from '@/lib/schema-org';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder';
import { Quote } from '@/components/ui/Quote';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: `Autor del Anteproyecto: ${siteConfig.author.name}`,
  description: `Perfil académico, trayectoria y visión del ${siteConfig.author.name}, autor del anteproyecto Escuela Técnica Agroturística de La Mesa de Esnujaque.`,
  alternates: {
    canonical: '/autor',
  },
  openGraph: {
    title: `Autor: ${siteConfig.author.name} | ${siteConfig.name}`,
    description: siteConfig.author.shortBio,
    url: `${siteConfig.url}/autor`,
  },
};

export default function AutorPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Autor del Anteproyecto', url: '/autor' },
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
            <Badge variant="paramo">Autoría del Anteproyecto (2026)</Badge>
            <Badge variant="tierra">La Mesa de Esnujaque · Estado Trujillo</Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            {siteConfig.author.name}
          </h1>
          <p className="mt-3 text-base sm:text-xl text-paramo-100 max-w-3xl leading-relaxed">
            {siteConfig.author.role}
          </p>
        </Container>
      </Section>

      <Section variant="default">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 space-y-6">
              <PhotoPlaceholder
                label={siteConfig.author.photoPlaceholder}
                alt={`Retrato de ${siteConfig.author.name}, autor del anteproyecto`}
                src={siteConfig.author.photoUrl || undefined}
                aspectRatio="portrait"
                caption={`${siteConfig.author.name} · Autor del anteproyecto`}
              />

              <Card className="p-5 space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 text-stone-700 dark:text-stone-300">
                  <MapPin className="h-4 w-4 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{siteConfig.author.location}</span>
                </div>
                <div className="flex items-start gap-2.5 text-stone-700 dark:text-stone-300">
                  <Mail className="h-4 w-4 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{siteConfig.contact.emailDisplay}</span>
                </div>
                <div className="pt-2">
                  <Button href="/contacto" variant="primary" className="w-full">
                    Escribir al autor
                  </Button>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <Card className="p-6 sm:p-8">
                <Badge variant="paramo">Presentación</Badge>
                <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                  Sobre el autor y la iniciativa
                </h2>
                <p className="mt-4 text-base leading-relaxed text-stone-800 dark:text-stone-200">
                  {siteConfig.author.shortBio}
                </p>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                  La propuesta nace del compromiso con el patrimonio natural, agrícola, paisajístico y cultural de La Mesa de Esnujaque, convencido de que la educación fortalece el sentido de pertenencia y transforma el conocimiento en bienestar colectivo para las generaciones presentes y futuras.
                </p>
              </Card>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="p-6">
                  <div className="flex items-center gap-2 text-paramo-700 dark:text-paramo-300 mb-3">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                      Formación académica
                    </h3>
                  </div>
                  <ul className="space-y-2.5 text-sm text-stone-700 dark:text-stone-300">
                    {siteConfig.author.academicProfile.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-tierra-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-2 text-paramo-700 dark:text-paramo-300 mb-3">
                    <Briefcase className="h-5 w-5" aria-hidden="true" />
                    <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                      Trayectoria y labor comunitaria
                    </h3>
                  </div>
                  <ul className="space-y-2.5 text-sm text-stone-700 dark:text-stone-300">
                    {siteConfig.author.trajectory.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-paramo-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Quote
                quote={siteConfig.author.visionStatement}
                author={siteConfig.author.name}
                context="Reflexión Final del Anteproyecto (2026)"
              />

              <div className="flex flex-wrap gap-3">
                <Button href="/documento/reflexion-inicial" variant="primary">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span>Leer Reflexión Inicial</span>
                </Button>
                <Button href="/documento" variant="outline">
                  <span>Ver los 21 capítulos del anteproyecto</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
