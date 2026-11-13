import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get('title') ||
    'Escuela Técnica Agroturística de La Mesa de Esnujaque';
  const description =
    searchParams.get('description') ||
    'Propuesta educativa para el reconocimiento, protección y aprovechamiento responsable del patrimonio territorial como base del desarrollo sostenible de la comunidad';
  const badge =
    searchParams.get('badge') || 'Anteproyecto 2026 · En consulta comunitaria';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0B1D15 0%, #1B4332 58%, #1D5B79 100%)',
          padding: '64px',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              background: '#DDA15E',
              color: '#0B1D15',
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '20px',
              fontWeight: 800,
            }}
          >
            {badge}
          </div>
          <div style={{ fontSize: '20px', color: '#D8F3DC' }}>
            La Mesa de Esnujaque · Municipio Urdaneta, Estado Trujillo
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              fontSize: '50px',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#FFFFFF',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '24px',
              lineHeight: 1.38,
              color: '#D8F3DC',
              maxWidth: '1020px',
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.25)',
            paddingTop: '24px',
            fontSize: '20px',
            color: '#F8F9FA',
          }}
        >
          <div>Escuela Técnica Agroturística de La Mesa de Esnujaque</div>
          <div>Autor: Msc. José Ramón Valero</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
