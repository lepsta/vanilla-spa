import NAME from "./controllers/router.js";

class App {
  run() {
    window.alert(NAME);
  }
}

window.app = new App();
window.app.run();