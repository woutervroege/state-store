import store from './store.js';

export class ElOne extends HTMLElement {

  #name;
  #nameChangedHandler = () => this.name = store.get('name');

  constructor() {
    super();
    this.name = store.get('name');
    this.attachShadow({mode: 'open'});
    this.render();
    store.on('name', this.#nameChangedHandler);
  }

  disconnectedCallback() {
    store.off('name', this.#nameChangedHandler);
  }

  render() {
    this.shadowRoot ? this.shadowRoot.innerHTML = /*html*/`<h1>Hello, ${this.name ?? ''}</h1>` : null;
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

}

window.customElements.define('element-one', ElOne);