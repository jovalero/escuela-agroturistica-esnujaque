import { z } from 'zod';

export function sanitizeText(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim();
}

export const surveyRoles = [
  { value: 'estudiante', label: 'Estudiante' },
  { value: 'docente', label: 'Docente / Educador(a)' },
  { value: 'productor', label: 'Productor(a) agrícola' },
  { value: 'emprendedor', label: 'Emprendedor(a) / Prestador(a) turístico' },
  { value: 'representante_comunitario', label: 'Representante comunitario / vocero(a)' },
  { value: 'otro', label: 'Habitante / Otro rol' },
] as const;

export const trainingAreas = [
  'Agricultura sostenible y agroecología',
  'Laboratorio y análisis de suelos',
  'Turismo rural y agroturismo',
  'Conservación ambiental y recursos hídricos',
  'Agroindustria y transformación de alimentos',
  'Emprendimiento comunitario e investigación',
] as const;

export const availabilityOptions = [
  { value: 'asambleas', label: 'Asistir a las asambleas de ciudadanos y ciudadanas' },
  { value: 'comision_tecnica', label: 'Integrar o apoyar la Comisión Técnica Comunitaria' },
  { value: 'talleres_formacion', label: 'Participar como estudiante o facilitador en talleres' },
  { value: 'apoyo_difusion', label: 'Apoyar en difusión y organización comunitaria' },
  { value: 'informado', label: 'Recibir información sobre los avances del anteproyecto' },
] as const;

export const communitySurveySchema = z.object({
  nombre: z.string().max(100, 'Máximo 100 caracteres').optional().or(z.literal('')),
  comunidadSector: z
    .string()
    .min(2, 'Por favor indicá tu comunidad o sector (ej. La Mesa, Durí, Chipuén)')
    .max(120, 'Máximo 120 caracteres'),
  rol: z.enum(
    ['estudiante', 'docente', 'productor', 'emprendedor', 'representante_comunitario', 'otro'],
    {
      errorMap: () => ({ message: 'Seleccioná el rol con el que te identificás' }),
    }
  ),
  areasInteres: z
    .array(z.string())
    .min(1, 'Seleccioná al menos un área de formación de tu interés'),
  disponibilidad: z.enum(
    ['asambleas', 'comision_tecnica', 'talleres_formacion', 'apoyo_difusion', 'informado'],
    {
      errorMap: () => ({ message: 'Seleccioná tu disponibilidad para participar' }),
    }
  ),
  comentarios: z.string().max(1500, 'Máximo 1500 caracteres').optional().or(z.literal('')),
  consentimiento: z.literal(true, {
    errorMap: () => ({
      message:
        'Debés aceptar el uso comunitario y estadístico de los datos conforme a la Política de Privacidad',
    }),
  }),
  website: z.string().max(0).optional().or(z.literal('')),
});

export type CommunitySurveyInput = z.infer<typeof communitySurveySchema>;

export const suggestionSchema = z.object({
  nombre: z.string().max(100, 'Máximo 100 caracteres').optional().or(z.literal('')),
  sector: z
    .string()
    .min(2, 'Indicá tu sector o institución')
    .max(120, 'Máximo 120 caracteres'),
  categoria: z.enum(
    ['educacion', 'agricultura', 'turismo', 'ambiente', 'infraestructura', 'otro'],
    {
      errorMap: () => ({ message: 'Seleccioná una categoría para tu aporte' }),
    }
  ),
  aporte: z
    .string()
    .min(15, 'Tu sugerencia o aporte debe tener al menos 15 caracteres')
    .max(2000, 'Máximo 2000 caracteres'),
  consentimiento: z.literal(true, {
    errorMap: () => ({
      message: 'Debés autorizar el tratamiento de tu sugerencia para el diagnóstico comunitario',
    }),
  }),
  website: z.string().max(0).optional().or(z.literal('')),
});

export type SuggestionInput = z.infer<typeof suggestionSchema>;

export const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, 'Ingresá tu nombre completo')
    .max(100, 'Máximo 100 caracteres'),
  email: z.string().email('Ingresá un correo electrónico válido'),
  telefono: z.string().max(40, 'Máximo 40 caracteres').optional().or(z.literal('')),
  organizacion: z.string().max(120, 'Máximo 120 caracteres').optional().or(z.literal('')),
  asunto: z
    .string()
    .min(4, 'Indicá un asunto breve')
    .max(150, 'Máximo 150 caracteres'),
  mensaje: z
    .string()
    .min(10, 'El mensaje debe contener al menos 10 caracteres')
    .max(2000, 'Máximo 2000 caracteres'),
  consentimiento: z.literal(true, {
    errorMap: () => ({
      message: 'Debés aceptar la Política de Privacidad para enviar tu mensaje',
    }),
  }),
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email('Ingresá un correo electrónico válido'),
  consentimiento: z.literal(true, {
    errorMap: () => ({
      message: 'Aceptá la Política de Privacidad para suscribirte',
    }),
  }),
  website: z.string().max(0).optional().or(z.literal('')),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
