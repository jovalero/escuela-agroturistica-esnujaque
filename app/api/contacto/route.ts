import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { dispatchSubmission } from '@/lib/submissions';
import { contactSchema, sanitizeText } from '@/lib/validations';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const rate = checkRateLimit(`contacto:${ip}`, 8, 60_000);

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
        message: 'Mensaje enviado.',
      });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Datos inválidos en el formulario.' },
        { status: 400 }
      );
    }

    const cleanPayload = {
      nombre: sanitizeText(parsed.data.nombre),
      email: sanitizeText(parsed.data.email),
      telefono: sanitizeText(parsed.data.telefono || ''),
      organizacion: sanitizeText(parsed.data.organizacion || ''),
      asunto: sanitizeText(parsed.data.asunto),
      mensaje: sanitizeText(parsed.data.mensaje),
      consentimiento: parsed.data.consentimiento,
    };

    const { deliveredVia } = await dispatchSubmission(
      'contacto',
      cleanPayload,
      `[Contacto Anteproyecto] ${cleanPayload.asunto} - ${cleanPayload.nombre}`
    );

    return NextResponse.json({
      ok: true,
      deliveredVia,
      message:
        '¡Tu mensaje fue enviado correctamente! Gracias por comunicarte con el equipo del anteproyecto.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Error al procesar el mensaje de contacto.' },
      { status: 500 }
    );
  }
}
