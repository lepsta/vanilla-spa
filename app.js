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
    let self = this;
    window.addEventListener("popstate", function(ev) {
      ev.preventDefault();
      self._hash = self.getCleanPath();
      self.render();
    });
  }

  render() {
    const route = this._routes[this._hash];
    const data = route.render();
    console.log(data)
  }

  run() {
    this.handleRoutes();
  }
}

window.app = new App(routes);
window.app.run();