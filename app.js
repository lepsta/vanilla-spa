import { routes } from "./controllers/routes.js";

class App {
  name = "";
  version = "";
  description = "";
  routes = {};
  model = null;
  _hash = "";

  constructor(routes) {
    this.routes = routes;
  }

  async init() {
    const config = await fetch("config.json").then(val => val.json())
    this.name = config.appname;
    this.version = config.version;
    this.description = config.description;
  }

  getCleanPath() {
    let hash = window.location.hash;
    return hash.slice(1);
  }

  handleRoutes() {
    this._hash = this.getCleanPath();
    if (this._hash === "") {
      this._hash = "/";
    }
    window.addEventListener('popstate', (ev) => {
      ev.preventDefault();
      this._hash = this.getCleanPath();
      this.render();
    });
  }

  async loadView(path) {
    return await fetch("/views/"+path).then(r => r.text());
  }

  async render() {
    const route = this.routes[this._hash] || this.routes["/404"];
    const data = route.render();
    this.model = data?.model;
    const container = document.getElementById("app");
    const html = await this.loadView(data.view, data?.data);
    container.innerHTML = Mustache.render(html, data?.data);
  }

  async run() {
    await this.init();
    this.handleRoutes();
    this.render();
  }
}

window.app = new App(routes);
window.app.run();