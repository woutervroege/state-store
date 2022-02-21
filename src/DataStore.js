const data = {};
const listeners = new Map();
const validators = new Map();

const addListener = (key, callback) => {
  if(listeners.has(key) === false) listeners.set(key, new Set());
  listeners.get(key).add(callback);
}

const removeListener = (key, callback) => {
  listeners.get(key)?.delete(callback);
}

const addValidator = (key, callback) => {
  if(validators.has(key)) return;
  validators.set(key, callback);
}

const get = (pattern) => {
  const keys = Object.keys(data).filter(key => key.match(pattern));
  const results = {};
  keys.forEach(key => results[key] = data[key]);
  return results;
}

const notify = (key, oldValue) => {
  notifyListeners(key, oldValue);
  listeners.get(key)?.forEach(listener => listener?.(oldValue, key));
  const patterns = [...listeners.keys()].filter(key => typeof key === 'object');
  patterns.forEach(pattern => key.match(pattern) && notifyListeners(key, oldValue, pattern))
}

const notifyListeners = (key, oldValue, pattern) => {
  listeners.get(pattern || key)?.forEach(listener => listener?.(oldValue, key));
}

const handler = {
  get() { return getHandler(...arguments); },
  set() { return setHandler(...arguments); }
};

const getHandler = (obj, key, receiver) => {
  if(key === 'on') return addListener;
  if(key === 'off') return removeListener;
  if(key === 'validate') return addValidator;
  if(key === 'get') return get;
  return Reflect.get(obj, key, receiver);
}

const setHandler = (obj, key, value) => {

  const validated = validators.get(key)?.(value) ?? true;
  if(validated === false) return true;

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