'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import { newsletterSchema, type NewsletterInput } from '@/lib/validations';

export function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      consentimiento: undefined,
      website: '',
    },
  });

  const onSubmit = async (data: NewsletterInput) => {
    setStatus('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/suscripcion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      if (!response.ok) {
        setStatus('error');
        setServerMessage(json.error || 'No se pudo procesar tu suscripción.');
        return;
      }

      setStatus('success');
      setServerMessage(
        json.message || '¡Gracias! Te mantendremos informado sobre las asambleas y avances.'
      );
      reset();
    } catch {
      setStatus('error');
      setServerMessage('Error de conexión. Por favor intentá nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
      {/* Honeypot anti-spam */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="newsletter-website">No completar este campo</label>
        <input
          id="newsletter-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div>
        <label htmlFor="newsletter-email" className="sr-only">
          Correo electrónico para recibir novedades
        </label>
        <div className="relative flex items-center">
          <Mail
            className="pointer-events-none absolute left-3 h-4 w-4 text-paramo-300"
            aria-hidden="true"
          />
          <input
            id="newsletter-email"
            type="email"
            placeholder="tu.correo@ejemplo.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
            className="w-full rounded-xl border border-paramo-700 bg-paramo-900/90 pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-paramo-300/80 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p id="newsletter-email-error" role="alert" className="mt-1 text-xs text-amber-300">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="newsletter-consent"
          type="checkbox"
          aria-invalid={Boolean(errors.consentimiento)}
          className="mt-1 h-4 w-4 rounded border-paramo-600 bg-paramo-900 text-amber-400 focus:ring-2 focus:ring-amber-300"
          {...register('consentimiento')}
        />
        <label htmlFor="newsletter-consent" className="text-xs leading-snug text-paramo-100/90">
          Acepto recibir avisos sobre asambleas y avances conforme a la{' '}
          <Link href="/privacidad" className="underline hover:text-amber-300">
            Política de Privacidad
          </Link>
          .
        </label>
      </div>
      {errors.consentimiento && (
        <p role="alert" className="text-xs text-amber-300">
          {errors.consentimiento.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-stone-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        <span>{status === 'submitting' ? 'Registrando...' : 'Suscribirme a novedades'}</span>
      </button>

      {status === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-2 rounded-xl bg-paramo-800/90 border border-paramo-500 p-2.5 text-xs text-paramo-50"
        >
          <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{serverMessage}</span>
        </div>
      )}

      {status === 'error' && (
        <p role="alert" className="text-xs text-amber-300">
          {serverMessage}
        </p>
      )}
    </form>
  );
}
