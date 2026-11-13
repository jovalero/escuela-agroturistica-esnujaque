import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { dispatchSubmission } from '@/lib/submissions';
import { newsletterSchema, sanitizeText } from '@/lib/validations';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const rate = checkRateLimit(`suscripcion:${ip}`, 8, 60_000);

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
        message: 'Suscripción registrada.',
      });
    }

    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Correo inválido.' },
        { status: 400 }
      );
    }

    const cleanPayload = {
      email: sanitizeText(parsed.data.email),
      consentimiento: parsed.data.consentimiento,
    };

    const { deliveredVia } = await dispatchSubmission(
      'suscripcion',
      cleanPayload,
      `[Novedades Anteproyecto] Nueva suscripción: ${cleanPayload.email}`
    );

    return NextResponse.json({
      ok: true,
      deliveredVia,
      message:
        '¡Gracias! Te mantendremos informado sobre las asambleas y avances del anteproyecto.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al procesar la suscripción.' },
      { status: 500 }
    );
  }
}
