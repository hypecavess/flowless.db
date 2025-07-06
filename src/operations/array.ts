import { DatabaseOptions } from '../types';
import { get } from './get';
import { set } from './set';

export function push(key: string, value: any, options: DatabaseOptions, cache: Map<string, any>): void {
  const data = get(key, options, cache) || [];
  
  if (!Array.isArray(data)) {
    throw new Error(`Cannot push to non-array value at key: ${key}`);
  }

  data.push(value);
  set(key, data, options, cache);
}

export function pull(key: string, predicate: (item: any) => boolean, options: DatabaseOptions, cache: Map<string, any>): void {
  const data = get(key, options, cache) || [];
  
  if (!Array.isArray(data)) {
    throw new Error(`Cannot pull from non-array value at key: ${key}`);
  }

  const filteredData = data.filter(item => !predicate(item));
  set(key, filteredData, options, cache);
}

export function update(key: string, predicate: (item: any) => boolean, updateFn: (item: any) => any, options: DatabaseOptions, cache: Map<string, any>): void {
  const data = get(key, options, cache) || [];
  
  if (!Array.isArray(data)) {
    throw new Error(`Cannot update non-array value at key: ${key}`);
  }

  const updatedData = data.map(item => predicate(item) ? updateFn(item) : item);
  set(key, updatedData, options, cache);
}

export function find(collection: string, predicate: (item: any) => boolean, options: DatabaseOptions, cache: Map<string, any>): any[] {
  const data = get(collection, options, cache) || [];
  
  if (!Array.isArray(data)) {
    throw new Error(`Cannot search in non-array value at key: ${collection}`);
  }

  return data.filter(predicate);
} 