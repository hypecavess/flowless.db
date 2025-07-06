import { DatabaseOptions } from '../types';
import { get } from './get';

export function find(collection: string, predicate: (item: any) => boolean, options: DatabaseOptions, cache: Map<string, any>): any[] {
  const data = get(collection, options, cache);
  
  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter(predicate);
} 