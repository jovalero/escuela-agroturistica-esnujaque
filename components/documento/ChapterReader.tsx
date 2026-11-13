'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Printer, Type } from 'lucide-react';
import { cn, slugifyHeading } from '@/lib/utils';

type FontScale = 'sm' | 'md' | 'lg';

interface ChapterReaderProps {
  content: string;
  showControls?: boolean;
}

const CITATION_REGEX =
  /(\((?:ONU,\s*2015|UNESCO,\s*2020|FAO,\s*2017|OMT,\s*2020|PNUD,\s*2022|INE,\s*2014|Arias,\s*2012|Instituto Geográfico de Venezuela Simón Bolívar,\s*2010)\)|(?:UNESCO|FAO|OMT|PNUD|Arias)\s*\((?:2012|2015|2017|2020|2022)\)|Hernández Sampieri,\s*Fernández y Baptista\s*\(2014\))/g;

function renderInlineWithCitations(text: string): React.ReactNode {
  const parts = text.split(CITATION_REGEX);
  return parts.map((part, idx) => {
    if (CITATION_REGEX.test(part)) {
      CITATION_REGEX.lastIndex = 0;
      return (
        <Link
          key={`${part}-${idx}`}
          href="/documento/referencias-bibliograficas"
          title="Ver fuente en Referencias Bibliográficas (Capítulo 21)"
          className="inline-flex items-baseline rounded bg-paramo-100/90 dark:bg-paramo-800/80 px-1.5 py-0.5 font-sans text-[0.88em] font-semibold text-paramo-900 dark:text-paramo-100 underline decoration-paramo-500/60 underline-offset-2 hover:bg-paramo-200 dark:hover:bg-paramo-700"
        >
          {part}
        </Link>
      );
    }
    // Check italic *...*
    const italicParts = part.split(/(\*[^*]+\*)/g);
    return italicParts.map((sub, sIdx) => {
      if (sub.startsWith('*') && sub.endsWith('*') && sub.length > 2) {
        return <em key={`${idx}-${sIdx}`}>{sub.slice(1, -1)}</em>;
      }
      return sub;
    });
  });
}

