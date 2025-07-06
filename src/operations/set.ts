import fs from 'fs';
import path from 'path';
import { DatabaseOptions } from '../types';
import { encrypt } from '../utils/crypto';

export function set(key: string, value: any, options: DatabaseOptions, cache: Map<string, any>): void {
  const dbPath = path.resolve(process.cwd(), options.path);
  const filePath = path.join(dbPath, `${key}.json`);
  
  let dataToStore = value;

  // Encrypt data
  if (options.encryption && options.encryptionKey) {
    dataToStore = encrypt(JSON.stringify(value), options.encryptionKey);
  }

  // Save to file
  fs.writeFileSync(filePath, JSON.stringify(dataToStore, null, 2));

  // Save to cache
  cache.set(key, value);

  // Update metadata
  const metaPath = path.join(dbPath, 'meta.json');
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  if (!meta.collections.includes(key)) {
    meta.collections.push(key);
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  }
} 