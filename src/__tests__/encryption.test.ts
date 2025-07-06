import fs from 'fs';
import path from 'path';
import flowdb from '../index';
const { Database } = flowdb;

describe('Flow.db Encryption', () => {
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
    db = new Database({ 
      path: testDir,
      encryption: true,
      encryptionKey: 'test-key-12345'
    });
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

  test('should encrypt and decrypt data correctly', () => {
    const testData = { id: 1, name: 'Test User' };
    db.set('user', testData);

    const filePath = path.join(process.cwd(), testDir, 'user.json');
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const fileData = JSON.parse(rawContent);

    expect(fileData).not.toEqual(testData);
    expect(typeof fileData).toBe('string');

    const retrievedData = db.get('user');
    expect(retrievedData).toEqual(testData);
  });

  test('should handle encryption with arrays', () => {
    const testData = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ];

    db.set('users', testData);
    const retrievedData = db.get('users');

    expect(retrievedData).toEqual(testData);
  });

  test('should handle encryption with nested objects', () => {
    const testData = {
      id: 1,
      name: 'Test User',
      address: {
        street: '123 Test St',
        city: 'Test City',
        country: 'Test Country'
      },
      contacts: [
        { type: 'email', value: 'test@example.com' },
        { type: 'phone', value: '1234567890' }
      ]
    };

    db.set('user', testData);
    const retrievedData = db.get('user');

    expect(retrievedData).toEqual(testData);
  });
}); 