import { db } from '../src/LocalStorage.js';

db.set('name', (name) => {
  return name.toLowerCase();
})

export default db;