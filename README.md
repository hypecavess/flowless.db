# Flow.db

<div align="center">

![Flow.db Logo](assets/logo.png)

[![npm version](https://img.shields.io/npm/v/flow.db.svg?style=flat-square)](https://www.npmjs.com/package/flow.db)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

A modern, lightweight, and type-safe JSON document database for Node.js applications.

[Getting Started](#getting-started) •
[Features](#features) •
[Documentation](#documentation) •
[Examples](#examples) •
[Contributing](#contributing)

</div>

---

## 🚀 Getting Started

### Installation

```bash
npm install flow.db
# or
yarn add flow.db
# or
pnpm add flow.db
```

### Quick Start

```typescript
import Database from 'flow.db';

// Initialize database
const db = new Database();

// Store typed data
interface User {
  id: number;
  name: string;
  email: string;
}

// Create
db.set<User>('user', {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
});

// Read
const user = db.get<User>('user');

// Update
db.push('users', { id: 2, name: 'Jane Doe', email: 'jane@example.com' });

// Query
const activeUsers = db.find('users', user => user.id > 0);
```

## ✨ Features

### Type-Safe Operations
- Full TypeScript support with type inference
- Compile-time type checking
- IntelliSense support in VSCode

### Data Integrity
- **Schema Validation**: JSON Schema-based validation
- **Atomic Operations**: Safe concurrent access
- **Data Encryption**: Built-in encryption support

### Performance
- **Memory Caching**: Efficient in-memory caching
- **Optimized I/O**: Minimal disk operations
- **Lightweight**: Zero external dependencies

### Developer Experience
- **Simple API**: Intuitive method names
- **Flexible**: Works with any JSON data
- **Well Documented**: Comprehensive API docs

## 📖 Documentation

### Configuration

```typescript
const db = new Database({
  path: '.flow',           // Storage directory
  encryption: true,        // Enable encryption
  encryptionKey: 'key',   // Encryption key
  autoBackup: true,       // Enable backups
  schemaValidation: true  // Enable validation
});
```

### Schema Validation

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

### Array Operations

```typescript
// Add to array
db.push('users', newUser);

// Remove from array
db.pull('users', user => user.id === 1);

// Update in array
db.update('users', 
  user => user.id === 1,
  user => ({ ...user, status: 'active' })
);
```

## 🎯 Examples

Check out our [examples directory](examples/) for more detailed usage examples:

- [Basic CRUD Operations](examples/basic-crud.ts)
- [Schema Validation](examples/schema-validation.ts)
- [Array Operations](examples/array-operations.ts)
- [Encryption](examples/encryption.ts)

## 🤝 Contributing

We love your input! We want to make contributing to Flow.db as easy and transparent as possible. Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

Flow.db is [MIT licensed](LICENSE).

---

<div align="center">

Made with ❤️ by the Hypecaves and Flowless Team

</div> 