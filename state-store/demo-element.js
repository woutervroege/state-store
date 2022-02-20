import db from './localStorage.js';

export class DemoElement extends HTMLElement {

  #name;
  #nameChangedHandler = () => this.name = db.name;

  constructor() {
    super();
    this.name = db.name;
    db.on('name', this.#nameChangedHandler);
    this.attachShadow({mode: 'open'});
    this.render();
  }

  disconnectedCallback() {
    db.off('name', this.#nameChangedHandler);
  }

  render() {
    this.shadowRoot ? this.shadowRoot.innerHTML = /*html*/`<h1>Hello, ${this.name ?? ''}</h1>` : null;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
    db.name = this.name;
    this.render();
  }

}

window.customElements.define('demo-element', DemoElement);