'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, Download, Mail, MapPin, User } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-paramo-950 text-paramo-50 border-t border-paramo-800 print:hidden">
      {/* Nota institucional fija obligatoria */}
      <div className="bg-paramo-900/90 border-b border-paramo-800 px-4 py-4">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-paramo-100">
          <p className="font-medium leading-relaxed">
            <strong className="text-amber-300 font-semibold">Aviso institucional: </strong>
            {siteConfig.legalDisclaimer}
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Volver arriba al inicio de la página"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-paramo-700 bg-paramo-800/80 px-3 py-1.5 text-xs font-semibold text-paramo-100 hover:bg-paramo-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Volver arriba</span>
          </button>
        </div>
      </div>

      {/* 4 Columnas principales */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Marca, ubicación, autor y contacto directo */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-amber-300/60 bg-[#FAF8F5] p-0.5 shadow-xs">
                <Image
                  src={siteConfig.logo.emblem}
                  alt={siteConfig.logo.alt}
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="block font-serif text-base font-bold text-white leading-tight">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-paramo-200">Anteproyecto 2026</span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-paramo-200/90">
              {siteConfig.documentTitle}.
            </p>

            <ul className="space-y-2 text-xs text-paramo-100">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{siteConfig.location.fullLabel}</span>
              </li>
              <li className="flex items-start gap-2">
                <User className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Autor: {siteConfig.author.name}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-paramo-200">Contacto con el autor:</span>
                  <Link
                    href="/contacto"
                    className="font-semibold text-amber-300 underline hover:text-amber-200"
                  >
                    Formulario de contacto y aportes
                  </Link>
                </div>
              </li>
            </ul>

            {/* Redes sociales con íconos SVG y botón de WhatsApp */}
            <div className="pt-2">
              <a
                href={siteConfig.contact.socialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir anteproyecto por WhatsApp"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.97-.31-1.66-.61-2.92-1.26-4.83-4.21-4.98-4.41-.14-.2-1.19-1.58-1.19-3.02 0-1.44.75-2.15 1.02-2.44.27-.29.59-.36.79-.36.2 0 .4.01.57.01.18.01.43-.07.67.51.24.59.82 2.02.89 2.17.07.15.12.32.02.52-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.29.15.46.12.63-.07.17-.2.73-.85.93-1.15.2-.29.39-.24.66-.15.27.1 1.71.81 2 .95.29.15.49.22.56.34.07.12.07.71-.17 1.39z" />
                </svg>
                <span>Compartir en WhatsApp</span>
              </a>

              <div className="mt-3 flex items-center gap-2.5">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteConfig.url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartir en Facebook"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-paramo-700 bg-paramo-900 text-paramo-100 hover:bg-paramo-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Escuela Técnica Agroturística de La Mesa de Esnujaque')}&url=${encodeURIComponent(siteConfig.url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartir en X (Twitter)"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-paramo-700 bg-paramo-900 text-paramo-100 hover:bg-paramo-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Columna 2: Navegación principal */}
          <div>
            <h2 className="font-serif text-base font-bold text-white mb-4">
              Navegación del sitio
            </h2>
            <ul className="space-y-2 text-sm">
              {siteConfig.allNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paramo-200 hover:text-amber-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Recursos y lectura */}
          <div>
            <h2 className="font-serif text-base font-bold text-white mb-4">
              Recursos y documentos
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={siteConfig.pdfUrl}
                  download="Anteproyecto-Escuela-Tecnica-Agroturistica-La-Mesa-de-Esnujaque.pdf"
                  className="inline-flex items-center gap-1.5 font-semibold text-amber-300 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Descargar documento completo (PDF)</span>
                </a>
              </li>
              <li>
                <Link
                  href="/resumen"
                  className="text-paramo-200 hover:text-amber-300 transition-colors"
                >
                  Resumen ejecutivo (1 página)
                </Link>
              </li>
              <li>
                <Link
                  href="/documento"
                  className="text-paramo-200 hover:text-amber-300 transition-colors"
                >
                  Índice de los 21 capítulos
                </Link>
              </li>
              <li>
                <Link
                  href="/documento/completo"
                  className="text-paramo-200 hover:text-amber-300 transition-colors"
                >
                  Versión de lectura continua e impresión
                </Link>
              </li>
              <li>
                <Link
                  href="/descargas"
                  className="text-paramo-200 hover:text-amber-300 transition-colors"
                >
                  Centro de descargas y ficha técnica
                </Link>
              </li>
              <li>
                <Link
                  href="/participa"
                  className="text-paramo-200 hover:text-amber-300 transition-colors"
                >
                  Encuesta comunitaria y buzón de aportes
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-paramo-200 hover:text-amber-300 transition-colors"
                >
                  Formulario de contacto institucional
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Mantenete informado */}
          <div>
            <h2 className="font-serif text-base font-bold text-white mb-2">
              Mantenete informado
            </h2>
            <p className="text-xs leading-relaxed text-paramo-200 mb-4">
              Recibí convocatorias a las asambleas de ciudadanos y ciudadanas y novedades sobre el proceso de validación comunitaria.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-paramo-800/80 bg-black/25 px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paramo-200">
          <p>
            © {siteConfig.year} {siteConfig.author.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/privacidad"
              className="hover:text-amber-300 underline underline-offset-4"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/terminos"
              className="hover:text-amber-300 underline underline-offset-4"
            >
              Términos de Uso
            </Link>
            <Link
              href="/descargas"
              className="hover:text-amber-300 underline underline-offset-4"
            >
              Descargar PDF
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
