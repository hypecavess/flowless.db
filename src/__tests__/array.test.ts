import fs from 'fs';
import path from 'path';
import flowdb from '../index';
const { Database } = flowdb;

interface User {
  id: number;
  name: string;
  age?: number;
  status?: string;
}

interface Post {
  id: number;
  title: string;
  likes: number;
  trending?: boolean;
}

describe('Flow.db Array Operations', () => {
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

  test('should push items to array', () => {
    const users: User[] = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ];

    db.set('users', users);
    db.push('users', { id: 3, name: 'User 3' });

    const result = db.get('users') as User[];
    expect(result).toHaveLength(3);
    expect(result[2]).toEqual({ id: 3, name: 'User 3' });
  });

  test('should throw error when pushing to non-array', () => {
    db.set('user', { id: 1, name: 'User 1' });
    expect(() => {
      db.push('user', { id: 2, name: 'User 2' });
    }).toThrow('Cannot push to non-array value at key: user');
  });

  test('should handle push to non-existent key', () => {
    db.push('newArray', { id: 1, name: 'User 1' });
    const result = db.get('newArray') as User[];
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ id: 1, name: 'User 1' });
  });

  test('should update array items', () => {
    const users: User[] = [
      { id: 1, name: 'User 1', age: 20 },
      { id: 2, name: 'User 2', age: 25 },
      { id: 3, name: 'User 3', age: 30 }
    ];

    db.set('users', users);
    db.update('users', 
      (user: User) => user.age !== undefined && user.age > 25,
      (user: User) => ({ ...user, status: 'senior' })
    );

    const result = db.get('users') as User[];
    expect(result[2].status).toBe('senior');
    expect(result[1].status).toBeUndefined();
  });

  test('should pull items from array', () => {
    const users: User[] = [
      { id: 1, name: 'User 1', age: 20 },
      { id: 2, name: 'User 2', age: 25 },
      { id: 3, name: 'User 3', age: 30 }
    ];

    db.set('users', users);
    db.pull('users', (user: User) => user.age !== undefined && user.age >= 25);

    const result = db.get('users') as User[];
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('User 1');
  });

  test('should handle complex array operations', () => {
    const posts: Post[] = [
      { id: 1, title: 'Post 1', likes: 10 },
      { id: 2, title: 'Post 2', likes: 5 },
      { id: 3, title: 'Post 3', likes: 15 }
    ];

    db.set('posts', posts);

    db.push('posts', { id: 4, title: 'Post 4', likes: 0 });

    db.update('posts',
      (post: Post) => post.likes > 10,
      (post: Post) => ({ ...post, trending: true })
    );

    db.pull('posts', (post: Post) => post.likes < 5);

    const result = db.get('posts') as Post[];

    expect(result).toHaveLength(3);
    expect(result.find((p: Post) => p.id === 3)?.trending).toBe(true);
    expect(result.find((p: Post) => p.id === 1)?.trending).toBeUndefined();
    expect(result.find((p: Post) => p.id === 4)).toBeUndefined();
  });
}); 