import { routes } from "./controllers/router.js";

class App {

  _routes = {}
  _hash = "";

  constructor(routes) {
    this._routes = routes;
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

    let self = this;
    window.addEventListener("popstate", function(ev) {
      ev.preventDefault();
      self._hash = self.getCleanPath();
      self.render();
    });
  }

  async loadView(path) {
    return await window.fetch("/views/"+path).then(function(r) {
      return r.text();
    });
  }

  displayData(html, data) {
    const container = document.getElementById("app");
    container.innerHTML = Mustache.render(html, data);
  }

  async render() {
    console.log(this._hash)
    const route = this._routes[this._hash];
    const data = route.render();
    const html = await this.loadView(data.view);
    this.displayData(html, data);
    
  }

  run() {
    this.handleRoutes();
    this.render();
  }
}

window.app = new App(routes);
window.app.run();