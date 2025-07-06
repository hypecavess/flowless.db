import fs from 'fs';
import path from 'path';
import { DatabaseOptions } from '../types';

export function remove(key: string, options: DatabaseOptions, cache: Map<string, any>): void {
  const dbPath = path.resolve(process.cwd(), options.path);
  const filePath = path.join(dbPath, `${key}.json`);

  cache.delete(key);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  const metaPath = path.join(dbPath, 'meta.json');
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  meta.collections = meta.collections.filter((collection: string) => collection !== key);
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
} 