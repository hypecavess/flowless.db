# Flow.db

A powerful and easy-to-use JSON-based database system.

## Features

- JSON-based data storage
- Simple setup and usage
- Data encryption support
- Automatic backup system
- Memory caching
- Data validation schemas
- TypeScript support
- Advanced query system

## Installation

```bash
npm install flow.db
```

## Usage

```typescript
const db = require('flow.db');

// Store data
db.set('users', { id: 1, name: 'John' });

// Read data
const user = db.get('users');

// Delete data
db.delete('users');

// Advanced query
const adults = db.find('users', user => user.age > 18);

// Array operations
db.push('users', { id: 2, name: 'Jane' });
```

## Configuration

```typescript
const db = require('flow.db');

const options = {
  path: '.flow',           // Directory to store data
  encryption: true,        // Enable data encryption
  encryptionKey: 'key',   // Encryption key
  autoBackup: true,       // Enable automatic backup
  backupInterval: 3600,   // Backup interval (seconds)
  schemaValidation: true  // Enable schema validation
};

// Initialize with custom configuration
const db = new Database(options);
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

const isValid = db.validateSchema(userData, userSchema);
```

## License

MIT 