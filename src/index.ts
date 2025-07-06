import { DatabaseOptions, FlowDB, Schema } from './types';
import { initializeDB } from './core/initialize';
import { set } from './operations/set';
import { get } from './operations/get';
import { remove } from './operations/delete';
import { find } from './operations/find';
import { push } from './operations/array';
import { validateSchema } from './utils/schema';

class Database implements FlowDB {
  private options: DatabaseOptions;
  private cache: Map<string, any>;

  constructor(options: Partial<DatabaseOptions> = {}) {
    this.options = {
      path: '.flow',
      encryption: false,
      autoBackup: false,
      schemaValidation: false,
      ...options
    };
    this.cache = new Map();
    initializeDB(this.options);
  }

  public set(key: string, value: any): void {
    set(key, value, this.options, this.cache);
  }

  public get(key: string): any {
    return get(key, this.options, this.cache);
  }

  public delete(key: string): void {
    remove(key, this.options, this.cache);
  }

  public find(collection: string, predicate: (item: any) => boolean): any[] {
    return find(collection, predicate, this.options, this.cache);
  }

  public push(key: string, value: any): void {
    push(key, value, this.options, this.cache);
  }

  public validateSchema(data: any, schema: Schema): boolean {
    return validateSchema(data, schema);
  }
}

export = new Database(); 