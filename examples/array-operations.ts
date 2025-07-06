import Database from 'flow.db';

// Initialize database
const db = new Database();

interface Post {
  id: number;
  title: string;
  author: string;
  likes: number;
  tags: string[];
}

// Initialize posts array
db.set<Post[]>('posts', [
  {
    id: 1,
    title: 'Getting Started with Flow.db',
    author: 'John Doe',
    likes: 10,
    tags: ['database', 'tutorial']
  }
]);

// Push: Add new post
db.push('posts', {
  id: 2,
  title: 'Advanced Flow.db Features',
  author: 'Jane Smith',
  likes: 5,
  tags: ['advanced', 'features']
});

// Update: Increment likes for a specific post
db.update('posts',
  post => post.id === 1,
  post => ({ ...post, likes: post.likes + 1 })
);

// Pull: Remove posts with low likes
db.pull('posts', post => post.likes < 3);

// Find: Get all posts by author
const johnsPosts = db.find('posts', post => post.author === 'John Doe');
console.log('John\'s posts:', johnsPosts);

// Complex update: Add tag to all posts
db.update('posts',
  () => true, // Update all posts
  post => ({
    ...post,
    tags: [...new Set([...post.tags, 'flow-db'])] // Add tag if not exists
  })
);

// Get final state
const allPosts = db.get<Post[]>('posts');
console.log('All posts:', allPosts); 