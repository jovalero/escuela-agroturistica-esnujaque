'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TerritoryMapClient = dynamic(() => import('./TerritoryMapClient'), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      aria-label="Cargando mapa interactivo"
      className="flex h-[420px] w-full items-center justify-center rounded-2xl border border-stone-200 dark:border-paramo-800 bg-stone-100/80 dark:bg-paramo-900/40 p-6 text-center text-sm font-medium text-stone-600 dark:text-stone-300"
    >
      Cargando mapa territorial interactivo de La Mesa de Esnujaque (OpenStreetMap)...
    </div>
  ),
});

export function TerritoryMap() {
  return <TerritoryMapClient />;
}
