'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Send } from 'lucide-react';
import { contactSchema, type ContactInput } from '@/lib/validations';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      organizacion: '',
      asunto: '',
      mensaje: '',
      consentimiento: undefined,
      website: '',
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus('submitting');
    setServerMessage('');

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus('error');
        setServerMessage(json.error || 'No se pudo enviar el mensaje.');
        return;
      }

      setStatus('success');
      setServerMessage(
        json.message ||
          '¡Tu mensaje fue enviado correctamente! Nos pondremos en contacto con vos a la brevedad.'
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
        <label htmlFor="contact-website">Dejá este campo vacío</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-nombre"
            className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
          >
            Nombre completo <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-nombre"
            type="text"
            placeholder="Tu nombre y apellido"
            aria-invalid={Boolean(errors.nombre)}
            className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
            {...register('nombre')}
          />
          {errors.nombre && (
            <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.nombre.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
          >
            Correo electrónico <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="nombre@ejemplo.com"
            aria-invalid={Boolean(errors.email)}
            className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
            {...register('email')}
          />
          {errors.email && (
            <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-telefono"
            className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
          >
            Teléfono o WhatsApp <span className="font-normal text-stone-500">(opcional)</span>
          </label>
          <input
            id="contact-telefono"
            type="tel"
            placeholder="Ej.: 0414-0000000"
            className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
            {...register('telefono')}
          />
        </div>

        <div>
          <label
            htmlFor="contact-organizacion"
            className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
          >
            Comunidad, institución o universidad{' '}
            <span className="font-normal text-stone-500">(opcional)</span>
          </label>
          <input
            id="contact-organizacion"
            type="text"
            placeholder="Ej.: Comunidad La Mesa, Alcaldía, Universidad..."
            className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
            {...register('organizacion')}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-asunto"
          className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
        >
          Asunto <span className="text-red-600">*</span>
        </label>
        <input
          id="contact-asunto"
          type="text"
          placeholder="Ej.: Solicitud de presentación institucional / Aporte técnico"
          aria-invalid={Boolean(errors.asunto)}
          className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
          {...register('asunto')}
        />
        {errors.asunto && (
          <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
            {errors.asunto.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-mensaje"
          className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
        >
          Mensaje <span className="text-red-600">*</span>
        </label>
        <textarea
          id="contact-mensaje"
          rows={5}
          placeholder="Escribí tu mensaje, consulta o propuesta de articulación..."
          aria-invalid={Boolean(errors.mensaje)}
          className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
          {...register('mensaje')}
        />
        {errors.mensaje && (
          <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
            {errors.mensaje.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id="contact-consent"
          type="checkbox"
          aria-invalid={Boolean(errors.consentimiento)}
          className="mt-1 h-4 w-4 rounded border-stone-300 text-paramo-700 focus:ring-2 focus:ring-paramo-600"
          {...register('consentimiento')}
        />
        <label
          htmlFor="contact-consent"
          className="text-xs sm:text-sm text-stone-700 dark:text-stone-300"
        >
          Acepto que mis datos de contacto se utilicen exclusivamente para responder a esta comunicación, de acuerdo con la{' '}
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

      <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
        <Send className="h-4 w-4" aria-hidden="true" />
        <span>{status === 'submitting' ? 'Enviando mensaje...' : 'Enviar mensaje'}</span>
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
          <div>
            <p className="font-bold">Mensaje recibido</p>
            <p className="mt-0.5">{serverMessage}</p>
          </div>
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
