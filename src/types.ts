export interface DatabaseOptions {
  path: string;
  encryption: boolean;
  encryptionKey?: string;
  autoBackup: boolean;
  backupInterval?: number;
  schemaValidation: boolean;
}

export interface FlowDB {
  set(key: string, value: any): void;
  get(key: string): any;
  delete(key: string): void;
  find(collection: string, predicate: (item: any) => boolean): any[];
  push(key: string, value: any): void;
  pull(key: string, predicate: (item: any) => boolean): void;
  update(key: string, predicate: (item: any) => boolean, updateFn: (item: any) => any): void;
  validateSchema(data: any, schema: Schema): boolean;
}

export interface Schema {
  type: string;
  properties?: {
    [key: string]: Schema;
  };
  required?: string[];
  items?: Schema;
  pattern?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  enum?: any[];
} 