import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'fs/promises';
import { join } from 'path';

type OgImageOptions = {
  title: string;
  subtitle?: string;
  type: 'essay' | 'case';
  lang: 'pt' | 'en';
};

const tag = {
  pt: { essay: 'Ensaio', case: 'Case' },
  en: { essay: 'Essay', case: 'Case' },
};

const tagColors = {
  essay: { border: '#B8D4C8', color: '#2B4C3F', bg: '#F0F7F4' },
  case:  { border: '#C9C1B8', color: '#5C4A36', bg: '#F7F3EF' },
};

async function loadFonts() {
  const base = join(process.cwd(), 'node_modules/@fontsource/lora/files');
  const [latin400, latinExt400, latin500, latinExt500] = await Promise.all([
    readFile(join(base, 'lora-latin-400-normal.woff')),
    readFile(join(base, 'lora-latin-ext-400-normal.woff')),
    readFile(join(base, 'lora-latin-500-normal.woff')),
    readFile(join(base, 'lora-latin-ext-500-normal.woff')),
  ]);
  return [
    { name: 'Lora', data: latin400,    weight: 400 as const, style: 'normal' as const },
    { name: 'Lora', data: latinExt400, weight: 400 as const, style: 'normal' as const },
    { name: 'Lora', data: latin500,    weight: 500 as const, style: 'normal' as const },
    { name: 'Lora', data: latinExt500, weight: 500 as const, style: 'normal' as const },
  ];
}

export async function generateOgImage({ title, subtitle, type, lang }: OgImageOptions): Promise<Buffer> {
  const fonts = await loadFonts();
  const tc = tagColors[type];
  const typeLabel = tag[lang][type];

  // h() helper — builds Satori element objects without needing JSX
  const h = (t: string, p: Record<string, unknown>, ...c: unknown[]) => ({
    type: t,
    props: { ...p, children: c.length === 1 ? c[0] : c.length > 1 ? c : undefined },
  });

  const element = h('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#F9F7F4',
      padding: '64px 80px 56px',
    },
  },
    // Tag pill
    h('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'flex-start',
        border: `1px solid ${tc.border}`,
        borderRadius: '2px',
        backgroundColor: tc.bg,
        color: tc.color,
        fontSize: '14px',
        fontFamily: 'Lora',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '3px 10px',
        marginBottom: '40px',
      },
    }, typeLabel),

    // Title
    h('div', {
      style: {
        display: 'flex',
        fontSize: title.length > 50 ? '46px' : '56px',
        fontFamily: 'Lora',
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        color: '#1A1A1A',
        marginBottom: subtitle ? '24px' : '0',
      },
    }, title),

    // Subtitle (optional)
    ...(subtitle ? [h('div', {
      style: {
        display: 'flex',
        fontSize: '22px',
        fontFamily: 'Lora',
        fontWeight: 400,
        fontStyle: 'italic',
        color: '#76706A',
        lineHeight: 1.45,
      },
    }, subtitle)] : []),

    // Spacer
    h('div', { style: { display: 'flex', flex: 1 } }),

    // Footer
    h('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #E2DDD8',
        paddingTop: '24px',
      },
    },
      h('div', {
        style: {
          display: 'flex',
          fontSize: '16px',
          fontFamily: 'Lora',
          fontWeight: 400,
          color: '#76706A',
        },
      }, 'joaomarcos.pro'),
      h('div', {
        style: {
          display: 'flex',
          fontSize: '18px',
          fontFamily: 'Lora',
          fontWeight: 500,
          color: '#2B4C3F',
        },
      }, 'João Marcos'),
    ),
  );

  const svg = await satori(element as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts,
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return Buffer.from(resvg.render().asPng());
}
