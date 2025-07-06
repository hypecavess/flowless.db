import Database from 'flow.db';

// Initialize database
const db = new Database();

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// Create
const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date().toISOString()
};

db.set<User>('user', user);

// Read
const savedUser = db.get<User>('user');
console.log('Read user:', savedUser);

// Update
db.set<User>('user', {
  ...savedUser!,
  name: 'John Smith'
});

// Delete
db.delete('user');

// Verify deletion
const deletedUser = db.get<User>('user');
console.log('User after deletion:', deletedUser); // null 