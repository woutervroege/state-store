import { Store } from '../src/DataStore.js';
const db = new Store();

db.on('*', (oldValue, key) => {
  window.localStorage.setItem(key, db[key]);
})

// db.set('name', (name) => {
//   return name.toLowerCase();
// })

db.get('name', (name) => {
  return name.toLowerCase();
})

const persistentData = Object.entries(window.localStorage);
for(let i in persistentData) {
  const [key, value] = persistentData[i];
  db[key] = value;
}

export default db;