import db from './db.js';

export class XUsers extends HTMLElement {

  #usersChangedHandler = () => this.render();

  constructor() {
    super();
    this.userCount = 2;
    db.on(/users/, this.#usersChangedHandler);
    this.attachShadow({mode: 'open'});
    this.render();
  }

  get db() {
    return db;
  }

  disconnectedCallback() {
    db.off(/users/, this.#usersChangedHandler);
  }

  render() {
    this.shadowRoot ? this.shadowRoot.innerHTML = /*html*/`
      <h1>Users</h1>
      <ul>
        ${this.users.map(user => /*html*/`<li>${user}</li>` ).join('')}
      </ul>
    ` : null;
  }

  get users() {
    return Object.values(db.get(/users/));
  }
  
  addUser(user) {
    this.userCount++;
    db[`users/${crypto.randomUUID()}`] = user;
  }

}

window.customElements.define('x-users', XUsers);