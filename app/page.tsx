import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Compass,
  Download,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Leaf,
  MapPin,
  MessageSquareHeart,
  Sprout,
  Trees,
  Users,
} from 'lucide-react';
import { siteConfig } from '@/data/site';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder';
import { Quote } from '@/components/ui/Quote';
import { Section } from '@/components/ui/Section';

const PILLAR_ICONS = {
  GraduationCap,
  Sprout,
  Compass,
  Trees,
} as const;

export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-paramo-950 via-paramo-900 to-paramo-800 text-white pt-10 pb-16 sm:py-24">
        {/* Textura topográfica andina sutil en SVG */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <path
            d="M0,450 Q300,340 600,410 T1200,360 L1200,600 L0,600 Z"
            fill="currentColor"
          />
          <path
            d="M0,510 Q400,420 800,480 T1200,430 L1200,600 L0,600 Z"
            fill="currentColor"
          />
        </svg>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-400/20 px-4 py-1.5 text-xs sm:text-sm font-bold text-amber-200">
                  <span className="h-2 w-2 rounded-full bg-amber-300 animate-pulse" aria-hidden="true" />
                  {siteConfig.statusBadge}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-paramo-100">
                  <MapPin className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                  La Mesa de Esnujaque · Municipio Urdaneta, Estado Trujillo
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] tracking-tight text-white">
                {siteConfig.name}
              </h1>

              <p className="font-serif text-lg sm:text-xl text-paramo-100 leading-relaxed">
                {siteConfig.documentTitle}.
              </p>

              <p className="text-sm sm:text-base text-paramo-100/90 leading-relaxed max-w-2xl">
                Una propuesta educativa inicial para integrar progresivamente la formación técnica con la agricultura sostenible, el turismo rural, la conservación ambiental y la participación comunitaria como fundamentos del bienestar colectivo.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button
                  href="/documento"
                  size="lg"
                  className="bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold"
                >
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                  <span>Leer el anteproyecto</span>
                </Button>
                <Button
                  href="/participa"
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white hover:bg-white/15 dark:border-white/70 dark:text-white"
                >
                  <MessageSquareHeart className="h-5 w-5" aria-hidden="true" />
                  <span>Participá</span>
                </Button>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-paramo-200 border-t border-white/15">
                <span>
                  <strong className="text-white">Autor:</strong> {siteConfig.author.name}
                </span>
                <span>
                  <strong className="text-white">Estructura:</strong> 21 capítulos íntegros
                </span>
                <a
                  href={siteConfig.pdfUrl}
                  download="Anteproyecto-Escuela-Tecnica-Agroturistica-La-Mesa-de-Esnujaque.pdf"
                  className="inline-flex items-center gap-1 font-semibold text-amber-300 underline hover:text-amber-200"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Descargar PDF completo
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <PhotoPlaceholder
                label="[FOTO PENDIENTE: Panorámica de La Mesa de Esnujaque]"
                alt="Paisaje andino, terrazas agrícolas y montañas de la comunidad La Mesa de Esnujaque, Municipio Urdaneta, Estado Trujillo"
                caption="Patrimonio natural, agrícola y cultural de La Mesa de Esnujaque, Estado Trujillo."
                className="border-white/20 shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. ¿QUÉ PROPONEMOS? */}
      <Section id="que-proponemos" variant="default">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="paramo">Propósito del Anteproyecto</Badge>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              ¿Qué proponemos?
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-stone-700 dark:text-stone-300">
              El presente anteproyecto propone estudiar la viabilidad de la creación progresiva de una Escuela Técnica Agroturística en La Mesa de Esnujaque, partiendo del aprovechamiento de la infraestructura educativa existente para vincular la enseñanza técnica con la agricultura sostenible, la conservación ambiental, el turismo rural, la agroindustria, el emprendimiento y la investigación aplicada.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.pillars.map((pillar) => {
              const IconComponent =
                PILLAR_ICONS[pillar.iconName as keyof typeof PILLAR_ICONS] || Sprout;
              return (
                <Card key={pillar.title} hoverable className="flex flex-col justify-between">
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-paramo-100 dark:bg-paramo-800 text-paramo-800 dark:text-paramo-200">
                      <IconComponent className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      {pillar.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. POR QUÉ LA MESA DE ESNUJAQUE */}
      <Section id="por-que-esnujaque" variant="muted">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-5">
              <Badge variant="laguna">Patrimonio Territorial</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                Por qué La Mesa de Esnujaque
              </h2>
              <p className="text-base leading-relaxed text-stone-700 dark:text-stone-300">
                Ubicada en la región andina del municipio Urdaneta del estado Trujillo, La Mesa de Esnujaque posee un valioso patrimonio territorial conformado por paisajes de montaña, fuentes hídricas, tradición agrícola e hitos naturales y culturales de alto valor para la comunidad.
              </p>
              <p className="text-base leading-relaxed text-stone-700 dark:text-stone-300">
                Atractivos como el <strong>Santuario de Durí</strong>, la{' '}
                <strong>Laguna de la Estrella</strong> y la{' '}
                <strong>Laguna de Pozo Negro</strong>, junto con la experiencia histórica de sus productores agrícolas, ofrecen una base extraordinaria para impulsar procesos educativos, productivos y turísticos compatibles con la protección de los ecosistemas.
              </p>

              <ul className="space-y-2.5 text-sm text-stone-800 dark:text-stone-200 pt-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-paramo-700 dark:text-paramo-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Santuario de Durí:</strong> Referente arquitectónico, histórico y cultural del territorio.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-paramo-700 dark:text-paramo-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Laguna de la Estrella y Laguna de Pozo Negro:</strong> Ecosistemas altoandinos y fuentes hídricas que requieren educación ambiental y resguardo.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-paramo-700 dark:text-paramo-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Vocación agrícola andina:</strong> Identidad productiva vinculada al manejo responsable del suelo y del agua.
                  </span>
                </li>
              </ul>

              <div className="pt-3">
                <Button href="/territorio" variant="primary">
                  <span>Explorar patrimonio, galería y mapa</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PhotoPlaceholder
                label="[FOTO PENDIENTE: Santuario de Durí]"
                alt="Santuario de Durí en La Mesa de Esnujaque"
                caption="Santuario de Durí · Patrimonio cultural e histórico"
              />
              <PhotoPlaceholder
                label="[FOTO PENDIENTE: Laguna de la Estrella]"
                alt="Laguna de la Estrella en el páramo de La Mesa de Esnujaque"
                caption="Laguna de la Estrella · Patrimonio natural e hídrico"
              />
              <PhotoPlaceholder
                label="[FOTO PENDIENTE: Laguna de Pozo Negro]"
                alt="Laguna de Pozo Negro en La Mesa de Esnujaque"
                caption="Laguna de Pozo Negro · Ecosistema de alta montaña"
              />
              <PhotoPlaceholder
                label="[FOTO PENDIENTE: Tradición agrícola local]"
                alt="Cultivos y tierras agrícolas de La Mesa de Esnujaque"
                caption="Tradición agrícola · Base productiva comunitaria"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. HOJA DE RUTA */}
      <Section id="hoja-de-ruta" variant="default">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <Badge variant="tierra">Implementación Progresiva</Badge>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                Hoja de ruta por etapas
              </h2>
              <p className="mt-3 text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                El anteproyecto plantea un camino prudente, gradual y condicionado a estudios técnicos, jurídicos, ambientales e institucionales previos en cada fase.
              </p>
            </div>
            <Button href="/etapas" variant="outline">
              <span>Ver detalle de las etapas</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {siteConfig.roadmapStages.map((stage) => (
              <Card key={stage.stage} className="flex flex-col justify-between">
                <div>
                  <Badge variant={stage.stage.includes('Proyección') ? 'tierra' : 'paramo'}>
                    {stage.stage}
                  </Badge>
                  <h3 className="mt-3 font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                    {stage.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                    {stage.description}
                  </p>
                </div>
                <p className="mt-4 pt-3 border-t border-stone-200 dark:border-paramo-800 text-xs font-medium text-tierra-800 dark:text-tierra-300">
                  {stage.condition}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. IMPACTOS ESPERADOS */}
      <Section id="impactos-esperados" variant="accent">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <Badge variant="paramo">Capítulo 7 del Anteproyecto</Badge>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Impactos esperados en la comunidad
            </h2>
            <p className="mt-3 text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              Resultados previstos a mediano y largo plazo en la medida en que la propuesta sea evaluada, validada y desarrollada por etapas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.impacts.map((impact) => (
              <Card key={impact.id} hoverable>
                <Badge variant="paramo">{impact.badge}</Badge>
                <h3 className="mt-3 font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                  {impact.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {impact.summary}
                </p>
              </Card>
            ))}

            {/* Tarjeta complementaria sobre empleos directos e indirectos (fiel al Capítulo 7) */}
            <Card className="bg-paramo-800 dark:bg-paramo-900 text-white border-paramo-700">
              <Badge variant="warning">Dinamización Local</Badge>
              <h3 className="mt-3 font-serif text-xl font-bold text-white">
                Empleos directos e indirectos
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-paramo-100">
                Su cuantificación dependerá de los estudios de factibilidad posteriores, pero se prevé dinamizar oportunidades docentes, técnicas, agrícolas, agroindustriales y turísticas que favorezcan el arraigo juvenil.
              </p>
              <Link
                href="/documento/impactos-esperados"
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-300 underline hover:text-amber-200"
              >
                Leer Capítulo 7 completo
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 6. CÓMO SE CONSTRUYE CON LA COMUNIDAD */}
      <Section id="metodologia-comunitaria" variant="default">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <Badge variant="paramo">Metodología Participativa</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                Cómo se construye con la comunidad
              </h2>
              <p className="text-base leading-relaxed text-stone-700 dark:text-stone-300">
                El anteproyecto se fundamenta en una investigación descriptiva, de campo y documental donde los habitantes de La Mesa de Esnujaque no son simples observadores, sino protagonistas de la identificación de necesidades y de la validación de propuestas.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Button href="/documento/metodologia" variant="secondary">
                  <span>Ver Metodología (Cap. 17)</span>
                </Button>
                <Button href="/cronograma" variant="outline">
                  <span>Ver Cronograma de 6 meses</span>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {siteConfig.methodologyPhases.map((phase, idx) => (
                <Card key={phase.number} className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paramo-700 text-sm font-bold text-white">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-paramo-700 dark:text-paramo-300">
                        {phase.number}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                      {phase.title}
                    </h3>
                    <p className="mt-1 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. ALINEACIÓN CON LA AGENDA 2030 */}
      <Section id="agenda-2030" variant="muted">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-10">
            <Badge variant="laguna">Marco Internacional · ONU (2015)</Badge>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Alineación con la Agenda 2030
            </h2>
            <p className="mt-3 text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              Conforme al Capítulo 10 (Marco Legal), el anteproyecto se articula directamente con cinco Objetivos de Desarrollo Sostenible de las Naciones Unidas:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {siteConfig.sdgs.map((sdg) => (
              <Card key={sdg.number} className="flex flex-col justify-between border-t-4" style={{ borderTopColor: sdg.color }}>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-extrabold text-white"
                      style={{ backgroundColor: sdg.color }}
                    >
                      {sdg.number}
                    </span>
                    <Globe2 className="h-4 w-4 text-stone-400" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                    {sdg.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                    {sdg.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. ALIADOS E INSTITUCIONES */}
      <Section id="posibles-aliados" variant="default">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-10">
            <Badge variant="warning">Posibles Aliados · Sujeto a Gestión</Badge>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Actores clave y posibles aliados institucionales
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              De acuerdo con los Capítulos 11 y 12 del anteproyecto, estas instancias se identifican como <strong>posibles aliados estratégicos</strong> cuya participación deberá definirse progresivamente una vez validada la propuesta por la comunidad. <strong>No existen compromisos financieros ni institucionales asumidos en esta etapa.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.allies.map((ally) => (
              <Card key={ally.name} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-paramo-700 dark:text-paramo-300 mb-2">
                    <Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{ally.category}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                    {ally.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                    {ally.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. PARTICIPÁ */}
      <Section id="participa-cta" variant="dark">
        <Container>
          <div className="rounded-3xl border border-paramo-700 bg-paramo-900/90 p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 px-3 py-1 text-xs font-bold text-amber-300">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  Construcción Colectiva en La Mesa de Esnujaque
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                  Tu voz y tu experiencia fortalecen este anteproyecto
                </h2>
                <p className="text-sm sm:text-base text-paramo-100 leading-relaxed max-w-2xl">
                  Si sos estudiante, docente, productor agrícola, emprendedor, vocero comunitario o representante institucional, te invitamos a responder la encuesta comunitaria, enviar tus sugerencias al buzón de aportes o comunicarte directamente con nosotros.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Button
                  href="/participa"
                  size="lg"
                  className="bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold w-full"
                >
                  <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                  <span>Ir a la encuesta y buzón</span>
                </Button>
                <Button
                  href="/contacto"
                  size="lg"
                  variant="outline"
                  className="border-white/60 text-white hover:bg-white/15 dark:border-white/60 dark:text-white w-full"
                >
                  <span>Contactar al autor</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 10. CITA FINAL */}
      <Section id="reflexion-cierre" variant="default">
        <Container size="narrow">
          <div className="text-center mb-6">
            <Badge variant="paramo">
              <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
              Reflexión Final del Documento
            </Badge>
          </div>
          <Quote
            quote="La propuesta de crear progresivamente una Escuela Técnica Agroturística representa una invitación a construir ese futuro desde la educación, el trabajo, la participación y el compromiso con el territorio. A partir de este momento, el camino dependerá de la voluntad de la comunidad organizada, del apoyo de las instituciones y del esfuerzo de cada ciudadano dispuesto a hacer realidad esta visión compartida. Porque el futuro no se espera; se construye. ¡Vamos pa'lante, porque pa'lante es pa' allá!"
            author={siteConfig.author.name}
            context="Capítulo 20 · Reflexión Final"
          />
        </Container>
      </Section>
    </>
  );
}
