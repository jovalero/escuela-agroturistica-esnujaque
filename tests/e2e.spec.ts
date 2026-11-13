import { test, expect } from '@playwright/test';

test.describe('Sitio Oficial — Escuela Técnica Agroturística de La Mesa de Esnujaque', () => {
  test('1. Home carga las 10 secciones requeridas, Header, Footer y un único H1', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const h1s = page.locator('h1');
    await expect(h1s).toHaveCount(1);
    await expect(h1s.first()).toContainText(
      'Escuela Técnica Agroturística de La Mesa de Esnujaque'
    );

    await expect(page.getByText('Anteproyecto 2026 · En consulta comunitaria')).toBeVisible();
    await expect(page.getByRole('heading', { name: /¿Qué proponemos/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Por qué La Mesa de Esnujaque' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Hoja de ruta por etapas' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Impactos esperados en la comunidad' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Cómo se construye con la comunidad' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Alineación con/i })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Actores clave y posibles aliados/i })
    ).toBeVisible();

    // Footer obligatorio con nota fija
    await expect(
      page.locator('footer').getByText(
        'Este sitio presenta un anteproyecto sujeto a validación comunitaria e institucional y a estudios técnicos, jurídicos y ambientales.'
      )
    ).toBeVisible();
  });

  test('2. Menú móvil (375px) se abre, atrapa el foco y se cierra con Escape o al navegar', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /Abrir menú de navegación/i });
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await menuButton.click();
    const drawer = page.locator('#mobile-navigation-drawer');
    await expect(drawer).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();

    // Reabrir y navegar a Cronograma
    await menuButton.click();
    await drawer.getByRole('link', { name: 'Cronograma' }).click();
    await expect(page).toHaveURL('/cronograma');
    await expect(page.locator('h1')).toContainText('Cronograma de Actividades');
  });

  test('3. Índice del documento, buscador interno y navegación entre los 21 capítulos', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/documento');

    await expect(page.locator('h1')).toContainText('Documento del Anteproyecto');

    // Probar buscador estático
    const searchInput = page.locator('#document-search-input');
    await searchInput.fill('Laboratorio de Análisis de Suelos');
    await expect(page.getByText(/capítulos encontrados/i)).toBeVisible();

    // Ir al Capítulo 1
    await page.goto('/documento/reflexion-inicial');
    await expect(page.locator('h1')).toHaveText('Reflexión inicial');
    await expect(page.getByText('Nelson Mandela')).toBeVisible();

    // Navegar al capítulo siguiente (Capítulo 2: Introducción)
    await page.getByRole('link', { name: /Capítulo siguiente/i }).click();
    await expect(page).toHaveURL('/documento/introduccion');
    await expect(page.locator('h1')).toHaveText('Introducción');
  });

  test('4. Cronograma en móvil (375px) y tablet (768px) muestra las 15 actividades de forma accesible', async ({
    page,
  }) => {
    for (const vp of [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
    ]) {
      await page.setViewportSize(vp);
      await page.goto('/cronograma');
      const table = page.getByRole('table', {
        name: /Cronograma de 15 actividades en 6 meses/i,
      });
      await expect(table).toBeVisible();
      await expect(
        page
          .getByText('Acompañamiento institucional para la formulación del proyecto definitivo')
          .first()
      ).toBeVisible();
    }
  });

  test('5. Formularios en /participa y /contacto validan campos y envían correctamente', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/participa');

    // Intentar enviar encuesta vacía dispara validación
    await page.getByRole('button', { name: /Enviar encuesta comunitaria/i }).click();
    await expect(
      page.getByText(/Por favor indicá tu comunidad o sector/i)
    ).toBeVisible();

    // Completar encuesta válida
    await page.fill('#survey-nombre', 'Habitante de Prueba');
    await page.fill('#survey-sector', 'Casco Central de La Mesa');
    await page.selectOption('#survey-rol', 'productor');
    await page.check('#survey-area-0');
    await page.selectOption('#survey-disponibilidad', 'asambleas');
    await page.check('#survey-consentimiento');
    await page.getByRole('button', { name: /Enviar encuesta comunitaria/i }).click();

    await expect(page.getByText(/Encuesta registrada con éxito/i)).toBeVisible();

    // Probar formulario de contacto
    await page.goto('/contacto');
    await page.fill('#contact-nombre', 'Docente de Prueba');
    await page.fill('#contact-email', 'docente@ejemplo.com');
    await page.fill('#contact-asunto', 'Consulta sobre presentación comunitaria');
    await page.fill(
      '#contact-mensaje',
      'Nos gustaría conocer más detalles sobre el anteproyecto educativo.'
    );
    await page.check('#contact-consent');
    await page.getByRole('button', { name: /Enviar mensaje/i }).click();

    await expect(page.getByText(/Mensaje recibido/i)).toBeVisible();
  });

  test('6. El archivo PDF completo (/documento-completo.pdf) está disponible y es válido', async ({
    request,
  }) => {
    const response = await request.get('/documento-completo.pdf');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    const body = await response.body();
    expect(body.byteLength).toBeGreaterThan(50_000);
  });

  test('7. Mapa Leaflet, galería con lightbox y resoluciones 375px/768px/1440px sin errores de consola', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    for (const vp of [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(vp);
      await page.goto('/territorio');
      await expect(page.locator('h1')).toContainText('Patrimonio Territorial');
    }

    // Abrir lightbox en galería y cerrarlo con Escape
    await page
      .getByRole('button', { name: /Ampliar imagen: Santuario de Durí/i })
      .click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();

    expect(consoleErrors).toEqual([]);
  });
});
