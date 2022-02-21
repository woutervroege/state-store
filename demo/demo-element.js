import db from './db.js';

export class DemoElement extends HTMLElement {

  #nameChangedHandler = () => this.name = db.name;

  constructor() {
    super();
    db.on('name', this.#nameChangedHandler);
    this.attachShadow({mode: 'open'});
    this.render();
  }

  disconnectedCallback() {
    db.off('name', this.#nameChangedHandler);
  }

  render() {
    this.shadowRoot ? this.shadowRoot.innerHTML = /*html*/`<h1>Hello, ${db.name ?? ''}</h1>` : null;
  }

  set name(name) {
    db.name = name;
    this.render();
  }

}

window.customElements.define('demo-element', DemoElement);