export function ChapterReader({ content, showControls = true }: ChapterReaderProps) {
  const [fontScale, setFontScale] = useState<FontScale>('md');

  useEffect(() => {
    const saved = localStorage.getItem('eta-font-scale') as FontScale | null;
    if (saved === 'sm' || saved === 'md' || saved === 'lg') {
      setFontScale(saved);
    }
  }, []);

  const updateFontScale = (scale: FontScale) => {
    setFontScale(scale);
    localStorage.setItem('eta-font-scale', scale);
  };

  const scaleClasses: Record<FontScale, string> = {
    sm: 'text-base leading-relaxed',
    md: 'text-[1.08rem] sm:text-[1.125rem] leading-[1.8]',
    lg: 'text-lg sm:text-xl leading-[1.85]',
  };

  // Parse markdown blocks deterministically
  const lines = content.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  const usedHeadingIds = new Set<string>();

  const getUniqueId = (title: string) => {
    let id = slugifyHeading(title);
    let suffix = 2;
    while (usedHeadingIds.has(id)) {
      id = `${slugifyHeading(title)}-${suffix}`;
      suffix += 1;
    }
    usedHeadingIds.add(id);
    return id;
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i += 1;
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      const title = line.replace(/^##\s+/, '').trim();
      const id = getUniqueId(title);
      blocks.push(
        <h2
          key={`h2-${i}`}
          id={id}
          className="scroll-mt-28 font-serif text-2xl sm:text-3xl font-bold text-paramo-900 dark:text-paramo-100 mt-10 mb-4 pt-2 border-t border-stone-200/70 dark:border-paramo-800/70 first:border-t-0 first:mt-0"
        >
          {title}
        </h2>
      );
      i += 1;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      const title = line.replace(/^###\s+/, '').trim();
      const id = getUniqueId(title);
      blocks.push(
        <h3
          key={`h3-${i}`}
          id={id}
          className="scroll-mt-28 font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mt-8 mb-3"
        >
          {title}
        </h3>
      );
      i += 1;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
        i += 1;
      }
      blocks.push(
        <blockquote
          key={`quote-${i}`}
          className="my-6 rounded-2xl border-l-4 border-paramo-600 bg-paramo-50/80 dark:bg-paramo-900/45 dark:border-paramo-400 p-5 sm:p-6 font-serif italic text-stone-900 dark:text-stone-100 shadow-xs"
        >
          {quoteLines.map((qLine, qIdx) => (
            <p
              key={qIdx}
              className={cn(
                qLine.startsWith('—')
                  ? 'mt-2 font-sans text-sm font-bold not-italic text-paramo-800 dark:text-paramo-200'
                  : 'leading-relaxed'
              )}
            >
              {qLine}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Table
    if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i += 1;
      }
      const parsedRows = tableLines
        .filter((r) => !r.includes('---'))
        .map((r) =>
          r
            .split('|')
            .map((c) => c.trim())
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
        );
      const header = parsedRows[0] || [];
      const bodyRows = parsedRows.slice(1);

      blocks.push(
        <div
          key={`table-${i}`}
          className="my-8 overflow-x-auto rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark shadow-sm"
        >
          <table className="w-full border-collapse text-left font-sans text-xs sm:text-sm">
            <thead>
              <tr className="bg-paramo-800 text-white">
                {header.map((cell, cIdx) => (
                  <th
                    key={cIdx}
                    scope="col"
                    className={cn(
                      'px-3 py-3 font-semibold',
                      cIdx >= 2 && 'text-center'
                    )}
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-paramo-800">
              {bodyRows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="hover:bg-paramo-50/50 dark:hover:bg-paramo-900/30"
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={cn(
                        'px-3 py-2.5 text-stone-800 dark:text-stone-200',
                        cIdx === 0 && 'font-bold text-paramo-800 dark:text-paramo-300',
                        cIdx >= 2 && 'text-center font-bold'
                      )}
                    >
                      {cell === 'X' ? (
                        <span
                          aria-label="Actividad programada en este mes"
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-paramo-700 text-xs font-bold text-white"
                        >
                          X
                        </span>
                      ) : (
                        <span className="text-stone-400">{cell}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().replace(/^-\s+/, ''));
        i += 1;
      }
      blocks.push(
        <ul
          key={`ul-${i}`}
          className="my-5 list-disc space-y-2.5 pl-6 text-stone-800 dark:text-stone-200"
        >
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineWithCitations(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i += 1;
      }
      blocks.push(
        <ol
          key={`ol-${i}`}
          className="my-5 list-decimal space-y-3 pl-6 text-stone-800 dark:text-stone-200"
        >
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed pl-1">
              {renderInlineWithCitations(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Standard Paragraph
    blocks.push(
      <p key={`p-${i}`} className="my-5 text-stone-800 dark:text-stone-200">
        {renderInlineWithCitations(line)}
      </p>
    );
    i += 1;
  }

  return (
    <div>
      {showControls && (
        <div
          aria-label="Controles de lectura e impresión"
          className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark px-4 py-3 shadow-xs print:hidden"
        >
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-paramo-700 dark:text-paramo-300" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300">
              Tamaño de lectura:
            </span>
            <div className="inline-flex rounded-xl border border-stone-200 dark:border-paramo-700 p-0.5 bg-stone-100 dark:bg-paramo-900">
              <button
                type="button"
                onClick={() => updateFontScale('sm')}
                aria-pressed={fontScale === 'sm'}
                aria-label="Disminuir tamaño de texto (A-)"
                className={cn(
                  'rounded-lg px-2.5 py-1 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600',
                  fontScale === 'sm'
                    ? 'bg-paramo-700 text-white'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-white/60'
                )}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => updateFontScale('md')}
                aria-pressed={fontScale === 'md'}
                aria-label="Tamaño de texto normal (A)"
                className={cn(
                  'rounded-lg px-2.5 py-1 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600',
                  fontScale === 'md'
                    ? 'bg-paramo-700 text-white'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-white/60'
                )}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => updateFontScale('lg')}
                aria-pressed={fontScale === 'lg'}
                aria-label="Aumentar tamaño de texto (A+)"
                className={cn(
                  'rounded-lg px-2.5 py-1 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600',
                  fontScale === 'lg'
                    ? 'bg-paramo-700 text-white'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-white/60'
                )}
              >
                A+
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 dark:border-paramo-700 px-3 py-1.5 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-paramo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            <span>Imprimir capítulo</span>
          </button>
        </div>
      )}

      {/* Cuerpo de lectura con ancho óptimo de 65 a 75 caracteres */}
      <article
        className={cn(
          'font-serif max-w-[70ch] mx-auto lg:mx-0',
          scaleClasses[fontScale]
        )}
      >
        {blocks}
      </article>
    </div>
  );
}
