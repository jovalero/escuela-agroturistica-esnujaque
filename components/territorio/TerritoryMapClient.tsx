'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';
import { siteConfig, type TerritoryPoint } from '@/data/site';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

function createCustomIcon(category: TerritoryPoint['category']) {
  const colorMap: Record<TerritoryPoint['category'], string> = {
    'Patrimonio Natural': '#1D5B79',
    'Patrimonio Cultural': '#1B4332',
    Infraestructura: '#B07D3B',
    'Proyección Futura': '#764B25',
  };
  const bg = colorMap[category] || '#1B4332';

  const svgHtml = `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:32px;
      height:32px;
      border-radius:9999px;
      background:${bg};
      border:3px solid #ffffff;
      box-shadow:0 3px 8px rgba(0,0,0,0.35);
      color:#ffffff;
      font-weight:bold;
      font-size:13px;
    ">●</div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'eta-custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export default function TerritoryMapClient() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const [selectedId, setSelectedId] = useState<string>(siteConfig.territoryPoints[0].id);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapInstanceRef.current) return;

    const map = L.map(container, {
      center: [siteConfig.location.coordinates.lat, siteConfig.location.coordinates.lng],
      zoom: siteConfig.location.coordinates.zoom,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const currentMarkers = markersRef.current;
    currentMarkers.clear();

    siteConfig.territoryPoints.forEach((point) => {
      const marker = L.marker([point.lat, point.lng], {
        icon: createCustomIcon(point.category),
        title: point.name,
        alt: point.name,
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: system-ui, sans-serif; max-width: 240px;">
          <strong style="font-size: 14px; color: #1B4332; display:block; margin-bottom: 4px;">
            ${point.name}
          </strong>
          <span style="font-size: 11px; background: #D8F3DC; color: #1B4332; padding: 2px 6px; border-radius: 99px; font-weight: 600;">
            ${point.category}
          </span>
          <p style="font-size: 12px; color: #333; margin-top: 6px; line-height: 1.4;">
            ${point.description}
          </p>
          <p style="font-size: 10px; color: #666; margin-top: 4px; font-style: italic;">
            Coordenadas referenciales aproximadas (${point.lat.toFixed(4)}, ${point.lng.toFixed(4)})
          </p>
        </div>
      `);

      marker.on('click', () => {
        setSelectedId(point.id);
      });

      currentMarkers.set(point.id, marker);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      currentMarkers.clear();
    };
  }, []);

  const focusPoint = (point: TerritoryPoint) => {
    setSelectedId(point.id);
    const map = mapInstanceRef.current;
    const marker = markersRef.current.get(point.id);
    if (map && marker) {
      map.setView([point.lat, point.lng], 15, { animate: true });
      marker.openPopup();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Lista interactiva de puntos de interés */}
      <div className="lg:col-span-5 space-y-2.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
          Seleccioná un punto para ubicarlo en el mapa:
        </p>
        {siteConfig.territoryPoints.map((pt) => {
          const isSelected = pt.id === selectedId;
          return (
            <button
              key={pt.id}
              type="button"
              onClick={() => focusPoint(pt)}
              aria-pressed={isSelected}
              className={cn(
                'w-full rounded-xl border p-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600',
                isSelected
                  ? 'border-paramo-600 bg-paramo-50/90 dark:border-paramo-400 dark:bg-paramo-900/60 shadow-xs'
                  : 'border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark hover:border-paramo-300'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-serif text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <MapPin
                    className="h-4 w-4 text-paramo-700 dark:text-paramo-300 shrink-0"
                    aria-hidden="true"
                  />
                  {pt.name}
                </span>
                <Badge
                  variant={
                    pt.category === 'Patrimonio Natural'
                      ? 'laguna'
                      : pt.category === 'Proyección Futura'
                        ? 'warning'
                        : 'paramo'
                  }
                >
                  {pt.category}
                </Badge>
              </div>
              <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                {pt.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Contenedor del mapa Leaflet */}
      <div className="lg:col-span-7 flex flex-col">
        <div
          ref={mapContainerRef}
          role="region"
          aria-label="Mapa interactivo de La Mesa de Esnujaque y puntos de patrimonio territorial"
          className="h-[420px] sm:h-[520px] w-full rounded-2xl border border-stone-200 dark:border-paramo-800 shadow-sm z-0"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 px-4 py-2.5 text-xs text-amber-950 dark:text-amber-200">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Navigation className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{siteConfig.location.coordinates.note}</span>
          </span>
          <a
            href={`https://www.openstreetmap.org/?mlat=${siteConfig.location.coordinates.lat}&mlon=${siteConfig.location.coordinates.lng}#map=14/${siteConfig.location.coordinates.lat}/${siteConfig.location.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline hover:text-paramo-800 dark:hover:text-amber-100"
          >
            Abrir en OpenStreetMap ↗
          </a>
        </div>
      </div>
    </div>
  );
}
