import { db } from '../src/impl/localStorage.js';

db.validate('name', name => {
  if( name.match(/.{3,}/) ) return true;
  console.warn('A name should at least have 3 characters.');
  return false;
})

db.validate(/na/, value => {
  if(value.includes('e')) return true;
  console.warn('Value should contain a letter e');
  return false;
})

export default db;