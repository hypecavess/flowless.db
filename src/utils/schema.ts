import { Schema } from '../types';

export function validateSchema(data: any, schema: Schema): boolean {
  if (schema.type === 'object') {
    if (typeof data !== 'object' || Array.isArray(data) || data === null) {
      return false;
    }

    if (schema.required) {
      for (const prop of schema.required) {
        if (!(prop in data)) {
          return false;
        }
      }
    }

    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (key in data && !validateSchema(data[key], propSchema)) {
          return false;
        }
      }
    }

    return true;
  }

  if (schema.type === 'array') {
    if (!Array.isArray(data)) {
      return false;
    }

    if (schema.items) {
      for (const item of data) {
        if (!validateSchema(item, schema.items)) {
          return false;
        }
      }
    }

    return true;
  }

  if (schema.type === 'string') {
    if (typeof data !== 'string') {
      return false;
    }

    if (schema.pattern && !new RegExp(schema.pattern).test(data)) {
      return false;
    }

    if (schema.minLength !== undefined && data.length < schema.minLength) {
      return false;
    }

    if (schema.maxLength !== undefined && data.length > schema.maxLength) {
      return false;
    }

    if (schema.enum && !schema.enum.includes(data)) {
      return false;
    }

    return true;
  }

  if (schema.type === 'number') {
    if (typeof data !== 'number') {
      return false;
    }

    if (schema.minimum !== undefined && data < schema.minimum) {
      return false;
    }

    if (schema.maximum !== undefined && data > schema.maximum) {
      return false;
    }

    return true;
  }

  if (schema.type === 'boolean') {
    return typeof data === 'boolean';
  }

  if (schema.type === 'null') {
    return data === null;
  }

  return false;
} 