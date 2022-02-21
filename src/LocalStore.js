import { Store } from './Store.js';

export class LocalStore {

  #storageEngine;
  #db;
  
  constructor(storageEngine) {
    
    this.#db = new Store();
    this.#storageEngine = storageEngine;
    
    this.#db.on(/.*/, (oldValue, key) => {
      window[this.#storageEngine].setItem(key, this.#db[key]);
    })

    window.onstorage = () => this.#pullDataFromStorageEngine();
    this.#pullDataFromStorageEngine();

    return this.#db;

  }

  #pullDataFromStorageEngine() {
    const persistentData = Object.entries(window[this.#storageEngine]);
    for(let i in persistentData) {
      const [key, value] = persistentData[i];
      this.#db[key] = value;
    }
  }

}