import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { dispatchSubmission } from '@/lib/submissions';
import { sanitizeText, suggestionSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const rate = checkRateLimit(`aportes:${ip}`, 8, 60_000);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Demasiados intentos en poco tiempo. Por favor esperá un minuto.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    if (body?.website && String(body.website).trim().length > 0) {
      return NextResponse.json({
        ok: true,
        message: 'Aporte registrado.',
      });
    }

    const parsed = suggestionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Datos inválidos en el formulario.' },
        { status: 400 }
      );
    }

    const cleanPayload = {
      nombre: sanitizeText(parsed.data.nombre || 'Anónimo'),
      sector: sanitizeText(parsed.data.sector),
      categoria: parsed.data.categoria,
      aporte: sanitizeText(parsed.data.aporte),
      consentimiento: parsed.data.consentimiento,
    };

    const { deliveredVia } = await dispatchSubmission(
      'aportes',
      cleanPayload,
      `[Buzón de Aportes] Sugerencia sobre ${cleanPayload.categoria} (${cleanPayload.sector})`
    );

    return NextResponse.json({
      ok: true,
      deliveredVia,
      message:
        '¡Gracias por tu aporte! Tu sugerencia fue registrada para ser considerada en la validación comunitaria del anteproyecto.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al procesar el aporte.' },
      { status: 500 }
    );
  }
}
