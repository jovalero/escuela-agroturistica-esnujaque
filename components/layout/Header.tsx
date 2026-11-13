'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Download, Menu, Sprout, X } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Trap focus and handle Escape inside mobile drawer
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

  const isTransparentHero = isHome && !scrolled && !mobileMenuOpen;

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-paramo-800 focus:px-4 focus:py-2.5 focus:font-sans focus:text-sm focus:font-bold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
        Saltar al contenido principal
      </a>

      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-200 print:hidden',
          'bg-black/95 text-white backdrop-blur-md border-b border-neutral-800/90 shadow-sm'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Izquierda: Logo / Nombre del proyecto */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-paramo-500/50 bg-paramo-700 text-white transition-colors group-hover:bg-paramo-600"
              aria-hidden="true"
            >
              <Sprout className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-sm sm:text-base font-bold leading-tight tracking-tight text-white">
                Escuela Técnica Agroturística
              </span>
              <span className="text-[11px] font-medium text-neutral-300">
                La Mesa de Esnujaque · Trujillo
              </span>
            </div>
          </Link>

          {/* Centro (Desktop): Navegación */}
          <nav
            aria-label="Navegación principal"
            className="hidden xl:flex items-center gap-1"
          >
            {siteConfig.navigation.map((item) => {
              const active = isActiveLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300',
                    active
                      ? 'bg-white/20 text-white font-semibold'
                      : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Derecha: Acciones y menú móvil */}
          <div className="flex items-center gap-2">
            <ThemeToggle
              className="border-neutral-800 text-neutral-200 hover:bg-white/10 hover:text-white"
            />

            <a
              href={siteConfig.pdfUrl}
              download="Anteproyecto-Escuela-Tecnica-Agroturistica-La-Mesa-de-Esnujaque.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/80 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-neutral-800 hover:border-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Descargar PDF</span>
            </a>

            <Link
              href="/participa"
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-xs sm:text-sm font-bold text-stone-950 shadow-sm transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
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
              className="inline-flex xl:hidden h-10 w-10 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
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

      {/* Drawer móvil a pantalla completa con foco atrapado */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs xl:hidden print:hidden"
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
              className="ml-auto flex h-full w-full max-w-md flex-col justify-between overflow-y-auto bg-neutral-950 p-6 text-white shadow-2xl border-l border-neutral-800"
            >
              <div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-paramo-700 text-white">
                      <Sprout className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-serif text-sm font-bold text-white">
                        Escuela Técnica Agroturística
                      </p>
                      <p className="text-xs text-neutral-400">
                        La Mesa de Esnujaque · Anteproyecto 2026
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Cerrar menú"
                    className="rounded-xl border border-neutral-700 p-2 text-neutral-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav aria-label="Menú móvil" className="mt-6">
                  <ul className="space-y-1.5">
                    {siteConfig.navigation.map((item) => {
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
                                : 'text-neutral-200 hover:bg-neutral-900 hover:text-white'
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

              <div className="mt-8 space-y-3 border-t border-neutral-800 pt-5">
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-5 py-3 text-base font-semibold text-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  <span>Descargar PDF completo</span>
                </a>
                <p className="text-center text-xs text-neutral-400 pt-1">
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
