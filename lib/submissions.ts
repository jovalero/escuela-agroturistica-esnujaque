import fs from 'node:fs';
import path from 'node:path';
import { Resend } from 'resend';

export async function dispatchSubmission(
  type: 'encuesta' | 'aportes' | 'contacto' | 'suscripcion',
  payload: Record<string, unknown>,
  emailSubject: string
): Promise<{ deliveredVia: string[] }> {
  const deliveredVia: string[] = [];
  const record = {
    id: `${type}-${Date.now()}`,
    type,
    createdAt: new Date().toISOString(),
    ...payload,
  };

  // 1. Google Sheets Webhook (si está configurado)
  const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheetsWebhook) {
    try {
      const res = await fetch(sheetsWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (res.ok) deliveredVia.push('google-sheets');
    } catch {
      // Continuar con otros adaptadores
    }
  }

  // 2. Supabase REST API (si está configurado)
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/participacion_comunitaria`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          tipo: type,
          datos: payload,
          created_at: record.createdAt,
        }),
      });
      if (res.ok) deliveredVia.push('supabase');
    } catch {
      // Continuar con otros adaptadores
    }
  }

  // 3. Resend Email Notification (si está configurado)
  const resendApiKey = process.env.RESEND_API_KEY;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || 'Anteproyecto Esnujaque <onboarding@resend.dev>';

  if (resendApiKey && receiverEmail) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: fromEmail,
        to: receiverEmail,
        subject: emailSubject,
        text: JSON.stringify(record, null, 2),
      });
      deliveredVia.push('resend');
    } catch {
      // Continuar con respaldo local
    }
  }

  // 4. Respaldo local en desarrollo (cuando aún no hay credenciales externas)
  try {
    const dir = path.join(process.cwd(), 'data', 'submissions');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, `${type}.json`);
    const existing = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      : [];
    existing.push(record);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
    deliveredVia.push('local-storage');
  } catch {
    // En entornos serverless de solo lectura (Vercel), ignorar escritura en disco
    if (deliveredVia.length === 0) {
      deliveredVia.push('validated-demo-mode');
    }
  }

  return { deliveredVia };
}
