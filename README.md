# Flow.db

A modern, lightweight, and type-safe JSON document database designed for Node.js applications. Flow.db provides a seamless developer experience with TypeScript support, built-in schema validation, and robust data management capabilities.

## Features

- **Type-Safe Operations**: Full TypeScript support with type inference
- **Schema Validation**: JSON Schema-based data validation
- **Encryption**: Built-in data encryption support
- **Memory Caching**: Efficient in-memory caching system
- **Array Operations**: Rich set of array manipulation methods
- **Atomic Operations**: Safe concurrent data access
- **Flexible Storage**: JSON-based file system storage
- **Metadata Management**: Automatic tracking of collections and data structure

## Installation

```bash
npm install flow.db
```

## Quick Start

```typescript
import Database from 'flow.db';

// Initialize with default configuration
const db = new Database();

// Store data with type safety
interface User {
  id: number;
  name: string;
  email: string;
}

db.set<User>('user', {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
});

// Read data
const user = db.get<User>('user');

// Array operations
db.push('users', { id: 2, name: 'Jane Doe', email: 'jane@example.com' });
const users = db.get<User[]>('users');

// Find data
const filteredUsers = db.find('users', user => user.id > 1);
```

## Configuration

```typescript
const db = new Database({
  path: '.flow',           // Storage directory
  encryption: true,        // Enable encryption
  encryptionKey: 'key',   // Encryption key
  autoBackup: true,       // Enable backups
  schemaValidation: true  // Enable schema validation
});
```

## Schema Validation

```typescript
const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', pattern: '^[^@]+@[^@]+\\.[^@]+$' }
  },
  required: ['id', 'name', 'email']
};

// Validate data against schema
const isValid = db.validateSchema(userData, userSchema);
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT 