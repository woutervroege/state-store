import { db } from '../src/LocalStorage.js';

db.validate('name', (name) => {
  const nameHasCaps = name.match(/[A-Z]/);
  if(!nameHasCaps) return true;
  console.warn('Value cannot have caps, please lowercase...');
  return false;
})

export default db;