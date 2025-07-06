import fs from 'fs';
import Database from '../index';
import { Schema } from '../types';

describe('Flow.db Schema Validation', () => {
  const testDir = '.flow-test';
  let db: typeof Database;

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      try {
        fs.rmSync(testDir, { recursive: true, force: true });
      } catch (error) {
        // Ignore errors
      }
    }
    db = new (Database.constructor as any)({ path: testDir });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      try {
        fs.rmSync(testDir, { recursive: true, force: true });
      } catch (error) {
        // Ignore errors
      }
    }
  });

  test('should validate basic types', () => {
    const schema: Schema = {
      type: 'object',
      properties: {
        string: { type: 'string' },
        number: { type: 'number' },
        boolean: { type: 'boolean' },
        null: { type: 'null' }
      }
    };

    const validData = {
      string: 'test',
      number: 123,
      boolean: true,
      null: null
    };

    const invalidData = {
      string: 123,
      number: 'test',
      boolean: 'true',
      null: undefined
    };

    expect(db.validateSchema(validData, schema)).toBe(true);
    expect(db.validateSchema(invalidData, schema)).toBe(false);
  });

  test('should validate required properties', () => {
    const schema: Schema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' }
      },
      required: ['id', 'name']
    };

    const validData = { id: 1, name: 'Test' };
    const invalidData = { id: 1 };

    expect(db.validateSchema(validData, schema)).toBe(true);
    expect(db.validateSchema(invalidData, schema)).toBe(false);
  });

  test('should validate string patterns', () => {
    const schema: Schema = {
      type: 'object',
      properties: {
        email: { 
          type: 'string',
          pattern: '^[^@]+@[^@]+\\.[^@]+$'
        },
        phone: {
          type: 'string',
          pattern: '^\\d{10}$'
        }
      }
    };

    const validData = {
      email: 'test@example.com',
      phone: '1234567890'
    };

    const invalidData = {
      email: 'invalid-email',
      phone: '123-456-7890'
    };

    expect(db.validateSchema(validData, schema)).toBe(true);
    expect(db.validateSchema(invalidData, schema)).toBe(false);
  });

  test('should validate number constraints', () => {
    const schema: Schema = {
      type: 'object',
      properties: {
        age: {
          type: 'number',
          minimum: 0,
          maximum: 120
        },
        score: {
          type: 'number',
          minimum: 0,
          maximum: 100
        }
      }
    };

    const validData = {
      age: 25,
      score: 85
    };

    const invalidData = {
      age: -1,
      score: 101
    };

    expect(db.validateSchema(validData, schema)).toBe(true);
    expect(db.validateSchema(invalidData, schema)).toBe(false);
  });

  test('should validate string length', () => {
    const schema: Schema = {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          minLength: 3,
          maxLength: 20
        },
        bio: {
          type: 'string',
          maxLength: 500
        }
      }
    };

    const validData = {
      username: 'testuser',
      bio: 'This is a test bio'
    };

    const invalidData = {
      username: 'a',
      bio: 'x'.repeat(501)
    };

    expect(db.validateSchema(validData, schema)).toBe(true);
    expect(db.validateSchema(invalidData, schema)).toBe(false);
  });

  test('should validate nested objects', () => {
    const schema: Schema = {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string' },
                city: { type: 'string' },
                country: { type: 'string' }
              },
              required: ['street', 'city']
            }
          }
        }
      }
    };

    const validData = {
      user: {
        name: 'Test User',
        address: {
          street: '123 Test St',
          city: 'Test City'
        }
      }
    };

    const invalidData = {
      user: {
        name: 'Test User',
        address: {
          street: '123 Test St'
        }
      }
    };

    expect(db.validateSchema(validData, schema)).toBe(true);
    expect(db.validateSchema(invalidData, schema)).toBe(false);
  });

  test('should validate arrays', () => {
    const schema: Schema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' }
        },
        required: ['id']
      }
    };

    const validData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ];

    const invalidData = [
      { id: 1, name: 'Item 1' },
      { name: 'Item 2' }
    ];

    expect(db.validateSchema(validData, schema)).toBe(true);
    expect(db.validateSchema(invalidData, schema)).toBe(false);
  });

  test('should validate enum values', () => {
    const schema: Schema = {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'pending']
        },
        priority: {
          type: 'number',
          enum: [1, 2, 3, 4, 5]
        }
      }
    };

    const validData = {
      status: 'active',
      priority: 3
    };

    const invalidData = {
      status: 'unknown',
      priority: 6
    };

    expect(db.validateSchema(validData, schema)).toBe(true);
    expect(db.validateSchema(invalidData, schema)).toBe(false);
  });
}); 