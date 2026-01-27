// MongoDB initialization script
db = db.getSiblingDB('dkathel-portfolio');

// Create a regular user for the application
db.createUser({
  user: 'appuser',
  pwd: 'apppassword',
  roles: [
    {
      role: 'readWrite',
      db: 'dkathel-portfolio'
    }
  ]
});

// Create initial collections
db.createCollection('users');
db.createCollection('blogposts');

console.log('Database initialized for dkathel-portfolio');
