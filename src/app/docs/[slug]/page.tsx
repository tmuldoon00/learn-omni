import fs from 'fs';
import path from 'path';
// Temporarily disable markdown rendering to isolate prerender error
import { Metadata } from 'next';
import { filePathToSlug, filenameToSlug } from '@/lib/rag';

export const dynamic = 'force-dynamic';

const DOCS_ROOT = path.join(process.cwd(), 'content', 'raw', 'docs');

// Removed SSG params to avoid prerendering this route; it will render dynamically at runtime.

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const file = findFileBySlug(slug);
  const content = fs.readFileSync(file, 'utf8');
  const title = extractTitle(content) || slug.replace(/-/g, ' ');
  const description = extractFirstSentence(content) || 'Documentation';
  return {
    title: `${title} — LearnOmni Docs`,
    description,
  };
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const file = findFileBySlug(params.slug);
  const content = fs.readFileSync(file, 'utf8');
  const title = extractTitle(content) || params.slug.replace(/-/g, ' ');

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>
      <p className="text-gray-600">Document loaded. Length: {content.length} characters.</p>
    </div>
  );
}

function findFileBySlug(slug: string): string {
  const files = fs.readdirSync(DOCS_ROOT).filter((f) => f.endsWith('.md'));
  for (const f of files) {
    if (filenameToSlug(f) === slug) return path.join(DOCS_ROOT, f);
  }
  throw new Error(`Doc not found for slug: ${slug}`);
}

function extractTitle(md: string): string | null {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

function extractFirstSentence(md: string): string | null {
  const text = md.replace(/```[\s\S]*?```/g, '').replace(/[#>*\-\d\.]+/g, ' ');
  const m = text.match(/([A-Z][^.!?]{40,160}[.!?])/);
  return m ? m[1].trim() : null;
}


