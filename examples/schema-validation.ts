import Database from 'flow.db';

// Initialize database with schema validation
const db = new Database({
  schemaValidation: true
});

// Define user schema
const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string', minLength: 2 },
    email: { 
      type: 'string',
      pattern: '^[^@]+@[^@]+\\.[^@]+$'
    },
    age: { 
      type: 'number',
      minimum: 0,
      maximum: 120
    },
    role: {
      type: 'string',
      enum: ['user', 'admin', 'moderator']
    }
  },
  required: ['id', 'name', 'email', 'age', 'role'],
  additionalProperties: false
};

// Valid user data
const validUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  role: 'admin'
};

// Invalid user data
const invalidUser = {
  id: 'not-a-number', // Should be number
  name: 'J',          // Too short
  email: 'invalid-email',
  age: 150,          // Above maximum
  role: 'superuser'  // Not in enum
};

// Validate data
console.log('Valid user:', db.validateSchema(validUser, userSchema));   // true
console.log('Invalid user:', db.validateSchema(invalidUser, userSchema)); // false

// Try to store invalid data (will throw error)
try {
  db.set('user', invalidUser);
} catch (error) {
  console.error('Validation error:', error.message);
} 