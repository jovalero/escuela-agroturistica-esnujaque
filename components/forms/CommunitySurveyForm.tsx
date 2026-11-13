'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, ClipboardCheck } from 'lucide-react';
import {
  availabilityOptions,
  communitySurveySchema,
  surveyRoles,
  trainingAreas,
  type CommunitySurveyInput,
} from '@/lib/validations';
import { Button } from '@/components/ui/Button';

export function CommunitySurveyForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommunitySurveyInput>({
    resolver: zodResolver(communitySurveySchema),
    defaultValues: {
      nombre: '',
      comunidadSector: '',
      rol: undefined,
      areasInteres: [],
      disponibilidad: undefined,
      comentarios: '',
      consentimiento: undefined,
      website: '',
    },
  });

  const onSubmit = async (data: CommunitySurveyInput) => {
    setStatus('submitting');
    setServerMessage('');

    try {
      const res = await fetch('/api/encuesta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus('error');
        setServerMessage(json.error || 'No se pudo registrar tu encuesta.');
        return;
      }

      setStatus('success');
      setServerMessage(
        json.message ||
          '¡Muchas gracias por participar! Tu respuesta fue registrada para el diagnóstico y validación comunitaria del anteproyecto.'
      );
      reset();
    } catch {
      setStatus('error');
      setServerMessage('Error de conexión al enviar la encuesta. Intentá nuevamente.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark p-6 sm:p-8 shadow-sm"
    >
      {/* Honeypot anti-spam */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="survey-website">Dejá este campo vacío</label>
        <input
          id="survey-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Nombre (Opcional) */}
        <div>
          <label
            htmlFor="survey-nombre"
            className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
          >
            Nombre y apellido <span className="font-normal text-stone-500">(opcional)</span>
          </label>
          <input
            id="survey-nombre"
            type="text"
            placeholder="Ej.: María Pérez"
            className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
            {...register('nombre')}
          />
          {errors.nombre && (
            <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/* Comunidad o Sector */}
        <div>
          <label
            htmlFor="survey-sector"
            className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
          >
            Comunidad o sector <span className="text-red-600">*</span>
          </label>
          <input
            id="survey-sector"
            type="text"
            required
            placeholder="Ej.: Casco central de La Mesa, Durí, Chipuén..."
            aria-invalid={Boolean(errors.comunidadSector)}
            aria-describedby={errors.comunidadSector ? 'survey-sector-error' : undefined}
            className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
            {...register('comunidadSector')}
          />
          {errors.comunidadSector && (
            <p
              id="survey-sector-error"
              role="alert"
              className="mt-1 text-xs font-medium text-red-600 dark:text-red-400"
            >
              {errors.comunidadSector.message}
            </p>
          )}
        </div>
      </div>

      {/* Rol en la comunidad */}
      <div>
        <label
          htmlFor="survey-rol"
          className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
        >
          ¿Con qué rol te identificás en la comunidad? <span className="text-red-600">*</span>
        </label>
        <select
          id="survey-rol"
          defaultValue=""
          aria-invalid={Boolean(errors.rol)}
          aria-describedby={errors.rol ? 'survey-rol-error' : undefined}
          className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
          {...register('rol')}
        >
          <option value="" disabled>
            Seleccioná una opción...
          </option>
          {surveyRoles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
        {errors.rol && (
          <p
            id="survey-rol-error"
            role="alert"
            className="mt-1 text-xs font-medium text-red-600 dark:text-red-400"
          >
            {errors.rol.message}
          </p>
        )}
      </div>

      {/* Interés en áreas de formación */}
      <fieldset>
        <legend className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
          ¿Qué áreas de formación técnica considerás más prioritarias para La Mesa de Esnujaque?{' '}
          <span className="text-red-600">*</span>
        </legend>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {trainingAreas.map((area, index) => {
            const id = `survey-area-${index}`;
            return (
              <label
                key={area}
                htmlFor={id}
                className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-stone-200 dark:border-paramo-800 bg-papel/60 dark:bg-paramo-900/30 p-3 text-xs sm:text-sm text-stone-800 dark:text-stone-200 hover:border-paramo-400"
              >
                <input
                  id={id}
                  type="checkbox"
                  value={area}
                  className="mt-0.5 h-4 w-4 rounded border-stone-300 text-paramo-700 focus:ring-2 focus:ring-paramo-600"
                  {...register('areasInteres')}
                />
                <span>{area}</span>
              </label>
            );
          })}
        </div>
        {errors.areasInteres && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
            {errors.areasInteres.message}
          </p>
        )}
      </fieldset>

      {/* Disponibilidad para participar */}
      <div>
        <label
          htmlFor="survey-disponibilidad"
          className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
        >
          ¿Cómo te gustaría participar en el proceso del anteproyecto?{' '}
          <span className="text-red-600">*</span>
        </label>
        <select
          id="survey-disponibilidad"
          defaultValue=""
          aria-invalid={Boolean(errors.disponibilidad)}
          aria-describedby={errors.disponibilidad ? 'survey-disp-error' : undefined}
          className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
          {...register('disponibilidad')}
        >
          <option value="" disabled>
            Seleccioná tu disponibilidad...
          </option>
          {availabilityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.disponibilidad && (
          <p
            id="survey-disp-error"
            role="alert"
            className="mt-1 text-xs font-medium text-red-600 dark:text-red-400"
          >
            {errors.disponibilidad.message}
          </p>
        )}
      </div>

      {/* Comentarios adicionales */}
      <div>
        <label
          htmlFor="survey-comentarios"
          className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-1.5"
        >
          Observaciones, ideas o necesidades de tu sector{' '}
          <span className="font-normal text-stone-500">(opcional)</span>
        </label>
        <textarea
          id="survey-comentarios"
          rows={4}
          placeholder="Compartí tus ideas sobre la formación técnica, el Laboratorio de Suelos, la conservación de las lagunas o las necesidades productivas..."
          className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
          {...register('comentarios')}
        />
        {errors.comentarios && (
          <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
            {errors.comentarios.message}
          </p>
        )}
      </div>

      {/* Consentimiento explícito de privacidad */}
      <div className="rounded-xl bg-stone-100/80 dark:bg-paramo-900/50 border border-stone-200 dark:border-paramo-800 p-4">
        <div className="flex items-start gap-2.5">
          <input
            id="survey-consentimiento"
            type="checkbox"
            aria-invalid={Boolean(errors.consentimiento)}
            className="mt-1 h-4 w-4 rounded border-stone-300 text-paramo-700 focus:ring-2 focus:ring-paramo-600"
            {...register('consentimiento')}
          />
          <label
            htmlFor="survey-consentimiento"
            className="text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300"
          >
            <strong>Consentimiento informado:</strong> Autorizo de forma voluntaria que mis respuestas sean utilizadas únicamente con fines estadísticos, académicos y de diagnóstico comunitario para el anteproyecto «Escuela Técnica Agroturística de La Mesa de Esnujaque», conforme a la{' '}
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
          <p role="alert" className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
            {errors.consentimiento.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
        <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
        <span>
          {status === 'submitting' ? 'Enviando respuesta...' : 'Enviar encuesta comunitaria'}
        </span>
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
            <p className="font-bold">Encuesta registrada con éxito</p>
            <p className="mt-0.5 text-xs sm:text-sm">{serverMessage}</p>
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
