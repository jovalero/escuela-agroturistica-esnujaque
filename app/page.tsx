import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Download,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Sprout,
  Trees,
  Users,
} from 'lucide-react';
import { siteConfig } from '@/data/site';
import { Button } from '@/components/ui/Button';
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
      {/* 1. HERO (Blanco hueso / claro, sobrio, humano y centrado en la comunidad) */}
      <section className="relative overflow-hidden bg-[#FAF8F5] text-stone-900 pt-8 pb-14 sm:py-20 border-b border-stone-200/80">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Texto principal del Hero */}
            <div className="lg:col-span-6 space-y-6">
              {/* Emblema oficial y etiqueta del anteproyecto */}
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-full border-2 border-emerald-800/20 bg-white p-0.5 shadow-sm">
                  <Image
                    src={siteConfig.logo.emblem}
                    alt={siteConfig.logo.alt}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
                <div className="inline-flex">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-emerald-950">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />
                    Anteproyecto 2026 · En consulta comunitaria
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] font-bold leading-tight tracking-tight text-stone-900">
                {siteConfig.name}
              </h1>

              {/* Un solo texto, corto, directo y natural */}
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-xl">
                Una escuela técnica para que los jóvenes de La Mesa de Esnujaque puedan formarse en agricultura, turismo y cuidado del ambiente sin tener que irse del pueblo. Es un anteproyecto y queremos construirlo con la comunidad.
              </p>

              {/* Botones de acción */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Button
                  href="/documento"
                  size="lg"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow-xs border border-emerald-900"
                >
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                  <span>Leer el anteproyecto</span>
                </Button>
                <Button
                  href="/participa"
                  size="lg"
                  variant="outline"
                  className="border-amber-500 bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold shadow-xs"
                >
                  <HeartHandshake className="h-5 w-5 text-stone-950" aria-hidden="true" />
                  <span>Participá</span>
                </Button>
              </div>

              {/* Datos breves de contexto */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-600 border-t border-stone-200">
                <span>
                  <strong className="text-stone-900 font-bold">Autor:</strong> {siteConfig.author.name}
                </span>
                <span>
                  <strong className="text-stone-900 font-bold">Estructura:</strong> 21 capítulos íntegros
                </span>
                <a
                  href={siteConfig.pdfUrl}
                  download="Anteproyecto-Escuela-Tecnica-Agroturistica-La-Mesa-de-Esnujaque.pdf"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-800 underline hover:text-emerald-900"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Descargar PDF completo
                </a>
              </div>
            </div>

            {/* Fotografía de la plaza: Mayor protagonismo */}
            <div className="lg:col-span-6">
              <PhotoPlaceholder
                src={siteConfig.heroPhoto.src}
                label={siteConfig.heroPhoto.label}
                alt={siteConfig.heroPhoto.alt}
                caption={siteConfig.heroPhoto.caption}
                aspectRatio="landscape"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="border-stone-300/80 shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Franja destacada única de aviso legal comunitario */}
      <div className="border-b border-stone-200/80 bg-white py-3 px-4 text-xs sm:text-sm text-stone-700 print:hidden">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="leading-relaxed text-stone-700">
            <strong className="text-emerald-900 font-semibold">Aviso comunitario: </strong>
            <span className="text-stone-700">{siteConfig.legalDisclaimer}</span>
          </p>
          <Link
            href="/documento"
            className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950 shrink-0"
          >
            Conocer antecedentes legales
          </Link>
        </div>
      </div>

      {/* 2. ¿QUÉ PROPONEMOS? (Verde oscuro andino con tarjetas en verde profundo) */}
      <Section id="que-proponemos" variant="muted" className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            {/* Columna izquierda: Narrativa sencilla y cercana */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Propósito del anteproyecto
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                ¿Qué proponemos para La Mesa?
              </h2>
              <p className="text-base leading-relaxed text-emerald-100">
                Queremos estudiar junto a los vecinos la creación progresiva de una Escuela Técnica Agroturística aprovechando las instalaciones educativas que ya tiene el pueblo.
              </p>
              <p className="text-base leading-relaxed text-emerald-100">
                El objetivo es que nuestros muchachos aprendan oficios prácticos que sirvan aquí mismo: agricultura ecológica, cuidado del agua, posadas, turismo rural y transformación de lo que se cosecha en las parcelas.
              </p>
              <div className="pt-2">
                <Button
                  href="/etapas"
                  variant="outline"
                  className="border-white/70 bg-white/10 text-white hover:bg-white/20 font-bold shadow-xs"
                >
                  <span>Conocé cómo se implementaría</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* Columna derecha: 4 pilares en lista limpia con íconos */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siteConfig.pillars.map((pillar) => {
                const IconComponent =
                  PILLAR_ICONS[pillar.iconName as keyof typeof PILLAR_ICONS] || Sprout;
                return (
                  <div
                    key={pillar.title}
                    className="rounded-xl border border-emerald-700/60 bg-[#143326] p-5 text-white shadow-xs transition-colors hover:border-amber-400/50"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800 text-amber-300">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. POR QUÉ LA MESA DE ESNUJAQUE (Blanco) */}
      <Section id="por-que-esnujaque" variant="default" className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                El territorio como escuela viva
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                Por qué La Mesa de Esnujaque
              </h2>
              <p className="text-base leading-relaxed text-stone-700">
                La Mesa tiene todo para una escuela técnica: tierra fértil, tradición agrícola familiar y un entorno andino único. Entre el Santuario de Durí, la Laguna de la Estrella y la Laguna de Pozo Negro, el pueblo reúne historia, agua y campo que los estudiantes pueden aprender a cuidar y trabajar.
              </p>

              <div className="space-y-3 pt-1 text-sm text-stone-800">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-amber-300 font-bold text-xs mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-stone-950 font-bold">Santuario de Durí:</strong> Referente histórico, arquitectónico y espiritual del pueblo.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-amber-300 font-bold text-xs mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-stone-950 font-bold">Laguna de la Estrella y Laguna de Pozo Negro:</strong> Reservorios naturales de agua en la alta montaña que requieren cuidado y estudio.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-amber-300 font-bold text-xs mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-stone-950 font-bold">Valles y familias agrícolas:</strong> Décadas de conocimiento en el cultivo de hortalizas y flores en terrazas andinas.
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  href="/territorio"
                  variant="primary"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold border-0 shadow-sm"
                >
                  <span>Explorar territorio, galería y mapa</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* Ficha editorial territorial del pueblo con emblema */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 text-stone-900 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-emerald-800/30 bg-white p-0.5">
                      <Image
                        src={siteConfig.logo.emblem}
                        alt={siteConfig.logo.alt}
                        width={32}
                        height={32}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-serif text-lg font-bold text-stone-900">Datos del Territorio</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Emblema Local</span>
                </div>
                <dl className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <dt className="text-emerald-800 font-semibold">Ubicación</dt>
                    <dd className="font-bold text-stone-950">Municipio Urdaneta, Estado Trujillo, Venezuela</dd>
                  </div>
                  <div>
                    <dt className="text-emerald-800 font-semibold">Altitud y Clima</dt>
                    <dd className="font-bold text-stone-950">Aproximadamente 1.750 msnm · Clima templado de montaña</dd>
                  </div>
                  <div>
                    <dt className="text-emerald-800 font-semibold">Vocación Principal</dt>
                    <dd className="font-bold text-stone-950">Agricultura familiar de altura, floricultura, turismo rural y protección de cuencas</dd>
                  </div>
                  <div>
                    <dt className="text-emerald-800 font-semibold">Enfoque Educativo</dt>
                    <dd className="font-bold text-stone-950">Articular la escuela técnica con la vida cotidiana y productiva del pueblo</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. HOJA DE RUTA (Verde oscuro andino) */}
      <Section id="hoja-de-ruta" variant="muted" className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Implementación gradual
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">
                Hoja de ruta por etapas
              </h2>
              <p className="mt-2 text-base text-emerald-100 leading-relaxed">
                Un camino prudente y por pasos, pensado para construirse junto a la comunidad y las instituciones competentes.
              </p>
            </div>
            <Button
              href="/etapas"
              variant="outline"
              className="border-white/70 bg-white/10 text-white hover:bg-white/20 font-bold shadow-xs shrink-0"
            >
              <span>Ver detalle completo</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          {/* Línea de tiempo estructurada */}
          <div className="space-y-4">
            {siteConfig.roadmapStages.map((stage, idx) => (
              <div
                key={stage.stage}
                className="flex flex-col sm:flex-row items-start gap-4 rounded-xl border border-emerald-700/60 bg-[#143326] p-5 text-white transition-colors hover:border-amber-400/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-stone-950 font-bold text-base">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      {stage.stage}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. IMPACTOS ESPERADOS (Blanco) */}
      <Section id="impactos-esperados" variant="default" className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Bienestar para la gente
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Impactos esperados en la comunidad
            </h2>
            <p className="mt-2 text-base text-stone-700 leading-relaxed">
              Lo que el anteproyecto busca lograr para las familias, los jóvenes y los productores de La Mesa de Esnujaque:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {siteConfig.impacts.map((impact) => (
              <div
                key={impact.id}
                className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-5 text-stone-900 shadow-xs transition-colors hover:border-emerald-600/50"
              >
                <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-900 mb-2">
                  {impact.badge}
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {impact.title}
                </h3>
                <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                  {impact.summary}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. CÓMO SE CONSTRUYE CON LA COMUNIDAD (Verde oscuro andino) */}
      <Section id="metodologia-comunitaria" variant="muted" className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Metodología participativa
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Cómo se construye con la comunidad
              </h2>
              <p className="text-base leading-relaxed text-emerald-100">
                Este proyecto no se impone desde una oficina: se conversa en la calle, en las asambleas y en las parcelas con quienes conocen la tierra y la vida del pueblo.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Button
                  href="/cronograma"
                  variant="outline"
                  className="border-white/70 bg-white/10 text-white hover:bg-white/20 font-bold shadow-xs"
                >
                  <span>Ver cronograma de trabajo</span>
                </Button>
                <Button
                  href="/documento/metodologia"
                  variant="secondary"
                  className="bg-amber-400 text-stone-950 hover:bg-amber-300 border-0 font-bold shadow-xs"
                >
                  <span>Ver metodología detallada</span>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {siteConfig.methodologyPhases.map((phase, idx) => (
                <div
                  key={phase.number}
                  className="flex items-start gap-4 rounded-xl border border-emerald-700/60 bg-[#143326] p-4 text-white shadow-xs"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-xs font-bold text-stone-950">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">
                      {phase.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. ALINEACIÓN CON LA AGENDA 2030 (Blanco) */}
      <Section id="agenda-2030" variant="default" className="py-12 sm:py-14">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Marco internacional
            </span>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Alineación con los Objetivos de Desarrollo Sostenible
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-700">
              El anteproyecto vincula sus metas con cinco objetivos globales de la ONU:
            </p>
          </div>

          {/* Fila compacta de ODS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {siteConfig.sdgs.map((sdg) => (
              <div
                key={sdg.number}
                className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 text-stone-900 shadow-xs transition-colors hover:border-emerald-600/50"
              >
                <span
                  className="inline-block rounded px-2 py-0.5 text-[11px] font-extrabold text-white mb-2"
                  style={{ backgroundColor: sdg.color }}
                >
                  {sdg.number}
                </span>
                <h3 className="font-serif text-sm font-bold text-stone-900">
                  {sdg.title}
                </h3>
                <p className="mt-1.5 text-xs text-stone-700 leading-relaxed">
                  {sdg.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. POSIBLES ALIADOS E INSTITUCIONES (Verde oscuro andino) */}
      <Section id="posibles-aliados" variant="muted" className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Articulación comunitaria e institucional
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-white">
              Actores clave y posibles aliados
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Instancias identificadas para coordinar esfuerzos una vez que la propuesta sea validada por la comunidad:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteConfig.allies.map((ally) => (
              <div
                key={ally.name}
                className="rounded-xl border border-emerald-700/60 bg-[#143326] p-4 text-white space-y-1.5 shadow-xs"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  {ally.category}
                </span>
                <h3 className="font-serif text-base font-bold text-white">
                  {ally.name}
                </h3>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  {ally.role}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. PARTICIPÁ (Blanco con tarjeta destacada de convocatoria) */}
      <Section id="participa-cta" variant="default" className="py-12 sm:py-16">
        <Container>
          <div className="rounded-2xl border border-emerald-700/70 bg-[#143326] p-8 sm:p-10 shadow-lg text-white">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8 space-y-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 px-3 py-1 text-xs font-bold text-amber-300">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  Construcción Colectiva en La Mesa de Esnujaque
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Tu voz y tu experiencia suman en este anteproyecto
                </h2>
                <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-2xl">
                  Si vivís en La Mesa, sembrás en el campo, enseñás, estudiás o tenés un emprendimiento, participá en la consulta comunitaria. Queremos escuchar tus opiniones, dudas y sugerencias.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Button
                  href="/participa"
                  size="lg"
                  className="bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold w-full shadow-xs"
                >
                  <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                  <span>Participá en la consulta</span>
                </Button>
                <Button
                  href="/contacto"
                  size="lg"
                  variant="outline"
                  className="border-white/60 text-white hover:bg-white/10 w-full font-semibold"
                >
                  <span>Escribir al autor</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 10. REFLEXIÓN FINAL (Verde oscuro andino) */}
      <Section id="reflexion-cierre" variant="muted" className="py-12 sm:py-14">
        <Container size="narrow">
          <div className="text-center mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 px-3.5 py-1 text-xs font-semibold text-amber-300">
              <Leaf className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              Reflexión Final del Documento
            </span>
          </div>
          <Quote
            variant="dark"
            quote="La propuesta de crear progresivamente una Escuela Técnica Agroturística representa una invitación a construir ese futuro desde la educación, el trabajo, la participación y el compromiso con el territorio. A partir de este momento, el camino dependerá de la voluntad de la comunidad organizada, del apoyo de las instituciones y del esfuerzo de cada ciudadano dispuesto a hacer realidad esta visión compartida. Porque el futuro no se espera; se construye. ¡Vamos pa'lante, porque pa'lante es pa' allá!"
            author={siteConfig.author.name}
            context="Capítulo 20 · Reflexión Final"
          />
        </Container>
      </Section>
    </>
  );
}
