import tasks from "../models/tasks.js";

class List {
  render() {
    return {
      view: "list.html",
      tasks: tasks
    }
  }
}

export default new List();