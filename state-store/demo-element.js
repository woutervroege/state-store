import store from './store.js';

export class DemoElement extends HTMLElement {

  #name;
  #nameChangedHandler = () => this.name = store.get('name');

  constructor() {
    super();

    this.name = store.get('name');
    store.on('name', this.#nameChangedHandler);

    this.attachShadow({mode: 'open'});
    this.render();
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
    this.#name = name;
    store.set('name', this.#name);
    this.render();
  }

}

window.customElements.define('demo-element', DemoElement);