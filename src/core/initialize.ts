import fs from 'fs';
import path from 'path';
import { DatabaseOptions } from '../types';

export function initializeDB(options: DatabaseOptions): void {
  const dbPath = path.resolve(process.cwd(), options.path);
  
  // Create main directory
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }

  // Create metadata file
  const metaPath = path.join(dbPath, 'meta.json');
  if (!fs.existsSync(metaPath)) {
    fs.writeFileSync(metaPath, JSON.stringify({
      created: new Date().toISOString(),
      lastBackup: null,
      collections: []
    }, null, 2));
  }

  // Create backup directory
  if (options.autoBackup) {
    const backupPath = path.join(dbPath, 'backups');
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
    }
  }
} 