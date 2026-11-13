# Escuela Técnica Agroturística de La Mesa de Esnujaque — Sitio Oficial del Anteproyecto (2026)

Sitio web oficial del anteproyecto **«Propuesta educativa para el reconocimiento, protección y aprovechamiento responsable del patrimonio territorial como base del desarrollo sostenible de la comunidad»**, elaborado por el **Msc. José Ramón Valero** en la **Comunidad La Mesa de Esnujaque, Municipio Urdaneta, Estado Trujillo, República Bolivariana de Venezuela (2026)**.

> **Naturaleza del sitio:** Este portal presenta un **anteproyecto y propuesta inicial en consulta comunitaria**, sujeto a validación de la Asamblea de Ciudadanos y Ciudadanas y a estudios técnicos, jurídicos, registrales, históricos, ambientales, institucionales y económicos posteriores.

---

## 1. Requisitos y Cómo Correrlo Localmente

### Requisitos previos
- **Node.js** `18.18+` o `20+` / `22+` / `24+`
- **npm** `9+`

### Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno (opcional para desarrollo local)
cp .env.example .env.local

# 3. Iniciar servidor de desarrollo en http://localhost:3000
npm run dev
```

### Comandos de calidad, PDF y pruebas

```bash
# Regenerar el archivo /public/documento-completo.pdf a partir de los 21 capítulos Markdown
npm run generate:pdf

# Verificar reglas de ESLint
npm run lint

# Verificar tipos estrictos de TypeScript
npm run typecheck

# Compilar para producción (regenera el PDF y construye todas las rutas estáticas)
npm run build

# Ejecutar servidor de producción local
npm run start

# Ejecutar pruebas End-to-End automatizadas con Playwright
npm run test:e2e
```

---

## 2. Estructura del Proyecto

```text
PDS/
├── app/
│   ├── layout.tsx                    # Layout global (lang="es-VE", Header, Banner, Footer, JSON-LD)
│   ├── page.tsx                      # Home con las 10 secciones en el orden oficial
│   ├── resumen/page.tsx              # Resumen ejecutivo de 1 página (pendiente de aprobación del autor)
│   ├── documento/
│   │   ├── page.tsx                  # Índice general de los 21 capítulos + buscador instantáneo
│   │   ├── completo/page.tsx         # Versión de lectura continua optimizada para imprimir (@media print)
│   │   └── [slug]/
│   │       ├── page.tsx              # Página individual de cada capítulo (H1 único, TOC, A-/A+, progreso)
│   │       └── opengraph-image.tsx   # Imagen Open Graph dinámica por capítulo
│   ├── territorio/page.tsx           # Patrimonio territorial (Durí, lagunas, agro), mapa Leaflet y galería
│   ├── etapas/page.tsx               # Hoja de ruta visual (Etapas 1, 2, 3 y proyección de largo plazo)
│   ├── cronograma/page.tsx           # Cronograma de 6 meses (15 actividades) en tabla accesible + tarjetas móviles
│   ├── participa/page.tsx            # Encuesta comunitaria, buzón de aportes y convocatoria a asambleas
│   ├── autor/page.tsx                # Perfil de Msc. José Ramón Valero
│   ├── descargas/page.tsx            # Descarga del PDF completo, resumen ejecutivo y ficha informativa
│   ├── contacto/page.tsx             # Formulario de contacto y datos directos
│   ├── privacidad/page.tsx           # Política de privacidad y protección de datos comunitarios
│   ├── terminos/page.tsx             # Términos de uso y aclaratoria sobre el carácter de anteproyecto
│   └── api/                          # Endpoints con Zod, sanitización, honeypot y rate-limiting
│       ├── encuesta/route.ts
│       ├── aportes/route.ts
│       ├── contacto/route.ts
│       └── suscripcion/route.ts
├── components/
│   ├── layout/                       # Header.tsx, Footer.tsx, AnnouncementBanner.tsx, ThemeToggle.tsx
│   ├── ui/                           # Button, Section, Container, Card, Badge, Timeline, Accordion, Modal, Table, Quote, Toast, PhotoPlaceholder
│   ├── documento/                    # ChapterReader, ReadingProgressBar, TableOfContents, ShareButtons, ChapterNavigation, DocumentSearch
│   ├── territorio/                   # TerritoryMap, TerritoryMapClient, PhotoGallery
│   └── forms/                        # CommunitySurveyForm, SuggestionsForm, ContactForm, NewsletterForm
├── content/
│   ├── documento.md                  # Documento consolidado completo
│   └── documento/                    # Los 21 capítulos en archivos Markdown numerados (01 a 21)
├── data/
│   └── site.ts                       # Configuración centralizada del sitio (contacto, coordenadas, fotos, textos)
├── lib/                              # Lectura de capítulos, esquemas Zod, rate-limit, adaptadores y JSON-LD
├── public/
│   ├── documento-completo.pdf        # Documento completo en PDF listo para descargar
│   └── galeria/                      # Carpeta para subir fotos reales del territorio, liceo y comunidad
├── scripts/
│   └── generate-pdf.mjs              # Generador automático del PDF a partir de /content/documento/*.md
└── tests/
    └── e2e.spec.ts                   # Pruebas E2E con Playwright
