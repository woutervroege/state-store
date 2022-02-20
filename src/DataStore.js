const data = {};
const listeners = new Map();
const getters = new Map();
const setters = new Map();

const on = (key, callback) => {
  listeners[key] ??= new Set();
  listeners[key].add(callback);
}

const get = (key, callback) => {
  if(getters.has(key)) return;
  getters.set(key, callback);
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
  get() { return getHandler(...arguments); },
  set() { return setHandler(...arguments); }
};

const getHandler = (obj, key, receiver) => {
  const customGetter = getters.get(key);
  if(customGetter) return customGetter?.(data[key]);
  if(key === 'on') return on;
  if(key === 'off') return off;
  if(key === 'get') return get;
  if(key === 'set') return set;
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