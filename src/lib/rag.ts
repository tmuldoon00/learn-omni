import path from 'path';

export function filenameToSlug(filename: string): string {
  // drop extension
  const base = filename.replace(/\.md$/i, '');
  // remove leading docs_ prefix if present
  const cleaned = base.replace(/^docs_/i, '');
  return cleaned
    .replace(/_+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

export function filePathToSlug(p: string): string {
  return filenameToSlug(path.basename(p));
}


