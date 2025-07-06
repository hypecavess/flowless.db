import Database from 'flow.db';

// Initialize database with encryption
const db = new Database({
  encryption: true,
  encryptionKey: 'your-secure-key-here'
});

interface SensitiveData {
  userId: number;
  creditCard: {
    number: string;
    expiry: string;
    cvv: string;
  };
  personalInfo: {
    ssn: string;
    dateOfBirth: string;
  };
}

// Store sensitive data (will be automatically encrypted)
const userData: SensitiveData = {
  userId: 1,
  creditCard: {
    number: '4111-1111-1111-1111',
    expiry: '12/25',
    cvv: '123'
  },
  personalInfo: {
    ssn: '123-45-6789',
    dateOfBirth: '1990-01-01'
  }
};

// Data is encrypted before being written to disk
db.set<SensitiveData>('sensitive-data', userData);

// Data is automatically decrypted when retrieved
const retrievedData = db.get<SensitiveData>('sensitive-data');
console.log('Retrieved data:', retrievedData);

// Even with array operations, encryption is handled automatically
db.push('sensitive-data-array', userData);

// You can verify the encryption by checking the raw file content
// The data in the .flow directory will be encrypted and unreadable 