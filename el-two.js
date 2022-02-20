import store from './store.js';

export class ElTwo extends HTMLElement {

  #firstName;
  #lastName;
  #firstNameChangedHandler = () => this.firstName = store.get('name');
  #lastNameChangedHandler = () => this.lastName = store.get('lastName');

  constructor() {
    super();
    this.firstName = store.get('name');
    this.lastName = store.get('lastName');
    this.attachShadow({mode: 'open'});
    this.render();
    store.on('name', this.#firstNameChangedHandler);
    store.on('lastName', this.#lastNameChangedHandler);
  }

  disconnectedCallback() {
    store.off('name', this.#firstNameChangedHandler);
    store.off('lastName', this.#lastNameChangedHandler);
  }

  render() {
    this.shadowRoot ? this.shadowRoot.innerHTML = /*html*/`<h1>Hello, ${this.firstName ?? ''} ${this.lastName ?? ''}</h1>` : null;
  }

  get firstName() {
    return this.#firstName;
  }

  set firstName(firstName) {
    const oldValue = this.firstName;
    if(oldValue === firstName) return;

    this.#firstName = firstName;
    store.set('name', this.#firstName);
    this.render();
  }

  get lastName() {
    return this.#lastName;
  }

  set lastName(lastName) {
    const oldValue = this.lastName;
    if(oldValue === lastName) return;

    this.#lastName = lastName;
    store.set('lastName', this.#lastName);
    this.render();
  }

}

window.customElements.define('element-two', ElTwo);