import React from 'react';
import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AnnouncementBanner } from '@/components/layout/AnnouncementBanner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/data/site';
import { getBaseJsonLd } from '@/lib/schema-org';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const shortMetaDescription =
  'Propuesta comunitaria para crear una Escuela Técnica Agroturística en La Mesa de Esnujaque, Trujillo. Formación técnica para los jóvenes, agricultura sostenible y turismo rural.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Anteproyecto Educativo y Comunitario 2026`,
    template: `%s | ${siteConfig.name}`,
  },
  description: shortMetaDescription,
  keywords: [
    'Escuela Técnica Agroturística',
    'La Mesa de Esnujaque',
    'Municipio Urdaneta',
    'Estado Trujillo',
    'Venezuela',
    'Desarrollo Sostenible',
    'Turismo Rural',
    'Agricultura Sostenible',
    'José Ramón Valero',
    'Santuario de Durí',
    'Laguna de la Estrella',
    'Laguna de Pozo Negro',
  ],
  authors: [{ name: siteConfig.author.name, url: `${siteConfig.url}/autor` }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · Anteproyecto 2026`,
    description: shortMetaDescription,
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} · Anteproyecto 2026`,
    description: shortMetaDescription,
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseJsonLd = getBaseJsonLd();
  const isVercelDeployment = process.env.VERCEL === '1';

  return (
    <html
      lang="es-VE"
      className={`${lora.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#0B1611] text-stone-900 dark:text-stone-100 antialiased transition-colors duration-200">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('eta-theme')==='dark'){document.documentElement.classList.add('dark');}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(baseJsonLd) }}
        />
        <AnnouncementBanner />
        <Header />
        <main id="contenido-principal" className="flex-1">
          {children}
        </main>
        <Footer />
        {isVercelDeployment && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
