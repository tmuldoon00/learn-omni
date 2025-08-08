import fs from 'fs';
import path from 'path';
import { filenameToSlug } from './rag';
import { extractKeyTerms, calculateTextSimilarity, extractRelevantSnippets } from './search';

export interface DocSearchable {
  slug: string;
  title: string;
  description: string;
  content: string;
  headings: string[];
  bullets: string[];
  keywords: string[];
  path: string;
}

export interface DocResult {
  slug: string;
  title: string;
  description: string;
  relevanceScore: number;
  matchedSnippets: string[];
}

const DOCS_ROOT = path.join(process.cwd(), 'content', 'raw', 'docs');
let memoIndex: DocSearchable[] | null = null;

export function buildDocsIndex(): DocSearchable[] {
  if (memoIndex) return memoIndex;
  if (!fs.existsSync(DOCS_ROOT)) return (memoIndex = []);
  const files = fs.readdirSync(DOCS_ROOT).filter((f) => f.endsWith('.md'));
  const out: DocSearchable[] = [];
  for (const f of files) {
    const abs = path.join(DOCS_ROOT, f);
    const raw = fs.readFileSync(abs, 'utf8');
    const { title, description } = extractFrontMatter(raw);
    const headings = Array.from(raw.matchAll(/^##+\s+(.+)$/gm)).map((m) => m[1].trim());
    const bullets = Array.from(raw.matchAll(/^[*-]\s+(.+)$/gm)).map((m) => m[1].trim());
    const content = raw.replace(/```[\s\S]*?```/g, '');
    const terms = extractKeyTerms(content);
    out.push({
      slug: filenameToSlug(f),
      title: title || filenameToSlug(f).replace(/-/g, ' '),
      description: description || bullets[0] || headings[0] || '',
      content,
      headings,
      bullets,
      keywords: terms.keywords,
      path: f,
    });
  }
  memoIndex = out;
  return out;
}

export function searchDocs(query: string, maxResults = 5): DocResult[] {
  const idx = buildDocsIndex();
  const q = query.toLowerCase();
  const results = idx.map((d) => {
    const phrase = q;
    const titleScore = (d.title.toLowerCase().includes(phrase) ? 1 : calculateTextSimilarity(q, d.title)) * 40;
    const descScore = calculateTextSimilarity(q, d.description) * 15;
    const headingScore = (d.headings.some((h) => h.toLowerCase().includes(phrase)) ? 1 : headingOverlap(q, d.headings)) * 20;
    const bulletScore = (d.bullets.some((b) => b.toLowerCase().includes(phrase)) ? 1 : headingOverlap(q, d.bullets)) * 10;
    const contentScore = calculateTextSimilarity(q, d.content) * 10;
    const keywordScore = Math.min(d.keywords.filter((k) => q.includes(k) || k.includes(q)).length, 5);
    const score = Math.min(Math.round(titleScore + descScore + headingScore + bulletScore + contentScore + keywordScore), 100);
    const matchedSnippets = extractRelevantSnippets([d.headings.join('. '), d.bullets.join('. '), d.content].join('\n'), query, 3);
    return { slug: d.slug, title: d.title, description: d.description, relevanceScore: score, matchedSnippets };
  })
    .filter((r) => r.relevanceScore > 5)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxResults);
  return results;
}

function headingOverlap(q: string, arr: string[]): number {
  if (arr.length === 0) return 0;
  const count = arr.reduce((acc, h) => acc + (h.toLowerCase().includes(q) ? 1 : 0), 0);
  return Math.min(count / arr.length, 1);
}

function extractFrontMatter(md: string): { title?: string; description?: string } {
  const h1 = md.match(/^#\s+(.+)$/m)?.[1]?.trim();
  // find first paragraph after H1
  let description: string | undefined;
  const parts = md.split(/\n\s*\n/);
  if (parts.length > 1) {
    const after = parts.findIndex((p) => p.includes(`#`)) >= 0 ? parts.slice(1) : parts;
    description = after.find((p) => p.trim().length > 40 && !p.trim().startsWith('#'))?.replace(/\*|`|\[|\]|\(|\)/g, '');
  }
  return { title: h1, description };
}


