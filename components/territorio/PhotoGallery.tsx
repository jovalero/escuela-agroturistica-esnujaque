'use client';

import React, { useState } from 'react';
import { Expand } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  'Todas',
  'Paisajes y Lagunas',
  'Patrimonio Cultural',
  'Agricultura y Comunidad',
  'Educación y Futuro',
] as const;

export function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const [selectedItem, setSelectedItem] = useState<
    (typeof siteConfig.galleryItems)[number] | null
  >(null);

  const filteredItems =
    activeCategory === 'Todas'
      ? siteConfig.galleryItems
      : siteConfig.galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Filtros de categoría */}
      <div
        role="group"
        aria-label="Filtrar galería por categoría"
        className="mb-8 flex flex-wrap items-center gap-2"
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600',
                isActive
                  ? 'border-paramo-700 bg-paramo-700 text-white'
                  : 'border-stone-300 dark:border-paramo-700 bg-white dark:bg-papel-cardDark text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-paramo-800'
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Grilla de tarjetas con apertura en Lightbox */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark shadow-sm transition-all hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setSelectedItem(item)}
              aria-label={`Ampliar imagen: ${item.title}`}
              className="relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-paramo-600"
            >
              <PhotoPlaceholder
                label={item.placeholderLabel}
                alt={item.alt}
                src={item.imageUrl || undefined}
                className="rounded-none border-0"
              />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-black/65 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-xs opacity-90 group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Ampliar</span>
              </span>
            </button>

            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="mb-2">
                  <Badge variant="paramo">{item.category}</Badge>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox accesible */}
      <Modal
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || 'Vista ampliada'}
      >
        {selectedItem && (
          <div className="space-y-4">
            <PhotoPlaceholder
              label={selectedItem.placeholderLabel}
              alt={selectedItem.alt}
              src={selectedItem.imageUrl || undefined}
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="paramo">{selectedItem.category}</Badge>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                Ruta para subir foto real: <code>/public/galeria/</code>
              </span>
            </div>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              {selectedItem.caption}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
