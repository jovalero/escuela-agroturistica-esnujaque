'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { suggestionSchema, type SuggestionInput } from '@/lib/validations';
import { Button } from '@/components/ui/Button';

export function SuggestionsForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SuggestionInput>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      nombre: '',
      sector: '',
      categoria: undefined,
      aporte: '',
      consentimiento: undefined,
      website: '',
    },
  });

  const onSubmit = async (data: SuggestionInput) => {
    setStatus('submitting');
    setServerMessage('');

    try {
      const res = await fetch('/api/aportes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus('error');
        setServerMessage(json.error || 'No se pudo enviar tu sugerencia.');
        return;
      }

      setStatus('success');
      setServerMessage(
        json.message ||
          '¡Gracias por tu aporte! Fue registrado en el buzón comunitario para su revisión.'
      );
      reset();
    } catch {
      setStatus('error');
      setServerMessage('Error de conexión. Por favor intentá nuevamente.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark p-6 sm:p-8 shadow-sm"
    >
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="suggestion-website">Dejá este campo vacío</label>
        <input
          id="suggestion-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="suggestion-nombre"
            className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
          >
            Nombre <span className="font-normal text-stone-500">(opcional)</span>
          </label>
          <input
            id="suggestion-nombre"
            type="text"
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
            {...register('nombre')}
          />
        </div>

        <div>
          <label
            htmlFor="suggestion-sector"
            className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
          >
            Sector, organización o institución <span className="text-red-600">*</span>
          </label>
          <input
            id="suggestion-sector"
            type="text"
            placeholder="Ej.: Sector Durí, Consejo Comunal, Productor..."
            aria-invalid={Boolean(errors.sector)}
            className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
            {...register('sector')}
          />
          {errors.sector && (
            <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.sector.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="suggestion-categoria"
          className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
        >
          Tema principal del aporte <span className="text-red-600">*</span>
        </label>
        <select
          id="suggestion-categoria"
          defaultValue=""
          aria-invalid={Boolean(errors.categoria)}
          className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
          {...register('categoria')}
        >
          <option value="" disabled>
            Seleccioná un tema...
          </option>
          <option value="educacion">Formación técnica y liceo</option>
          <option value="agricultura">Agricultura sostenible y Laboratorio de Suelos</option>
          <option value="turismo">Turismo rural y patrimonio cultural</option>
          <option value="ambiente">Conservación ambiental, lagunas y cuencas</option>
          <option value="infraestructura">Infraestructura y etapas del proyecto</option>
          <option value="otro">Otro aporte o sugerencia</option>
        </select>
        {errors.categoria && (
          <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
            {errors.categoria.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="suggestion-aporte"
          className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
        >
          Tu sugerencia, observación o propuesta <span className="text-red-600">*</span>
        </label>
        <textarea
          id="suggestion-aporte"
          rows={4}
          placeholder="Escribí aquí tu propuesta u observación para ser considerada en la validación del anteproyecto..."
          aria-invalid={Boolean(errors.aporte)}
          className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
          {...register('aporte')}
        />
        {errors.aporte && (
          <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
            {errors.aporte.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id="suggestion-consent"
          type="checkbox"
          aria-invalid={Boolean(errors.consentimiento)}
          className="mt-1 h-4 w-4 rounded border-stone-300 text-paramo-700 focus:ring-2 focus:ring-paramo-600"
          {...register('consentimiento')}
        />
        <label
          htmlFor="suggestion-consent"
          className="text-xs sm:text-sm text-stone-700 dark:text-stone-300"
        >
          Autorizo que esta sugerencia sea analizada en las mesas de validación comunitaria conforme a la{' '}
          <Link
            href="/privacidad"
            className="font-semibold text-paramo-800 dark:text-paramo-200 underline"
          >
            Política de Privacidad
          </Link>
          .
        </label>
      </div>
      {errors.consentimiento && (
        <p role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
          {errors.consentimiento.message}
        </p>
      )}

      <Button
        type="submit"
        variant="tierra"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto"
      >
        <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
        <span>{status === 'submitting' ? 'Enviando aporte...' : 'Enviar al buzón de aportes'}</span>
      </Button>

      {status === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-3 rounded-xl border border-paramo-300 bg-paramo-50 dark:border-paramo-700 dark:bg-paramo-900/60 p-4 text-sm text-paramo-900 dark:text-paramo-100"
        >
          <CheckCircle2
            className="h-5 w-5 text-paramo-700 dark:text-paramo-300 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <span>{serverMessage}</span>
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/60 p-4 text-sm text-red-900 dark:text-red-200"
        >
          {serverMessage}
        </div>
      )}
    </form>
  );
}
