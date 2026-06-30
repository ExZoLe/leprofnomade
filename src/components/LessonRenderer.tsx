'use client';

import { ProfSays, Dialogue, Grammar, Quiz, CulturalNote } from './LessonComponents';

interface LessonRendererProps {
  content: string;
}

/**
 * Simple renderer that parses custom blocks from MDX-like content.
 * Blocks are delimited by:
 *   :::prof ... :::
 *   :::dialogue ... :::
 *   :::grammar ... :::
 *   :::quiz ... :::
 *   :::culture ... :::
 *
 * Everything else is rendered as paragraphs.
 */
export function LessonRenderer({ content }: LessonRendererProps) {
  const blocks = parseBlocks(content);

  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'prof':
            return (
              <ProfSays key={i}>
                <p>{block.content}</p>
              </ProfSays>
            );
          case 'dialogue':
            try {
              const lines = JSON.parse(block.content);
              return <Dialogue key={i} lines={lines} />;
            } catch {
              return <p key={i} className="text-red-500 text-sm">Erreur dans le dialogue</p>;
            }
          case 'grammar':
            try {
              const points = JSON.parse(block.content);
              return <Grammar key={i} points={points} />;
            } catch {
              return <p key={i} className="text-red-500 text-sm">Erreur dans la grammaire</p>;
            }
          case 'quiz':
            try {
              const questions = JSON.parse(block.content);
              return <Quiz key={i} questions={questions} />;
            } catch {
              return <p key={i} className="text-red-500 text-sm">Erreur dans le quiz</p>;
            }
          case 'culture':
            return (
              <CulturalNote key={i}>
                {block.content}
              </CulturalNote>
            );
          case 'heading':
            return null; // Already handled by meta
          default:
            if (block.content.trim()) {
              return (
                <p key={i} className="text-sm text-gray-600 leading-relaxed my-3">
                  {block.content}
                </p>
              );
            }
            return null;
        }
      })}
    </div>
  );
}

interface Block {
  type: string;
  content: string;
}

function parseBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split('\n');
  let currentBlock: Block | null = null;
  let blockLines: string[] = [];

  for (const line of lines) {
    const openMatch = line.match(/^:::(prof|dialogue|grammar|quiz|culture)\s*$/);
    const closeMatch = line.match(/^:::\s*$/);

    if (openMatch && !currentBlock) {
      currentBlock = { type: openMatch[1], content: '' };
      blockLines = [];
    } else if (closeMatch && currentBlock) {
      currentBlock.content = blockLines.join('\n').trim();
      blocks.push(currentBlock);
      currentBlock = null;
      blockLines = [];
    } else if (currentBlock) {
      blockLines.push(line);
    } else {
      // Regular text
      if (line.trim()) {
        blocks.push({ type: 'text', content: line.trim() });
      }
    }
  }

  return blocks;
}