```

---

## 3. Cómo Editar el Contenido y Completar Datos Pendientes

### A. Editar datos de contacto, coordenadas, biografía, fotos y anuncios (`/data/site.ts`)
Todo el contenido general del sitio está centralizado en **`/data/site.ts`**. Podés editarlo con cualquier editor de texto sin tocar componentes de React:
- **Contacto y redes:** Actualizá `siteConfig.contact.email`, `emailDisplay`, `whatsappNumber`, `whatsappDisplay` y `socialLinks`.
- **Banner de próxima asamblea:** En `siteConfig.announcementBanner`, cambiá `enabled: true/false` y actualizá la fecha y lugar en `text`.
- **Autor (`/autor`):** En `siteConfig.author`, completá `photoUrl` (ej. `'/galeria/autor.jpg'`), `academicProfile` y `trajectory`.
- **Coordenadas del mapa (`/territorio`):** En `siteConfig.location.coordinates` y `siteConfig.territoryPoints`, reemplazá las coordenadas aproximadas por las coordenadas GPS exactas de cada punto y cambiá `isApproximate: false`.
- **Fotos de la galería (`/public/galeria/`):** Copiá tus fotos reales dentro de `public/galeria/` y colocá su ruta (ej. `'/galeria/santuario-duri.jpg'`) en `siteConfig.galleryItems[i].imageUrl`. El componente reemplazará automáticamente el placeholder `[FOTO PENDIENTE]` por la imagen optimizada con `next/image`.

### B. Editar los capítulos del anteproyecto (`/content/documento/*.md`)
1. Abrí el archivo correspondiente dentro de `/content/documento/` (por ejemplo, `13-diagnostico-de-la-comunidad.md`).
2. Conservá el bloque superior de `frontmatter` (`order`, `slug`, `title`, `description`, `category`).
3. Usá `##` para títulos de sección (`H2`) y `###` para subtítulos (`H3`). No uses `#` (`H1`) dentro del cuerpo porque la plantilla del capítulo ya genera el `H1` principal con el título del capítulo.
4. Al guardar cambios o ejecutar `npm run build` (o `npm run generate:pdf`), el sitio y el archivo `/public/documento-completo.pdf` se actualizarán automáticamente.

---

## 4. Variables de Entorno (`.env.example`)

Los formularios (`/participa`, `/contacto` y suscripción del Footer) validan en cliente y servidor con **Zod**, incluyen **honeypot** y **rate limiting**, y soportan tres integraciones opcionales simultáneas:

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública de producción (ej. `https://escuela-agroturistica-esnujaque.vercel.app` o tu dominio propio). |
| `RESEND_API_KEY` | API Key de [Resend](https://resend.com) para recibir notificaciones por email cada vez que alguien complete la encuesta, el buzón o el formulario de contacto. |
| `CONTACT_RECEIVER_EMAIL` | Correo electrónico del autor o equipo donde llegarán los avisos de Resend. |
| `RESEND_FROM_EMAIL` | Remitente configurado en Resend (por defecto `Anteproyecto Esnujaque <onboarding@resend.dev>`). |
| `GOOGLE_SHEETS_WEBHOOK_URL` | URL de un Web App de Google Apps Script asociado a una hoja de cálculo de Google Sheets para guardar cada fila automáticamente. |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | Credenciales opcionales si preferís guardar respuestas en una tabla `participacion_comunitaria` de Supabase. |

### Cómo conectar Google Sheets en 3 minutos (sin costo)
1. Creá una hoja de cálculo en Google Sheets y abrí **Extensiones → Apps Script**.
2. Pegá este script mínimo:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([new Date(), data.type, JSON.stringify(data)]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
3. Hacé clic en **Implementar → Nueva implementación → Aplicación web** (Ejecutar como: *Yo*, Quién tiene acceso: *Cualquier persona*).
4. Copiá la URL generada y pegala en `GOOGLE_SHEETS_WEBHOOK_URL`.

---

## 5. Despliegue en Vercel (Paso a Paso)

1. **Subir el repositorio a GitHub:**
   ```bash
   git remote add origin https://github.com/TU_USUARIO/escuela-agroturistica-esnujaque.git
   git branch -M main
   git push -u origin main
   ```
2. **Importar en Vercel:**
   - Ingresá a [vercel.com/new](https://vercel.com/new) con tu cuenta de GitHub.
   - Seleccioná el repositorio `escuela-agroturistica-esnujaque` y hacé clic en **Import**.
   - Vercel detectará automáticamente **Next.js** (`Build Command: npm run build`, `Output Directory: .next`).
3. **Configurar Variables de Entorno:**
   - En la sección **Environment Variables**, agregá `NEXT_PUBLIC_SITE_URL` y, cuando las tengas listas, `RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL` y/o `GOOGLE_SHEETS_WEBHOOK_URL`.
4. **Deploy:**
   - Hacé clic en **Deploy**. En aproximadamente 1 minuto tendrás el sitio publicado en producción con HTTPS y CDN global.

### Cómo conectar un dominio propio en Vercel
1. Dentro de tu proyecto en Vercel, entrá a **Settings → Domains**.
2. Escribí tu dominio (por ejemplo, `escuelaagroturisticaesnujaque.org` o `.com`) y hacé clic en **Add**.
3. En el panel DNS de tu proveedor de dominio, agregá los dos registros que te indica Vercel:
   - Registro **A** para `@` apuntando a `76.76.21.21`
   - Registro **CNAME** para `www` apuntando a `cname.vercel-dns.com`
4. Vercel emitirá automáticamente el certificado SSL gratuito (Let's Encrypt) y actualizará el dominio principal.

---

## 6. Cómo Avisar de la Mudanza desde el Blog Antiguo de Blogger

Dado que el blog anterior (`https://escuela-agroturistica-trujillo.blogspot.com/`) está alojado en un subdominio `blogspot.com` (que no permite redirecciones HTTP 301 de servidor), recomendamos aplicar estos dos pasos en el panel de **Blogger**:

### Opción A: Banner destacado de mudanza al inicio de la entrada en Blogger
1. Entrá a [blogger.com](https://www.blogger.com), abrí la entrada publicada y pasá a la **Vista HTML**.
2. Pegá este bloque al principio de todo el contenido:
   ```html
   <div style="background:#1B4332;color:#ffffff;padding:24px;border-radius:14px;margin-bottom:28px;font-family:sans-serif;text-align:center;border:3px solid #DDA15E;">
     <p style="margin:0 0 8px 0;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#DDA15E;font-weight:bold;">
       Nuevo Sitio Oficial del Anteproyecto
     </p>
     <h2 style="margin:0 0 12px 0;font-size:22px;color:#ffffff;">
       Nos mudamos a una nueva plataforma web accesible y optimizada para celulares
     </h2>
     <p style="margin:0 0 18px 0;font-size:15px;line-height:1.5;color:#D8F3DC;">
       Consultá los 21 capítulos organizados por índice, descargá el PDF completo, explorá el mapa del territorio y participá en la encuesta comunitaria en nuestro nuevo portal oficial:
     </p>
     <a href="https://TU-NUEVO-DOMINIO.vercel.app" style="display:inline-block;background:#DDA15E;color:#0B1D15;font-weight:bold;padding:12px 24px;border-radius:10px;text-decoration:none;font-size:16px;">
       Ir al nuevo sitio oficial →
     </a>
   </div>
   ```

### Opción B: Redirección automática en el tema de Blogger (`<head>`)
Si deseás que cualquier visitante del blog antiguo sea redirigido automáticamente al nuevo sitio:
1. En Blogger, andá a **Tema → Personalizar (flecha desplegable) → Editar HTML**.
2. Justo debajo de la etiqueta `<head>`, agregá:
   ```html
   <link rel="canonical" href="https://TU-NUEVO-DOMINIO.vercel.app/" />
   <meta http-equiv="refresh" content="0; url=https://TU-NUEVO-DOMINIO.vercel.app/" />
   <script>
     window.location.replace("https://TU-NUEVO-DOMINIO.vercel.app/");
   </script>
   ```
3. Guardá los cambios.
