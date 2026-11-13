export interface NavItem {
  label: string;
  href: string;
}

export interface TerritoryPoint {
  id: string;
  name: string;
  category: 'Patrimonio Natural' | 'Patrimonio Cultural' | 'Infraestructura' | 'Proyección Futura';
  description: string;
  lat: number;
  lng: number;
  isApproximate: boolean;
  photoPlaceholder: string;
  imagePath?: string;
}

export interface CronogramaActivity {
  id: number;
  activity: string;
  phase: string;
  months: [boolean, boolean, boolean, boolean, boolean, boolean];
}

export const siteConfig = {
  name: 'Escuela Técnica Agroturística de La Mesa de Esnujaque',
  shortName: 'ETA La Mesa de Esnujaque',
  logo: {
    emblem: '/brand/logo-emblema.png',
    full: '/brand/logo-completo.png',
    alt: 'Emblema de La Mesa de Esnujaque',
  },
  documentTitle:
    'Propuesta educativa para el reconocimiento, protección y aprovechamiento responsable del patrimonio territorial como base del desarrollo sostenible de la comunidad',
  author: {
    name: 'Msc. José Ramón Valero',
    role: 'Autor y promotor del anteproyecto educativo y comunitario',
    location: 'La Mesa de Esnujaque, Municipio Urdaneta, Estado Trujillo, Venezuela',
    photoPlaceholder: 'Retrato de Msc. José Ramón Valero',
    photoUrl: '',
    shortBio:
      'Autor de la propuesta educativa para la creación progresiva de la Escuela Técnica Agroturística de La Mesa de Esnujaque, orientada a articular educación técnica, agricultura sostenible, turismo rural, conservación ambiental y participación comunitaria.',
    academicProfile: [
      'Magíster Scientiarum (Msc.) en Educación y Desarrollo Rural',
      'Licenciatura en Educación con trayectoria en docencia e investigación comunitaria',
    ],
    trajectory: [
      'Trayectoria docente, académica y comunitaria vinculada al Municipio Urdaneta y al Estado Trujillo.',
      'Formulación del Anteproyecto «Escuela Técnica Agroturística de La Mesa de Esnujaque» (2026), puesto a disposición de la comunidad organizada y de las instituciones competentes para su análisis y validación.',
    ],
    visionStatement:
      'El futuro de una comunidad comienza a construirse cuando sus habitantes comprenden que la educación y los valores constituyen su patrimonio más valioso. La familia forma el carácter; la escuela fortalece el conocimiento; y la comunidad transforma ese aprendizaje en acciones que promueven el bienestar colectivo y el desarrollo sostenible.',
  },
  location: {
    community: 'Comunidad La Mesa de Esnujaque',
    municipality: 'Municipio Urdaneta',
    state: 'Estado Trujillo',
    country: 'República Bolivariana de Venezuela',
    fullLabel:
      'Comunidad La Mesa de Esnujaque, Municipio Urdaneta, Estado Trujillo, República Bolivariana de Venezuela',
    // Coordenadas geográficas de referencia aproximada del centro poblado de La Mesa de Esnujaque
    coordinates: {
      lat: 9.0389,
      lng: -70.7086,
      zoom: 14,
      note: 'Coordenadas aproximadas de referencia del casco de La Mesa de Esnujaque [COMPLETAR coordenadas exactas de cada punto]',
    },
  },
  year: 2026,
  statusBadge: 'Anteproyecto 2026 · En consulta comunitaria',
  legalDisclaimer:
    'Este sitio presenta un anteproyecto sujeto a validación comunitaria e institucional y a estudios técnicos, jurídicos y ambientales.',
  detailedDisclaimer:
    'Naturaleza del documento: Anteproyecto y propuesta inicial sujeta a validación comunitaria y a estudios técnicos, jurídicos, registrales, ambientales, institucionales y económicos posteriores. Ninguna de las alternativas o proyecciones aquí descritas implica compromisos ya asumidos por instituciones ni afirmaciones sobre titularidad de inmuebles.',
  closingQuote:
    "Porque el futuro no se espera; se construye. ¡Vamos pa'lante, porque pa'lante es pa' allá!",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://escuelaagroturisticaesnujaque.vercel.app',
  oldBlogUrl: 'https://escuela-agroturistica-trujillo.blogspot.com/',
  pdfUrl: '/documento-completo.pdf',
  heroPhoto: {
    src: '/galeria/panoramica-la-mesa.jpg',
    label: 'Panorámica de La Mesa de Esnujaque',
    alt: 'Plaza, iglesia y montañas de la comunidad La Mesa de Esnujaque, Municipio Urdaneta, Estado Trujillo',
    caption: 'Plaza Bolívar e iglesia de La Mesa de Esnujaque, con las montañas andinas de fondo · Trujillo, Venezuela.',
  },

  // Banner de anuncio opcional (activable para convocar asambleas comunitarias)
  announcementBanner: {
    enabled: false,
    badge: 'Convocatoria Comunitaria',
    text: 'Próxima asamblea de socialización y validación comunitaria en La Mesa de Esnujaque.',
    ctaLabel: 'Participar y dejar aportes',
    ctaHref: '/participa',
  },

  // Datos de contacto institucional y comunitario
  contact: {
    email: '',
    emailDisplay: '',
    privacyEmailDisplay: '',
    whatsappNumber: '',
    whatsappDisplay: '',
    address: 'Comunidad La Mesa de Esnujaque, Municipio Urdaneta, Estado Trujillo, Venezuela',
    socialLinks: [
      {
        name: 'WhatsApp',
        url: 'https://wa.me/?text=Conoc%C3%A9%20el%20Anteproyecto%20Escuela%20T%C3%A9cnica%20Agrotur%C3%ADstica%20de%20La%20Mesa%20de%20Esnujaque%20https%3A%2F%2Fescuelaagroturisticaesnujaque.vercel.app',
        placeholder: 'Compartir anteproyecto por WhatsApp',
      },
    ],
  },

  // Navegación principal en Header (4 enlaces principales requeridos)
  navigation: [
    { label: 'Resumen', href: '/resumen' },
    { label: 'Territorio', href: '/territorio' },
    { label: 'Etapas', href: '/etapas' },
    { label: 'Documento', href: '/documento' },
  ] satisfies NavItem[],

  // Enlaces del menú desplegable "Más ▾"
  moreNavigation: [
    { label: 'Cronograma', href: '/cronograma' },
    { label: 'Autor', href: '/autor' },
    { label: 'Contacto', href: '/contacto' },
  ] satisfies NavItem[],

  // Todos los enlaces del sitio (para navegación móvil completa y footer)
  allNavigation: [
    { label: 'Inicio', href: '/' },
    { label: 'Resumen', href: '/resumen' },
    { label: 'Territorio', href: '/territorio' },
    { label: 'Etapas', href: '/etapas' },
    { label: 'Documento', href: '/documento' },
    { label: 'Cronograma', href: '/cronograma' },
    { label: 'Autor', href: '/autor' },
    { label: 'Contacto', href: '/contacto' },
  ] satisfies NavItem[],

  // 4 Pilares de la sección "¿Qué proponemos?"
  pillars: [
    {
      title: 'Educación técnica',
      description:
        'Formación articulada con la realidad local en agroecología, análisis de suelos, agroindustria, gestión turística, emprendimiento e investigación aplicada.',
      iconName: 'GraduationCap',
    },
    {
      title: 'Agricultura sostenible',
      description:
        'Manejo responsable del suelo, uso eficiente del agua, diversificación productiva, parcelas demostrativas y transferencia de conocimientos junto a los productores.',
      iconName: 'Sprout',
    },
    {
      title: 'Turismo rural',
      description:
        'Valoración del paisaje andino, agroturismo, interpretación ambiental y cultural, rutas comunitarias y fortalecimiento de servicios locales bajo criterios de sostenibilidad.',
      iconName: 'Compass',
    },
    {
      title: 'Conservación ambiental',
      description:
        'Protección de cuencas hidrográficas y fuentes hídricas, viveros forestales, recuperación de áreas degradadas y educación ambiental transversal.',
      iconName: 'Trees',
    },
  ],

  // 4 impactos esperados en la comunidad (concisos y directos, reducidos a una frase cada uno)
  impacts: [
    {
      id: 'jovenes',
      title: 'Oportunidades para los jóvenes',
      summary:
        'Que los muchachos de La Mesa puedan formarse como técnicos sin tener que marcharse a la ciudad.',
      badge: 'Arraigo local',
    },
    {
      id: 'productores',
      title: 'Apoyo a los productores del campo',
      summary:
        'Asistencia técnica, análisis de fertilidad de suelos y mejores prácticas para cuidar la tierra y los cultivos.',
      badge: 'Producción sostenible',
    },
    {
      id: 'turismo',
      title: 'Turismo rural y patrimonio',
      summary:
        'Rutas de montaña, posadas y gastronomía típica gestionadas con respeto por las fuentes hídricas y el paisaje.',
      badge: 'Patrimonio y servicios',
    },
    {
      id: 'comunidad',
      title: 'Trabajo y desarrollo local',
      summary:
        'Nuevas fuentes de empleo para familias del pueblo y mayor cohesión comunitaria alrededor de la educación técnica.',
      badge: 'Bienestar colectivo',
    },
  ],

  // Hoja de ruta: Las 3 etapas de las Conclusiones + Proyección de largo plazo
  roadmapStages: [
    {
      stage: 'Etapa 1',
      title: 'Transformación progresiva del liceo y evaluación del Laboratorio de Suelos',
      subtitle: 'Aprovechamiento de la infraestructura educativa existente',
      description:
        'Propone estudiar la transformación progresiva del actual liceo en una Escuela Técnica Agroturística, incorporando formación en agricultura sostenible, turismo rural, conservación ambiental y agroindustria. Como complemento, plantea evaluar parte de la infraestructura de la sede de la Fundación del Niño para la posible instalación de un Laboratorio de Análisis de Suelos destinado a la formación práctica, investigación y asistencia técnica a estudiantes y productores.',
      condition:
        'Sujeta a evaluación previa de viabilidad técnica, jurídica, funcional, económica e institucional por parte de los organismos competentes.',
      highlights: [
        'Aprovechamiento eficiente de instalaciones educativas ya existentes en la comunidad.',
        'Evaluación técnica y jurídica de espacios en la sede de la Fundación del Niño para un posible Laboratorio de Análisis de Suelos.',
        'Implementación progresiva con menores requerimientos iniciales de inversión en obra nueva.',
      ],
    },
    {
      stage: 'Etapa 2',
      title: 'Conformación de una Comisión Técnica Comunitaria',
      subtitle: 'Evaluación integral, técnica y ambiental del lote en el sector Chipuén',
      description:
        'Propone integrar una Comisión Técnica Comunitaria con representantes de la comunidad, autoridades competentes y profesionales en hidrología, saneamiento ambiental, agronomía, ingeniería, turismo y conservación de recursos naturales para evaluar integralmente el lote de terreno ubicado en el sector Chipuén.',
      condition:
        'Los resultados se recogerían en un informe técnico que, tras ser considerado por la Asamblea de Ciudadanos y Ciudadanas, podrá incorporarse como antecedente técnico y ambiental del anteproyecto.',
      highlights: [
        'Diagnóstico de las condiciones actuales del terreno e identificación de posibles afectaciones ambientales.',
        'Determinación de potencialidades y recomendaciones para su recuperación y conservación.',
        'Elaboración de informe técnico y acta comunitaria como respaldo transparente.',
      ],
    },
    {
      stage: 'Etapa 3',
      title: 'Investigación jurídica, registral e histórica',
      subtitle: 'Esclarecimiento previo de la condición legal del terreno en el sector Chipuén',
      description:
        'Recomienda promover una investigación jurídica, registral e histórica con profesionales del derecho especializados en materia agraria, administrativa y registral, a fin de determinar con precisión los antecedentes de propiedad, titularidad, delimitación y condición jurídica del inmueble ubicado en el sector Chipuén.',
      condition:
        'Evita que cualquier iniciativa de recuperación, conservación o aprovechamiento se adelante a la determinación objetiva de sus condiciones legales.',
      highlights: [
        'Análisis documental, registral e histórico riguroso sin asumir ni anticipar titularidad.',
        'Seguridad jurídica para la toma de decisiones futuras de la comunidad y las instituciones.',
        'Respeto estricto al marco constitucional y legal vigente.',
      ],
    },
    {
      stage: 'Proyección de largo plazo',
      title: 'Parque Agroturístico Comunitario y Centro de Prácticas',
      subtitle: 'Visión futura condicionada a estudios jurídicos, técnicos, ambientales y económicos',
      description:
        'Como segunda etapa de crecimiento de la Escuela Técnica Agroturística, y únicamente si los estudios jurídicos, registrales, técnicos, ambientales y económicos lo permiten, se proyecta un Parque Agroturístico Comunitario y Centro de Prácticas con parcelas demostrativas, viveros, conservación de suelos y fuentes de agua, agroindustria y experiencias de turismo educativo y rural.',
      condition:
        'Se plantea exclusivamente como una visión de desarrollo futuro a largo plazo, y no como una propuesta inmediata de ejecución.',
      highlights: [
        'Espacio práctico para estudiantes, productores y comunidad en agricultura sostenible y agroecología.',
        'Senderos de interpretación ambiental, viveros forestales y protección de fuentes hídricas.',
        'Articulación entre educación, producción, conservación del patrimonio y turismo responsable.',
      ],
    },
  ],

  // Fases de construcción con la comunidad (Metodología y desarrollo del anteproyecto)
  methodologyPhases: [
    {
      number: 'Fase I',
      title: 'Diagnóstico comunitario e investigación',
      description:
        'Revisión documental y bibliográfica, observación directa en el territorio y levantamiento de necesidades educativas, agrícolas, turísticas, ambientales y sociales de La Mesa de Esnujaque.',
    },
    {
      number: 'Fase II',
      title: 'Recolección y análisis participativo',
      description:
        'Aplicación de entrevistas y encuestas a habitantes, productores agrícolas, estudiantes, docentes y líderes comunitarios para identificar fortalezas, debilidades y oportunidades.',
    },
    {
      number: 'Fase III',
      title: 'Formulación y diseño de la propuesta',
      description:
        'Estructuración de objetivos, áreas de formación técnica, alternativas graduales de ejecución, componentes de sostenibilidad y redacción del anteproyecto.',
    },
    {
      number: 'Fase IV',
      title: 'Socialización y validación comunitaria',
      description:
        'Presentación del anteproyecto ante la Asamblea de Ciudadanos y Ciudadanas y espacios comunitarios para recibir observaciones, incorporar ajustes pertinentes y validar socialmente la iniciativa.',
    },
    {
      number: 'Fase V',
      title: 'Presentación y gestión institucional',
      description:
        'Presentación del anteproyecto validado ante la alcaldía, gobernación, Ministerio del Poder Popular para la Educación y organismos competentes para su evaluación técnica y acompañamiento.',
    },
  ],

  // Alineación con la Agenda 2030 (ODS mencionados en el Capítulo 10: 4, 8, 12, 13 y 15)
  sdgs: [
    {
      number: 'ODS 4',
      title: 'Educación de calidad',
      description:
        'Ampliar el acceso a una formación técnica pertinente, inclusiva y vinculada con las potencialidades reales del territorio rural andino.',
      color: '#C5192D',
    },
    {
      number: 'ODS 8',
      title: 'Trabajo decente y crecimiento económico',
      description:
        'Fomentar capacidades productivas, emprendimiento juvenil, turismo rural responsable y generación progresiva de empleos directos e indirectos.',
      color: '#A21942',
    },
    {
      number: 'ODS 12',
      title: 'Producción y consumo responsables',
      description:
        'Impulsar prácticas agrícolas sostenibles, manejo responsable de suelos, agua y residuos, y transformación agroindustrial con criterios de sostenibilidad.',
      color: '#BF8B2E',
    },
    {
      number: 'ODS 13',
      title: 'Acción por el clima',
      description:
        'Incorporar la educación ambiental, la reforestación con viveros comunitarios y la resiliencia de los sistemas agrícolas de montaña.',
      color: '#3F7E44',
    },
    {
      number: 'ODS 15',
      title: 'Vida de ecosistemas terrestres',
      description:
        'Proteger las cuencas hidrográficas, lagunas altoandinas, suelos agrícolas y biodiversidad del patrimonio natural de La Mesa de Esnujaque.',
      color: '#56C02B',
    },
  ],

  // Posibles aliados e instituciones (Capítulos 11 y 12, aclarando explícitamente "posibles aliados")
  allies: [
    {
      category: 'Núcleo Central',
      name: 'Comunidad Organizada de La Mesa de Esnujaque',
      role: 'Asamblea de Ciudadanos y Ciudadanas, consejos comunales, productores agrícolas, familias, docentes, estudiantes y emprendedores locales como protagonistas del proceso.',
    },
    {
      category: 'Instancias Municipales y Regionales',
      name: 'Alcaldía del Municipio Urdaneta y Gobernación del Estado Trujillo',
      role: 'Posibles instancias de articulación territorial, coordinación institucional, información local y acompañamiento en planificación dentro de sus competencias.',
    },
    {
      category: 'Rectoría Educativa',
      name: 'Ministerio del Poder Popular para la Educación',
      role: 'Instancia competente para evaluar la pertinencia académica, administrativa y técnica de la propuesta dentro del sistema educativo nacional.',
    },
    {
      category: 'Entes Técnicos Sectoriales',
      name: 'Organismos de Agricultura, Tierras, Turismo y Ambiente',
      role: 'Posibles aliados técnicos en capacitación agrícola, manejo del suelo, planificación de turismo rural, conservación de cuencas y evaluación ambiental.',
    },
    {
      category: 'Sector Académico y Científico',
      name: 'Universidades, Institutos Tecnológicos y Centros de Investigación',
      role: 'Posibles aliados estratégicos mediante convenios de asesoría especializada, análisis de suelos, extensión universitaria, investigación aplicada y formación.',
    },
    {
      category: 'Fondos Públicos Territoriales',
      name: 'Consejo Federal de Gobierno y Fondos de Desarrollo Territorial',
      role: 'Posibles instancias a evaluar en etapas posteriores, una vez validado el anteproyecto y definidos sus estudios técnicos y costos.',
    },
    {
      category: 'Cooperación Nacional e Internacional',
      name: 'Organismos como UNESCO, FAO y PNUD',
      role: 'Posibles aliados de cooperación técnica y fortalecimiento de capacidades en etapas posteriores, tras la validación comunitaria e institucional.',
    },
  ],

  // Patrimonio territorial y puntos para el mapa (/territorio)
  territoryPoints: [
    {
      id: 'casco-esnujaque',
      name: 'Comunidad La Mesa de Esnujaque',
      category: 'Patrimonio Cultural',
      description:
        'Asentamiento andino del municipio Urdaneta, estado Trujillo, caracterizado por sus paisajes de montaña, clima templado de altura, arquitectura tradicional y vocación agrícola.',
      lat: 9.0389,
      lng: -70.7086,
      isApproximate: true,
      photoPlaceholder: 'Panorámica de La Mesa de Esnujaque',
      imagePath: '/galeria/panoramica-la-mesa.jpg',
    },
    {
      id: 'santuario-duri',
      name: 'Santuario de Durí',
      category: 'Patrimonio Cultural',
      description:
        'Atractivo histórico, arquitectónico y espiritual mencionado en el anteproyecto como parte esencial del patrimonio cultural y turístico del territorio.',
      lat: 9.0445,
      lng: -70.7142,
      isApproximate: true,
      photoPlaceholder: 'Santuario de Durí y su entorno',
    },
    {
      id: 'laguna-estrella',
      name: 'Laguna de la Estrella',
      category: 'Patrimonio Natural',
      description:
        'Ecosistema lagunar altoandino y referente del patrimonio natural e hídrico de La Mesa de Esnujaque, cuya conservación y valoración educativa son prioritarias.',
      lat: 9.0265,
      lng: -70.7235,
      isApproximate: true,
      photoPlaceholder: 'Laguna de la Estrella',
    },
    {
      id: 'laguna-pozo-negro',
      name: 'Laguna de Pozo Negro',
      category: 'Patrimonio Natural',
      description:
        'Atractivo natural lagunar de montaña que integra la riqueza hídrica, paisajística y ecológica del territorio para la educación ambiental y el turismo responsable.',
      lat: 9.0218,
      lng: -70.719,
      isApproximate: true,
      photoPlaceholder: 'Laguna de Pozo Negro',
    },
    {
      id: 'tradicion-agricola',
      name: 'Valles y Terrazas de Tradición Agrícola',
      category: 'Patrimonio Cultural',
      description:
        'Unidades de producción agrícola familiar que sustentan la identidad productiva de La Mesa de Esnujaque y el vínculo histórico entre sus habitantes y la tierra.',
      lat: 9.0362,
      lng: -70.7045,
      isApproximate: true,
      photoPlaceholder: 'Cultivos y parcelas agrícolas',
    },
    {
      id: 'liceo-actual',
      name: 'Liceo Actual de la Comunidad (Etapa 1)',
      category: 'Infraestructura',
      description:
        'Infraestructura educativa existente cuya transformación progresiva en Escuela Técnica Agroturística se plantea como alternativa principal recomendada, junto con la evaluación de espacios en la sede de la Fundación del Niño para un posible Laboratorio de Análisis de Suelos.',
      lat: 9.0398,
      lng: -70.7078,
      isApproximate: true,
      photoPlaceholder: 'Instalaciones del liceo actual',
    },
    {
      id: 'sector-chipuen',
      name: 'Sector Chipuén (Sujeto a evaluación técnica y jurídica)',
      category: 'Proyección Futura',
      description:
        'Espacio contemplado para ser evaluado por una Comisión Técnica Comunitaria (Etapa 2) y mediante una investigación jurídica, registral e histórica (Etapa 3) antes de considerar cualquier eventual proyección de largo plazo.',
      lat: 9.0415,
      lng: -70.711,
      isApproximate: true,
      photoPlaceholder: 'Sector Chipuén',
    },
  ] satisfies TerritoryPoint[],

  // Galería de fotos (/territorio)
  galleryItems: [
    {
      id: 'gal-1',
      title: 'Centro poblado y entorno montañoso de La Mesa de Esnujaque',
      category: 'Patrimonio Cultural',
      alt: 'Plaza, iglesia y montañas de la comunidad La Mesa de Esnujaque en el municipio Urdaneta, estado Trujillo',
      placeholderLabel: 'Panorámica de La Mesa de Esnujaque',
      caption:
        'Arquitectura tradicional, vida comunitaria y paisajes de montaña que conforman el patrimonio territorial de La Mesa de Esnujaque.',
      imageUrl: '/galeria/panoramica-la-mesa.jpg',
    },
    {
      id: 'gal-2',
      title: 'Santuario de Durí',
      category: 'Patrimonio Cultural',
      alt: 'Santuario de Durí, referente cultural e histórico del territorio de La Mesa de Esnujaque',
      placeholderLabel: 'Santuario de Durí',
      caption:
        'El Santuario de Durí forma parte de los atractivos culturales e históricos destacados en el diagnóstico comunitario.',
      imageUrl: '',
    },
    {
      id: 'gal-3',
      title: 'Laguna de la Estrella',
      category: 'Paisajes y Lagunas',
      alt: 'Laguna de la Estrella, reservorio hídrico y ecosistema de alta montaña en La Mesa de Esnujaque',
      placeholderLabel: 'Laguna de la Estrella',
      caption:
        'La protección de las lagunas y fuentes hídricas es un eje transversal de la formación ambiental propuesta.',
      imageUrl: '',
    },
    {
      id: 'gal-4',
      title: 'Laguna de Pozo Negro',
      category: 'Paisajes y Lagunas',
      alt: 'Laguna de Pozo Negro en las montañas de La Mesa de Esnujaque, estado Trujillo',
      placeholderLabel: 'Laguna de Pozo Negro',
      caption:
        'Atractivo natural de alto valor ecológico y paisajístico para la educación ambiental y el turismo rural responsable.',
      imageUrl: '',
    },
    {
      id: 'gal-5',
      title: 'Tradición agrícola y productores locales',
      category: 'Agricultura y Comunidad',
      alt: 'Parcelas agrícolas y trabajo de los productores en La Mesa de Esnujaque',
      placeholderLabel: 'Cultivos y parcelas agrícolas',
      caption:
        'La tradición agrícola constituye uno de los principales elementos de identidad y sustento de las familias de la comunidad.',
      imageUrl: '',
    },
    {
      id: 'gal-6',
      title: 'Infraestructura educativa y participación comunitaria',
      category: 'Educación y Futuro',
      alt: 'Instalaciones educativas y espacios de encuentro comunitario en La Mesa de Esnujaque',
      placeholderLabel: 'Infraestructura educativa comunitaria',
      caption:
        'El anteproyecto prioriza el aprovechamiento progresivo de la infraestructura existente y la validación en asamblea comunitaria.',
      imageUrl: '',
    },
  ],

  // Las 15 actividades exactas del Cronograma de 6 meses (Capítulo 18)
  cronogramaActivities: [
    {
      id: 1,
      activity: 'Revisión bibliográfica y documental',
      phase: 'Fase I. Investigación y Diagnóstico',
      months: [true, true, false, false, false, false],
    },
    {
      id: 2,
      activity: 'Diagnóstico preliminar de la comunidad',
      phase: 'Fase I. Investigación y Diagnóstico',
      months: [true, true, false, false, false, false],
    },
    {
      id: 3,
      activity: 'Observación directa y levantamiento de información',
      phase: 'Fase I. Investigación y Diagnóstico',
      months: [true, true, false, false, false, false],
    },
    {
      id: 4,
      activity: 'Entrevistas a líderes comunitarios, productores y actores locales',
      phase: 'Fase I. Investigación y Diagnóstico',
      months: [false, true, true, false, false, false],
    },
    {
      id: 5,
      activity: 'Aplicación de encuestas a la población',
      phase: 'Fase I. Investigación y Diagnóstico',
      months: [false, true, true, false, false, false],
    },
    {
      id: 6,
      activity: 'Procesamiento y análisis de la información',
      phase: 'Fase II. Formulación de la Propuesta',
      months: [false, false, true, false, false, false],
    },
    {
      id: 7,
      activity: 'Identificación de necesidades y potencialidades comunitarias',
      phase: 'Fase II. Formulación de la Propuesta',
      months: [false, false, true, false, false, false],
    },
    {
      id: 8,
      activity: 'Elaboración de la propuesta de la Escuela Técnica Agroturística',
      phase: 'Fase II. Formulación de la Propuesta',
      months: [false, false, true, true, false, false],
    },
    {
      id: 9,
      activity: 'Redacción y estructuración del anteproyecto',
      phase: 'Fase II. Formulación de la Propuesta',
      months: [false, false, false, true, false, false],
    },
    {
      id: 10,
      activity: 'Revisión, corrección y adecuación del documento',
      phase: 'Fase II. Formulación de la Propuesta',
      months: [false, false, false, true, true, false],
    },
    {
      id: 11,
      activity: 'Presentación y socialización ante la Asamblea de Ciudadanos y Ciudadanas',
      phase: 'Fase III. Validación Comunitaria',
      months: [false, false, false, false, true, false],
    },
    {
      id: 12,
      activity: 'Incorporación de observaciones y ajustes al anteproyecto',
      phase: 'Fase III. Validación Comunitaria',
      months: [false, false, false, false, true, false],
    },
    {
      id: 13,
      activity: 'Validación comunitaria del anteproyecto',
      phase: 'Fase III. Validación Comunitaria',
      months: [false, false, false, false, true, false],
    },
    {
      id: 14,
      activity: 'Presentación ante los organismos gubernamentales competentes',
      phase: 'Fase IV. Gestión Institucional',
      months: [false, false, false, false, false, true],
    },
    {
      id: 15,
      activity: 'Acompañamiento institucional para la formulación del proyecto definitivo',
      phase: 'Fase IV. Gestión Institucional',
      months: [false, false, false, false, false, true],
    },
  ] satisfies CronogramaActivity[],
};

export type SiteConfig = typeof siteConfig;
