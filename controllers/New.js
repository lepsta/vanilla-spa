import tasks from "../models/tasks.js";

class New {
  render() {
    return {
      view: "new.html",
      model: tasks
    }
  }
}

export default new New();