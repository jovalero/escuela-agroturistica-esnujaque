'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Download, Menu, Sprout, X } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  }, [pathname]);

  // Manejar clic afuera y tecla Escape para el menú "Más"
  useEffect(() => {
    if (!moreMenuOpen) return;

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setMoreMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [moreMenuOpen]);

  // Atrapado de foco y tecla Escape en el drawer móvil
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const drawerEl = drawerRef.current;
    const focusables = drawerEl
      ? Array.from(drawerEl.querySelectorAll<HTMLElement>(focusableSelector))
      : [];

    if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === 'Tab' && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isMoreActive =
    isActiveLink('/cronograma') ||
    isActiveLink('/autor') ||
    isActiveLink('/contacto');

  return (
    <>
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-emerald-900 focus:px-4 focus:py-2.5 focus:font-sans focus:text-sm focus:font-bold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
        Saltar al contenido principal
      </a>

      {/* Header: Verde oscuro andino (#1B4332), sobrio y conectado con la plaza y montañas */}
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-colors duration-200 print:hidden',
          'bg-[#1B4332] text-white border-b border-[#143326] shadow-sm'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          {/* Izquierda: Identidad del proyecto (entra en 1 o 2 líneas sin romperse) */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-800/80 text-amber-300 transition-colors group-hover:bg-emerald-700"
              aria-hidden="true"
            >
              <Sprout className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-sm sm:text-base font-bold leading-snug tracking-tight text-white whitespace-normal max-w-[210px] sm:max-w-none">
                Escuela Técnica Agroturística
              </span>
              <span className="text-[11px] font-medium text-emerald-100/90 leading-tight">
                La Mesa de Esnujaque · Trujillo
              </span>
            </div>
          </Link>

          {/* Centro (Desktop): Navegación con 4 enlaces principales + menú desplegable "Más ▾" */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-1"
          >
            {siteConfig.navigation.map((item) => {
              const active = isActiveLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300',
                    active
                      ? 'bg-white/20 text-white font-semibold shadow-2xs'
                      : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Menú desplegable "Más ▾" (clic/tap, Escape y clic afuera) */}
            <div ref={moreMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreMenuOpen((prev) => !prev)}
                aria-expanded={moreMenuOpen}
                aria-haspopup="true"
                aria-label="Más secciones del anteproyecto"
                className={cn(
                  'inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300',
                  moreMenuOpen || isMoreActive
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                )}
              >
                <span>Más</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    moreMenuOpen && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>

              {moreMenuOpen && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute right-0 mt-2 w-52 rounded-xl border border-emerald-800 bg-[#143326] py-2 text-white shadow-2xl backdrop-blur-md z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <Link
                    role="menuitem"
                    href="/cronograma"
                    onClick={() => setMoreMenuOpen(false)}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm transition-colors',
                      isActiveLink('/cronograma')
                        ? 'bg-white/15 font-semibold text-white'
                        : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    Cronograma
                  </Link>
                  <Link
                    role="menuitem"
                    href="/autor"
                    onClick={() => setMoreMenuOpen(false)}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm transition-colors',
                      isActiveLink('/autor')
                        ? 'bg-white/15 font-semibold text-white'
                        : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    Autor
                  </Link>
                  <Link
                    role="menuitem"
                    href="/contacto"
                    onClick={() => setMoreMenuOpen(false)}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm transition-colors',
                      isActiveLink('/contacto')
                        ? 'bg-white/15 font-semibold text-white'
                        : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    Contacto
                  </Link>
                  <div className="my-1 border-t border-emerald-900" />
                  <a
                    role="menuitem"
                    href={siteConfig.pdfUrl}
                    download="Anteproyecto-Escuela-Tecnica-Agroturistica-La-Mesa-de-Esnujaque.pdf"
                    onClick={() => setMoreMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-white/10 hover:text-amber-200 transition-colors"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span>Descargar PDF</span>
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Derecha: Botón destacado "Participá" y botón de menú móvil */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/participa"
              className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-xs sm:text-sm font-bold text-stone-950 shadow-xs transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Participá
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-emerald-700/60 bg-emerald-900 text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer móvil a pantalla completa con todos los enlaces y acción Participá persistente */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden print:hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setMobileMenuOpen(false);
              }
            }}
          >
            <motion.div
              ref={drawerRef}
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menú principal de navegación"
              initial={shouldReduceMotion ? { x: 0 } : { x: '100%' }}
              animate={{ x: 0 }}
              exit={shouldReduceMotion ? { x: 0 } : { x: '100%' }}
              transition={{ type: 'tween', duration: 0.22 }}
              className="ml-auto flex h-full w-full max-w-md flex-col justify-between overflow-y-auto bg-[#143326] p-6 text-white shadow-2xl border-l border-emerald-900"
            >
              <div>
                <div className="flex items-center justify-between border-b border-emerald-900/80 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-800 text-amber-300">
                      <Sprout className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-serif text-sm font-bold text-white">
                        Escuela Técnica Agroturística
                      </p>
                      <p className="text-xs text-emerald-200/80">
                        La Mesa de Esnujaque · Anteproyecto 2026
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Cerrar menú"
                    className="rounded-xl border border-emerald-700/60 p-2 text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav aria-label="Menú móvil" className="mt-6">
                  <ul className="space-y-1.5">
                    {siteConfig.allNavigation.map((item) => {
                      const active = isActiveLink(item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              'flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300',
                              active
                                ? 'bg-amber-400 text-stone-950 font-bold'
                                : 'text-emerald-50 hover:bg-emerald-900/60 hover:text-white'
                            )}
                          >
                            <span>{item.label}</span>
                            {active && (
                              <span className="text-xs uppercase tracking-wider opacity-90">
                                Actual
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              <div className="mt-8 space-y-3 border-t border-emerald-900/80 pt-5">
                <Link
                  href="/participa"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-base font-bold text-stone-950 shadow-sm hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  Participá en la consulta
                </Link>
                <a
                  href={siteConfig.pdfUrl}
                  download="Anteproyecto-Escuela-Tecnica-Agroturistica-La-Mesa-de-Esnujaque.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-700/60 bg-emerald-900/70 px-5 py-3 text-base font-semibold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  <span>Descargar PDF completo</span>
                </a>
                <p className="text-center text-xs text-emerald-200/70 pt-1">
                  {siteConfig.legalDisclaimer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
