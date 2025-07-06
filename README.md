# Flow.db

> A modern, lightweight, and type-safe JSON document database with built-in schema validation, encryption, and caching capabilities.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/HypeCaves/flow.db)

## Overview

Flow.db is a robust, developer-friendly document database designed for modern Node.js applications. It provides a seamless experience for storing and managing JSON data with advanced features like schema validation, encryption, and automatic backups.

## Key Features

- **🔒 Built-in Encryption**: Secure your data with AES encryption
- **✨ Schema Validation**: Ensure data integrity with JSON schema validation
- **💾 Automatic Backups**: Configurable backup system with retention policies
- **🚀 Performance**: In-memory caching for fast data access
- **🔍 Rich Querying**: Powerful array operations and predicate-based searches
- **📝 Type Safety**: Full TypeScript support with comprehensive type definitions
- **🛠️ Developer Experience**: Simple API with intuitive methods

## Installation

```bash
npm install flow.db
```

## Quick Start

```typescript
import { Database } from 'flow.db';

// Initialize database with options
const db = new Database({
  path: '.flow',
  encryption: true,
  encryptionKey: 'your-secure-key',
  autoBackup: true,
  schemaValidation: true
});

// Define a schema
const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string' }
  },
  required: ['id', 'name']
};

// Store data
db.set('users', [
  { id: 1, name: 'John Doe', email: 'john@example.com' }
]);

// Query data
const users = db.find('users', user => user.id === 1);

// Update data
db.update('users',
  user => user.id === 1,
  user => ({ ...user, name: 'John Smith' })
);
```

## Core Operations

### Basic Operations

- `set(key, value)`: Store or update data
- `get(key)`: Retrieve data
- `delete(key)`: Remove data
- `find(collection, predicate)`: Search for items

### Array Operations

- `push(key, value)`: Add items to an array
- `pull(key, predicate)`: Remove items from an array
- `update(key, predicate, updateFn)`: Update array items

### Schema Validation

```typescript
const isValid = db.validateSchema(data, schema);
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| path | string | '.flow' | Database directory path |
| encryption | boolean | false | Enable data encryption |
| encryptionKey | string | undefined | Encryption key (required if encryption is true) |
| autoBackup | boolean | false | Enable automatic backups |
| backupInterval | number | 3600 | Backup interval in seconds |
| schemaValidation | boolean | false | Enable schema validation |

## Project Structure

```
flow.db/
├── src/
│   ├── core/          # Core database functionality
│   ├── operations/    # CRUD and array operations
│   ├── utils/         # Utility functions
│   └── types.ts       # TypeScript type definitions
├── examples/          # Usage examples
└── __tests__/        # Test suites
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📚 [Documentation](https://github.com/hypecavess/flow.db/wiki)
- 🐛 [Issue Tracker](https://github.com/hypecavess/flow.db/issues)
- 💬 [Discussions](https://github.com/hypecavess/flow.db/discussions)

## Acknowledgments

Special thanks to all contributors who have helped make Flow.db better.