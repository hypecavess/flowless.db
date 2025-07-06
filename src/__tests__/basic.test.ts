import fs from 'fs';
import path from 'path';
import flowdb from '../index';
const { Database } = flowdb;

describe('Flow.db Basic Operations', () => {
  const testDir = '.flow-test';
  let db: InstanceType<typeof Database>;

  beforeEach(async () => {
    if (fs.existsSync(testDir)) {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        fs.rmSync(testDir, { recursive: true, force: true });
      } catch (error) {
        console.warn('Cleanup warning:', error);
      }
    }
    db = new Database({ path: testDir });
  });

  afterEach(async () => {
    if (fs.existsSync(testDir)) {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        fs.rmSync(testDir, { recursive: true, force: true });
      } catch (error) {
        console.warn('Cleanup warning:', error);
      }
    }
  });

  test('should set and get data correctly', () => {
    const testData = { id: 1, name: 'Test User' };
    db.set('user', testData);
    expect(db.get('user')).toEqual(testData);
  });

  test('should delete data correctly', () => {
    const testData = { id: 1, name: 'Test User' };
    db.set('user', testData);
    db.delete('user');
    expect(db.get('user')).toBeNull();
  });

  test('should handle array operations correctly', () => {
    const users = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ];

    db.set('users', users);
    db.push('users', { id: 3, name: 'User 3' });

    const result = db.get('users');
    expect(result).toHaveLength(3);
    expect(result[2].name).toBe('User 3');
  });

  test('should validate schema correctly', () => {
    const userSchema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' }
      },
      required: ['id', 'name']
    };

    const validUser = { id: 1, name: 'Test User' };
    const invalidUser = { id: 'not-a-number', name: 'Test User' };

    expect(db.validateSchema(validUser, userSchema)).toBe(true);
    expect(db.validateSchema(invalidUser, userSchema)).toBe(false);
  });

  test('should find data correctly', () => {
    const users = [
      { id: 1, name: 'User 1', age: 20 },
      { id: 2, name: 'User 2', age: 25 },
      { id: 3, name: 'User 3', age: 30 }
    ];

    db.set('users', users);
    const adults = db.find('users', user => user.age >= 25);

    expect(adults).toHaveLength(2);
    expect(adults[0].name).toBe('User 2');
    expect(adults[1].name).toBe('User 3');
  });
}); 