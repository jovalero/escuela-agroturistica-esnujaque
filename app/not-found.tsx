import React from 'react';
import { BookOpen, Home, Search } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Section variant="default" className="py-20 sm:py-28">
      <Container size="narrow" className="text-center space-y-6">
        <Badge variant="warning">Error 404 · Página no encontrada</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100">
          No encontramos la página que buscás
        </h1>
        <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
          Es posible que el enlace haya cambiado o que la dirección esté incompleta. Podés regresar al inicio o explorar los 21 capítulos del anteproyecto.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button href="/" variant="primary">
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Ir al Inicio</span>
          </Button>
          <Button href="/documento" variant="outline">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>Índice de los 21 capítulos</span>
          </Button>
          <Button href="/participa" variant="secondary">
            <Search className="h-4 w-4" aria-hidden="true" />
            <span>Participar en la consulta</span>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
