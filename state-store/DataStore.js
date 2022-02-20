const data = {};
const listeners = new Map();
const setters = new Map();

const on = (key, callback) => {
  listeners[key] ??= new Set();
  listeners[key].add(callback);
}

const set = (key, callback) => {
  if(setters.has(key)) return;
  setters.set(key, callback);
}

const off = (key, callback) => {
  listeners[key]?.delete(callback);
  listeners['*']?.delete(callback);
}

const notify = (key, oldValue) => {
  listeners[key]?.forEach(listener => listener?.(oldValue, key));
  listeners['*']?.forEach(listener => listener?.(oldValue, key));
}

const handler = {
  
  get(obj, key, receiver) {
    if(key === 'on') return on;
    if(key === 'off') return off;
    if(key === 'set') return set;
    return Reflect.get(...arguments);
  },

  set(obj, key, value) {
    const customSetter = setters.get(key);
    value = (customSetter) ? customSetter?.(value) : value;

    const oldValue = data[key];
    if(oldValue === value) return true;
    Reflect.set(obj, key, value);
    notify(key, oldValue);
    return true;
  }
  
};

export class Store {
  constructor() {
    return new Proxy(data, handler);
  }
}