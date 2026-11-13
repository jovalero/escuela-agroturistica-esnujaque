import React from 'react';
import type { Metadata } from 'next';
import { Compass, Droplets, Landmark, Mountain, Sprout } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getBreadcrumbJsonLd } from '@/lib/schema-org';
import { PhotoGallery } from '@/components/territorio/PhotoGallery';
import { TerritoryMap } from '@/components/territorio/TerritoryMap';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Patrimonio Territorial de La Mesa de Esnujaque (Mapa y Galería)',
  description:
    'Conocé el patrimonio natural, agrícola y cultural de La Mesa de Esnujaque (Municipio Urdaneta, Estado Trujillo): Santuario de Durí, Laguna de la Estrella, Laguna de Pozo Negro y tradición agrícola.',
  alternates: {
    canonical: '/territorio',
  },
  openGraph: {
    title: `Patrimonio Territorial de La Mesa de Esnujaque | ${siteConfig.name}`,
    description:
      'Santuario de Durí, Laguna de la Estrella, Laguna de Pozo Negro, tradición agrícola, galería fotográfica y mapa interactivo.',
    url: `${siteConfig.url}/territorio`,
  },
};

export default function TerritorioPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Inicio', url: '/' },
    { name: 'Patrimonio Territorial', url: '/territorio' },
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
            <Badge variant="laguna">Municipio Urdaneta · Estado Trujillo</Badge>
            <Badge variant="paramo">Patrimonio Natural, Agrícola y Cultural</Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-4xl leading-tight">
            Patrimonio Territorial de La Mesa de Esnujaque
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paramo-100 max-w-3xl leading-relaxed">
            El territorio no es únicamente un espacio físico, sino un patrimonio colectivo donde interactúan las personas, su historia, la tradición agrícola, los paisajes de montaña y las fuentes de agua que sustentan la vida.
          </p>
        </Container>
      </Section>

      {/* Atractivos y referentes mencionados en el anteproyecto */}
      <Section variant="default">
        <Container>
          <div className="max-w-3xl mb-10">
            <Badge variant="paramo">Capítulo 13 · Diagnóstico de la Comunidad</Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
              Referentes naturales, culturales y productivos
            </h2>
            <p className="mt-3 text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              El anteproyecto destaca elementos emblemáticos de La Mesa de Esnujaque cuya protección, estudio y valoración responsable constituyen la base de la propuesta educativa:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="p-6 sm:p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tierra-100 dark:bg-tierra-900/60 text-tierra-800 dark:text-tierra-200">
                <Landmark className="h-6 w-6" aria-hidden="true" />
              </div>
              <Badge variant="tierra">Patrimonio Cultural e Histórico</Badge>
              <h3 className="mt-3 font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                Santuario de Durí
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                Espacio cultural y arquitectónico emblemático mencionado en el anteproyecto dentro de los recursos de interés histórico y paisajístico que pueden integrarse a estrategias de educación patrimonial y turismo rural responsable.
              </p>
            </Card>

            <Card className="p-6 sm:p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-laguna-100 dark:bg-laguna-900/60 text-laguna-800 dark:text-laguna-200">
                <Droplets className="h-6 w-6" aria-hidden="true" />
              </div>
              <Badge variant="laguna">Ecosistemas Altoandinos y Recursos Hídricos</Badge>
              <h3 className="mt-3 font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                Laguna de la Estrella y Laguna de Pozo Negro
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                Atractivos naturales de montaña que forman parte del patrimonio ambiental e hídrico de La Mesa de Esnujaque. Su conservación, junto con la protección de las cuencas hidrográficas y la cobertura vegetal, es un eje transversal de la Escuela Técnica Agroturística.
              </p>
            </Card>

            <Card className="p-6 sm:p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-paramo-100 dark:bg-paramo-800 text-paramo-800 dark:text-paramo-200">
                <Sprout className="h-6 w-6" aria-hidden="true" />
              </div>
              <Badge variant="paramo">Identidad Productiva</Badge>
              <h3 className="mt-3 font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                Tradición agrícola de montaña
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                La relación histórica entre los habitantes de La Mesa de Esnujaque y el cultivo de la tierra sustenta la economía familiar. El anteproyecto busca fortalecerla mediante formación técnica en conservación de suelos, uso eficiente del agua, agroindustria y un eventual Laboratorio de Análisis de Suelos.
              </p>
            </Card>

            <Card className="p-6 sm:p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-200 dark:bg-paramo-900 text-stone-800 dark:text-stone-200">
                <Compass className="h-6 w-6" aria-hidden="true" />
              </div>
              <Badge variant="neutral">Turismo Rural Sostenible</Badge>
              <h3 className="mt-3 font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                Paisajes andinos y agroturismo educativo
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                Bajo los lineamientos de la OMT (2020) y la UNESCO (2020), el anteproyecto plantea vincular la producción agrícola con experiencias educativas, interpretación ambiental, gastronomía local y valoración cultural sin comprometer el equilibrio ecológico.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Mapa interactivo con OpenStreetMap + Leaflet */}
      <Section id="mapa-territorial" variant="muted">
        <Container>
          <div className="max-w-3xl mb-8">
            <Badge variant="warning">
              <Mountain className="h-3.5 w-3.5" aria-hidden="true" />
              Cartografía Comunitaria · OpenStreetMap
            </Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white">
              Mapa territorial de referencia
            </h2>
            <p className="mt-2 text-sm sm:text-base text-paramo-100 leading-relaxed">
              Explorá la ubicación referencial de La Mesa de Esnujaque, sus atractivos naturales y culturales y los espacios mencionados en el anteproyecto.
            </p>
          </div>

          <TerritoryMap />
        </Container>
      </Section>

      {/* Galería de fotos con lightbox */}
      <Section id="galeria-territorial" variant="default">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <Badge variant="paramo">Registro Visual Comunitario</Badge>
              <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
                Galería del territorio y la comunidad
              </h2>
              <p className="mt-2 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                Espacio preparado para las fotografías auténticas del territorio, el liceo, las lagunas, el Santuario de Durí y los productores locales (sin imágenes genéricas de archivo).
              </p>
            </div>
            <Button href="/documento/diagnostico-de-la-comunidad" variant="outline">
              Leer Diagnóstico (Cap. 13)
            </Button>
          </div>

          <PhotoGallery />
        </Container>
      </Section>
    </>
  );
}
