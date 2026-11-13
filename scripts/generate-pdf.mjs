import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';
import matter from 'gray-matter';

const rootDir = process.cwd();
const contentDir = path.join(rootDir, 'content', 'documento');
const publicDir = path.join(rootDir, 'public');
const outputPath = path.join(publicDir, 'documento-completo.pdf');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const files = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith('.md'))
  .sort();

const chapters = files.map((file) => {
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
  const { data, content } = matter(raw);
  return {
    order: data.order,
    title: data.title,
    description: data.description,
    content: content.trim(),
  };
});

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 64, bottom: 64, left: 64, right: 64 },
  info: {
    Title:
      'Escuela Técnica Agroturística de La Mesa de Esnujaque - Anteproyecto Educativo y Comunitario (2026)',
    Author: 'Msc. José Ramón Valero',
    Subject:
      'Propuesta educativa para el reconocimiento, protección y aprovechamiento responsable del patrimonio territorial como base del desarrollo sostenible de la comunidad',
    Keywords:
      'Escuela Técnica Agroturística, La Mesa de Esnujaque, Municipio Urdaneta, Estado Trujillo, Venezuela, Desarrollo Sostenible',
  },
});

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Portada
doc.moveDown(2);
doc
  .font('Helvetica-Bold')
  .fontSize(11)
  .fillColor('#1B4332')
  .text('REPÚBLICA BOLIVARIANA DE VENEZUELA', { align: 'center' })
  .text('ESTADO TRUJILLO · MUNICIPIO URDANETA', { align: 'center' })
  .text('COMUNIDAD LA MESA DE ESNUJAQUE', { align: 'center' });

doc.moveDown(3);
doc
  .font('Helvetica-Bold')
  .fontSize(20)
  .fillColor('#0B1D15')
  .text('ESCUELA TÉCNICA AGROTURÍSTICA DE LA MESA DE ESNUJAQUE', {
    align: 'center',
  });

doc.moveDown(1);
doc
  .font('Helvetica-Bold')
  .fontSize(13)
  .fillColor('#2D6A4F')
  .text(
    'PROPUESTA EDUCATIVA PARA EL RECONOCIMIENTO, PROTECCIÓN Y APROVECHAMIENTO RESPONSABLE DEL PATRIMONIO TERRITORIAL COMO BASE DEL DESARROLLO SOSTENIBLE DE LA COMUNIDAD',
    { align: 'center', lineGap: 4 }
  );

doc.moveDown(2.5);
doc
  .font('Helvetica-Oblique')
  .fontSize(10.5)
  .fillColor('#333333')
  .text(
    'Nota institucional: El presente documento constituye un anteproyecto y propuesta inicial sujeta a validación comunitaria e institucional y a estudios técnicos, jurídicos, ambientales y económicos posteriores.',
    { align: 'center', lineGap: 3 }
  );

doc.moveDown(4);
doc
  .font('Helvetica-Bold')
  .fontSize(12)
  .fillColor('#111111')
  .text('Autor: Msc. José Ramón Valero', { align: 'center' });
doc
  .font('Helvetica')
  .fontSize(11)
  .fillColor('#444444')
  .text('La Mesa de Esnujaque, Estado Trujillo', { align: 'center' })
  .text('Año 2026', { align: 'center' });

// Índice general
doc.addPage();
doc
  .font('Helvetica-Bold')
  .fontSize(16)
  .fillColor('#1B4332')
  .text('Índice General del Anteproyecto', { underline: false });
doc.moveDown(1);

for (const ch of chapters) {
  doc
    .font('Helvetica-Bold')
    .fontSize(10.5)
    .fillColor('#1B4332')
    .text(`${ch.order}. ${ch.title}`);
  doc
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor('#555555')
    .text(ch.description, { indent: 14 });
  doc.moveDown(0.45);
}

// Capítulos
for (const ch of chapters) {
  doc.addPage();
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor('#2D6A4F')
    .text(`CAPÍTULO ${ch.order}`);
  doc.moveDown(0.2);
  doc
    .font('Helvetica-Bold')
    .fontSize(16)
    .fillColor('#0B1D15')
    .text(ch.title);
  doc.moveDown(0.8);

  const lines = ch.content.split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      doc.moveDown(0.4);
      continue;
    }
    if (line.startsWith('## ')) {
      doc.moveDown(0.4);
      doc
        .font('Helvetica-Bold')
        .fontSize(13)
        .fillColor('#1B4332')
        .text(line.replace(/^##\s+/, ''));
      doc.moveDown(0.25);
    } else if (line.startsWith('### ')) {
      doc.moveDown(0.3);
      doc
        .font('Helvetica-Bold')
        .fontSize(11.5)
        .fillColor('#2D6A4F')
        .text(line.replace(/^###\s+/, ''));
      doc.moveDown(0.2);
    } else if (line.startsWith('> ')) {
      doc
        .font('Helvetica-Oblique')
        .fontSize(10.5)
        .fillColor('#1D5B79')
        .text(line.replace(/^>\s+/, ''), { indent: 16, lineGap: 3 });
    } else if (line.startsWith('|')) {
      if (line.includes('---')) continue;
      const cells = line
        .split('|')
        .map((c) => c.trim())
        .filter(Boolean);
      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor('#222222')
        .text(cells.join('  |  '), { lineGap: 2 });
    } else {
      const cleanLine = line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
      doc
        .font('Helvetica')
        .fontSize(10.5)
        .fillColor('#1C2420')
        .text(cleanLine, { align: 'justify', lineGap: 3 });
    }
  }
}

doc.end();

stream.on('finish', () => {
  const stats = fs.statSync(outputPath);
  console.log(`Generated ${outputPath} (${stats.size} bytes)`);
});
