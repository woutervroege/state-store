class Store {

  #listeners = new Set();
  #data = {};

  constructor() {
    this.set('name', 'John Doe');
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

  listen(callback) {
    this.#listeners.add(callback);
  }

  unlisten(callback) {
    this.#listeners.delete(callback);
  }

  #notify(key, oldValue) {
    this.#listeners.forEach(listener => this.#notifyOne(listener, key, oldValue));
  }

  #notifyOne(listener, key, oldValue) {
    listener?.(key, oldValue)
  }
  
}

const store = Object.freeze(new Store());
export default store;