export const data = {};
const listeners = new Map();

const on = (key, callback) => {
  listeners[key] ??= new Set();
  listeners[key].add(callback);
}

const off = (key, callback) => {
  listeners[key]?.delete(callback);
  listeners['*']?.delete(callback);
}

const notify = (key, oldValue) => {
  listeners[key]?.forEach(listener => listener?.(oldValue, key));
  listeners['*']?.forEach(listener => listener?.(oldValue, key));
}

export const handler = {
  
  get(obj, key) {
    if(key === 'on') return on;
    if(key === 'off') return off;
    return Reflect.get(...arguments);
  },

  set(obj, key, value) {
    const oldValue = data[key];
    if(oldValue === value) return true;
    Reflect.set(...arguments);
    notify(key, oldValue);
    return true;
  }
  
};