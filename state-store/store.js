class Store {

  #listeners = new Map();
  #data = {};

  constructor() {
    this.set('name', 'John');
    this.set('lastName', 'Doe');
  }
  
  set(key, value) {
    const oldValue = this.#data[key];
    if(oldValue ===  value) return;
    this.#data[key] = value;
    this.#notify(key, oldValue);
  }

  get(key) {
    return this.#data[key];
  }

  on(key, callback) {
    this.#listeners[key] ??= new Set();
    this.#listeners[key].add(callback);
  }

  off(key, callback) {
    this.#listeners[key].delete(callback);
    console.info(this.#listeners[key]);
  }

  #notify(key, oldValue) {
    this.#listeners[key]?.forEach(listener => listener?.(oldValue));
  }
  
}

const store = Object.freeze(new Store());
export default store;