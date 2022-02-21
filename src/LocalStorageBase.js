import { Store } from '../src/DataStore.js';

export class LocalStorageBase {

  #storageEngine;
  #db;
  
  constructor(storageEngine) {
    this.#db = new Store();
    this.#storageEngine = storageEngine;
    
    this.#db.on('*', (oldValue, key) => {
      window[this.#storageEngine].setItem(key, this.#db[key]);
    })

    window.onstorage = () => this.#init();
    this.#init();

    return this.#db;

  }

  #init() {
    const persistentData = Object.entries(window[this.#storageEngine]);
    for(let i in persistentData) {
      const [key, value] = persistentData[i];
      this.#db[key] = value;
    }
  }

}