'use client';

import React from 'react';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PrintButtonProps {
  label?: string;
}

export function PrintButton({ label = 'Imprimir documento completo' }: PrintButtonProps) {
  return (
    <Button
      type="button"
      onClick={() => window.print()}
      className="bg-amber-400 text-stone-950 hover:bg-amber-300 font-bold print:hidden"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </Button>
  );
}
