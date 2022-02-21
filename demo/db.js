import { db } from '../src/SessionStorage.js';

// db.set('name', (name) => {
//   return name.toLowerCase();
// })

db.get('name', (name) => {
  return name?.toLowerCase();
})

export default db;