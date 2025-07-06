import fs from 'fs';
import path from 'path';
import { DatabaseOptions } from '../types';
import { encrypt } from '../utils/crypto';

interface MetaData {
  collections: string[];
  created: string;
  lastBackup: string | null;
}

export function set(key: string, value: any, options: DatabaseOptions, cache: Map<string, any>): void {
  const dbPath = path.resolve(process.cwd(), options.path);
  
  try {
    fs.mkdirSync(dbPath, { recursive: true });

    const filePath = path.join(dbPath, `${key}.json`);
    let dataToStore = value;

    if (options.encryption && options.encryptionKey) {
      dataToStore = encrypt(JSON.stringify(value), options.encryptionKey);
    }

    fs.writeFileSync(filePath, JSON.stringify(dataToStore, null, 2));

    cache.set(key, value);

    const metaPath = path.join(dbPath, 'meta.json');
    let meta: MetaData;

    try {
      const metaContent = fs.readFileSync(metaPath, 'utf-8');
      meta = JSON.parse(metaContent);
    } catch {
      meta = {
        collections: [],
        created: new Date().toISOString(),
        lastBackup: null
      };
    }

    if (!meta.collections.includes(key)) {
      meta.collections.push(key);
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    }
  } catch (error) {
    throw new Error(`Failed to save data for key "${key}": ${(error as Error).message}`);
  }
} 