import db from './db.js';

export class XName extends HTMLElement {

  #nameChangedHandler = () => this.name = db.name;

  constructor() {
    super();
    this.userCount = 2;
    db.on('name', this.#nameChangedHandler);
    this.attachShadow({mode: 'open'});
    this.render();
  }

  get db() {
    return db;
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

window.customElements.define('x-name', XName);