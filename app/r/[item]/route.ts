import { existsSync, readFileSync } from 'node:fs';
import { posix as path } from 'node:path';
import ts from 'typescript';
import catalog from '@/configs/docs.json';

const entries = new Map(
  catalog.dataArray.flatMap((group) =>
    group.componentArray.map(
      (entry) => [entry.componentName + '.json', entry] as const,
    ),
  ),
);

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from(entries.keys(), (item) => ({ item }));
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ item: string }> },
) {
  const entry = entries.get((await params).item);
  if (!entry) return new Response(null, { status: 404 });
  const name = entry.componentName;
  const dependencies = new Set<string>();
  const files = new Map<
    string,
    { path: string; target: string; type: string; content: string }
  >();
  const entryPath = 'registry/' + entry.filesrc;
  const base = path.dirname(entryPath);

  function addFile(file: string) {
    if (files.has(file)) return;
    const localPath = file.startsWith('hooks/')
      ? file
      : path.relative(base, file);
    let content = readFileSync(file, 'utf8');
    const record = {
      path: file,
      target: '@components/cursify/' + name + '/' + localPath,
      type: file.endsWith('.css') ? 'registry:file' : 'registry:component',
      content,
    };
    files.set(file, record);
    if (file.endsWith('.css')) return;
    for (const spec of ts.preProcessFile(content).importedFiles.reverse()) {
      const id = spec.fileName;
      if (!id.startsWith('.') && !id.startsWith('@/')) {
        const pkg = id
          .split('/')
          .slice(0, id.startsWith('@') ? 2 : 1)
          .join('/');
        if (pkg !== 'react' && pkg !== 'react-dom') dependencies.add(pkg);
        continue;
      }
      const stem = id.startsWith('@/')
        ? id.slice(2)
        : path.join(path.dirname(file), id);
      const extensions = path.extname(stem) ? [''] : ['.tsx', '.ts', '/index.tsx', '/index.ts'];
      const resolved = extensions
        .map((ext) => stem + ext)
        .find(existsSync);
      if (!resolved)
        throw new Error('Missing registry dependency ' + id + ' in ' + file);
      addFile(resolved);
      if (id.startsWith('@/')) {
        const relative = path.relative(path.dirname(localPath), stem);
        content =
          content.slice(0, spec.pos + 1) +
          (relative.startsWith('.') ? relative : './' + relative) +
          content.slice(spec.end + 1);
      }
    }
    record.content =
      file === entryPath && !/^\s*['"]use client['"]/.test(content)
        ? "'use client';\n" + content
        : content;
  }

  addFile(entryPath);
  return Response.json({
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name,
    type: 'registry:component',
    dependencies: [...dependencies].sort(),
    files: [...files.values()],
  });
}
