'use client';

import React, { useEffect } from 'react';
import { RefreshCcw, Home } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section variant="default" className="py-20 sm:py-28">
      <Container size="narrow" className="text-center space-y-6">
        <Badge variant="warning">Aviso del sistema</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100">
          Ocurrió un inconveniente al cargar esta vista
        </h1>
        <p className="text-base text-stone-700 dark:text-stone-300 max-w-xl mx-auto">
          Podés intentar recargar la sección o regresar a la página principal del anteproyecto.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button type="button" onClick={reset} variant="primary">
            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
            <span>Reintentar carga</span>
          </Button>
          <Button href="/" variant="outline">
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Volver al Inicio</span>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
