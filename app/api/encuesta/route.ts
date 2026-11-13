import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { dispatchSubmission } from '@/lib/submissions';
import { communitySurveySchema, sanitizeText } from '@/lib/validations';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const rate = checkRateLimit(`encuesta:${ip}`, 8, 60_000);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Demasiados intentos en poco tiempo. Por favor esperá un minuto.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Honeypot check
    if (body?.website && String(body.website).trim().length > 0) {
      return NextResponse.json({
        ok: true,
        message: 'Respuesta registrada.',
      });
    }

    const parsed = communitySurveySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || 'Datos inválidos en la encuesta.',
        },
        { status: 400 }
      );
    }

    const cleanPayload = {
      nombre: sanitizeText(parsed.data.nombre || 'Anónimo'),
      comunidadSector: sanitizeText(parsed.data.comunidadSector),
      rol: parsed.data.rol,
      areasInteres: parsed.data.areasInteres.map(sanitizeText),
      disponibilidad: parsed.data.disponibilidad,
      comentarios: sanitizeText(parsed.data.comentarios || ''),
      consentimiento: parsed.data.consentimiento,
    };

    const { deliveredVia } = await dispatchSubmission(
      'encuesta',
      cleanPayload,
      `[Encuesta Comunitaria] Participación desde ${cleanPayload.comunidadSector}`
    );

    return NextResponse.json({
      ok: true,
      deliveredVia,
      message:
        '¡Muchas gracias por participar! Tu respuesta fue registrada para el diagnóstico y validación comunitaria del anteproyecto.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al procesar la encuesta comunitaria.' },
      { status: 500 }
    );
  }
}
