const data = {};
const listeners = new Map();
const setters = new Map();

const on = (key, callback) => {
  if(listeners.has(key) === false) listeners.set(key, new Set());
  listeners.get(key).add(callback);
}

const off = (key, callback) => {
  listeners.get(key)?.delete(callback);
}

const set = (key, callback) => {
  if(setters.has(key)) return;
  setters.set(key, callback);
}

const find = (pattern) => {
  const keys = Object.keys(data).filter(key => key.match(pattern));
  const results = {};
  keys.forEach(key => results[key] = data[key]);
  return results;
}

const notify = (key, oldValue) => {
  notifyKeyListeners(key, oldValue);
  listeners.get(key)?.forEach(listener => listener?.(oldValue, key));
  const patterns = [...listeners.keys()].filter(key => typeof key === 'object');
  patterns.forEach(pattern => key.match(pattern) && notifyKeyListeners(key, oldValue, pattern))
}

const notifyKeyListeners = (key, oldValue, pattern) => {
  listeners.get(pattern || key)?.forEach(listener => listener?.(oldValue, key));
}

const handler = {
  get() { return getHandler(...arguments); },
  set() { return setHandler(...arguments); }
};

const getHandler = (obj, key, receiver) => {
  if(key === 'on') return on;
  if(key === 'off') return off;
  if(key === 'set') return set;
  if(key === 'find') return find;
  return Reflect.get(obj, key, receiver);
}

const setHandler = (obj, key, value) => {
  const customSetter = setters.get(key);
  value = (customSetter) ? customSetter?.(value) : value;
  const oldValue = data[key];
  if(oldValue === value) return true;
  Reflect.set(obj, key, value);
  notify(key, oldValue);
  return true;
}

export class Store {
  constructor() {
    return new Proxy(data, handler);
  }
}