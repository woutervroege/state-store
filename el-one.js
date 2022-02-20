import store from './store.js';

export class ElOne extends HTMLElement {

  #name;

  constructor() {
    super();
    this.name = store.get('name');
    this.attachShadow({mode: 'open'});
    this.render();
    this.listener = this.storeChanged.bind(this);
    store.listen(this.listener);
  }

  disconnectedCallback() {
    store.unlisten(this.listener);
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    const oldValue = this.name;
    if(oldValue === name) return;

    this.#name = name;
    store.set('name', this.#name);
    this.render();
  }

  render() {
    this.shadowRoot ? this.shadowRoot.innerHTML = /*html*/`<h1>Hello, ${this.name ?? ''}</h1>` : null;
  }

  storeChanged(key, oldValue) {
    this[key] = store.get(key);
  }

}

window.customElements.define('element-one', ElOne);