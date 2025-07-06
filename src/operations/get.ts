import fs from 'fs';
import path from 'path';
import { DatabaseOptions } from '../types';
import { decrypt } from '../utils/crypto';

export function get(key: string, options: DatabaseOptions, cache: Map<string, any>): any {
  if (cache.has(key)) {
    return cache.get(key);
  }

  const dbPath = path.resolve(process.cwd(), options.path);
  const filePath = path.join(dbPath, `${key}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const rawData = fs.readFileSync(filePath, 'utf-8');
  let data = JSON.parse(rawData);

  if (options.encryption && options.encryptionKey) {
    data = JSON.parse(decrypt(data, options.encryptionKey));
  }

  cache.set(key, data);

  return data;
} 