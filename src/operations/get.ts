import fs from 'fs';
import path from 'path';
import { DatabaseOptions } from '../types';
import { decrypt } from '../utils/crypto';

export function get(key: string, options: DatabaseOptions, cache: Map<string, any>): any {
  // Check cache first
  if (cache.has(key)) {
    return cache.get(key);
  }

  const dbPath = path.resolve(process.cwd(), options.path);
  const filePath = path.join(dbPath, `${key}.json`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  // Read and parse data
  const rawData = fs.readFileSync(filePath, 'utf-8');
  let data = JSON.parse(rawData);

  // Decrypt if necessary
  if (options.encryption && options.encryptionKey) {
    data = JSON.parse(decrypt(data, options.encryptionKey));
  }

  // Update cache
  cache.set(key, data);

  return data;
} 