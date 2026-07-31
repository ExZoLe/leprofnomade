import Image from 'next/image';

interface BlogRendererProps {
  content: string;
  accent: string; // couleur du pays
}

/**
 * Rendu des articles de blog (même esprit que LessonRenderer).
 * Blocs reconnus :
 *   :::savais-tu ... :::   → encadré « Le saviez-vous ? »
 *   :::culture ... :::     → encadré « Code culturel »
 *   ## Titre               → intertitre
 *   ![alt](url)            → photo dans le corps
 * Le reste est rendu en paragraphes (avec **gras** inline).
 */
export function BlogRenderer({ content, accent }: BlogRendererProps) {
  const blocks = parseBlocks(content);

  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'savais-tu':
            return (
              <aside
                key={i}
                className="rounded-r-xl border-l-4 p-5 my-7 bg-[#F5EDE3]"
                style={{ borderColor: '#D6A23D' }}
              >
                <p className="text-xs font-bold tracking-wider uppercase mb-2 text-[#8B6914]">
                  💡 Le saviez-vous ?
                </p>
                <p className="text-sm text-[#5F5E5A] leading-relaxed m-0">
                  {renderInline(block.content)}
                </p>
              </aside>
            );
          case 'culture':
            return (
              <aside
                key={i}
                className="rounded-r-xl border-l-4 p-5 my-7"
                style={{ borderColor: accent, background: `${accent}0D` }}
              >
                <p
                  className="text-xs font-bold tracking-wider uppercase mb-2"
                  style={{ color: accent }}
                >
                  🧭 Code culturel
                </p>
                <p className="text-sm text-[#5F5E5A] leading-relaxed m-0">
                  {renderInline(block.content)}
                </p>
              </aside>
            );
          case 'heading':
            return (
              <h2
                key={i}
                className="font-display text-2xl text-[#3D2D14] mt-10 mb-4 leading-snug"
              >
                {block.content}
              </h2>
            );
          case 'image':
            return (
              <div key={i} className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden my-7">
                <Image
                  src={block.src ?? ''}
                  alt={block.content}
                  fill
                  sizes="(max-width: 780px) 100vw, 720px"
                  className="object-cover"
                />
              </div>
            );
          default:
            if (!block.content.trim()) return null;
            return (
              <p key={i} className="text-[15px] text-[#5F5E5A] leading-relaxed my-4">
                {renderInline(block.content)}
              </p>
            );
        }
      })}
    </div>
  );
}

// **gras** → <strong>
function renderInline(text: string) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-[#3D2D14] font-semibold">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

interface Block {
  type: string;
  content: string;
  src?: string;
}

function parseBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split('\n');
  let current: Block | null = null;
  let buffer: string[] = [];

  for (const line of lines) {
    const open = line.match(/^:::(savais-tu|culture)\s*$/);
    const close = line.match(/^:::\s*$/);
    const heading = line.match(/^##\s+(.+)$/);
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);

    if (open && !current) {
      current = { type: open[1], content: '' };
      buffer = [];
    } else if (close && current) {
      current.content = buffer.join(' ').trim();
      blocks.push(current);
      current = null;
      buffer = [];
    } else if (current) {
      if (line.trim()) buffer.push(line.trim());
    } else if (heading) {
      blocks.push({ type: 'heading', content: heading[1] });
    } else if (image) {
      blocks.push({ type: 'image', content: image[1], src: image[2] });
    } else if (line.trim()) {
      blocks.push({ type: 'text', content: line.trim() });
    }
  }

  return blocks;
}
