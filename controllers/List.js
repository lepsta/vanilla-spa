import tasks from "../models/tasks.js";

class List {
  render() {
    return {
      view: "list.html",
      model: tasks,
      data: {
        "items": tasks.list()
      }
    };
  }
}

export default new List();