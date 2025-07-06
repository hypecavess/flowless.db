import fs from 'fs';
import path from 'path';
import { DatabaseOptions } from '../types';

export function initializeDB(options: DatabaseOptions): void {
  const dbPath = path.resolve(process.cwd(), options.path);
  
  try {
    fs.mkdirSync(dbPath, { recursive: true });

    const metaPath = path.join(dbPath, 'meta.json');
    fs.writeFileSync(metaPath, JSON.stringify({
      created: new Date().toISOString(),
      lastBackup: null,
      collections: []
    }, null, 2));

    if (options.autoBackup) {
      const backupPath = path.join(dbPath, 'backups');
      fs.mkdirSync(backupPath, { recursive: true });
    }
  } catch (error) {
    throw new Error(`Cannot initialize database at ${dbPath}: ${(error as Error).message}`);
  }
} 