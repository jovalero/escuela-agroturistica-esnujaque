'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'error';
  onClose?: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg font-sans text-sm font-medium transition-all',
        type === 'success'
          ? 'bg-paramo-800 text-white border-paramo-600'
          : 'bg-red-800 text-white border-red-600'
      )}
    >
      {type === 'success' ? (
        <CheckCircle2 className="h-5 w-5 text-paramo-200 shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle className="h-5 w-5 text-red-200 shrink-0" aria-hidden="true" />
      )}
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="ml-2 rounded p-1 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
