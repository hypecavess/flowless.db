import fs from 'fs';
import path from 'path';
import { DatabaseOptions } from '../types';

export function createBackup(options: DatabaseOptions): void {
  const dbPath = path.resolve(process.cwd(), options.path);
  const backupPath = path.join(dbPath, 'backups');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(backupPath, timestamp);

  fs.mkdirSync(backupDir, { recursive: true });

  const files = fs.readdirSync(dbPath).filter(file => 
    file.endsWith('.json') && file !== 'meta.json'
  );

  for (const file of files) {
    const sourcePath = path.join(dbPath, file);
    const destPath = path.join(backupDir, file);
    fs.copyFileSync(sourcePath, destPath);
  }

  const metaPath = path.join(dbPath, 'meta.json');
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  meta.lastBackup = timestamp;
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));

  const backups = fs.readdirSync(backupPath)
    .filter(dir => fs.statSync(path.join(backupPath, dir)).isDirectory())
    .sort((a, b) => b.localeCompare(a));

  while (backups.length > 5) {
    const oldBackup = backups.pop();
    if (oldBackup) {
      fs.rmSync(path.join(backupPath, oldBackup), { recursive: true });
    }
  }
}

export function startBackupScheduler(options: DatabaseOptions): NodeJS.Timer {
  const interval = options.backupInterval || 3600;
  return setInterval(() => createBackup(options), interval * 1000);
} 