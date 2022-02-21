import { db } from '../src/LocalStorage.js';

db.validate('name', name => {
  if( name.match(/.{3,}/) ) return true;
  console.warn('A name should at least have 3 characters.');
  return false;
})

export default db;