class Tasks {
  key = "app_tasks";
  items = [];

  constructor() {
    const data = window.localStorage.getItem(this.key);
    if (data !== null) {
      this.items = JSON.parse(data);
    }
  }

  _getIndexByID(id) {
    return this.items.findIndex((item) => {
      return item.id === id;
    })
  }

  create(title) {
    const id = Math.random()+"";
    this.items.push({
      id,
      title,
      done: false
    });
    window.localStorage.setItem(this.key, JSON.stringify(this.items))
  }

  list() {
    return this.items;
  }

  toggleDone(id) {
    const index = this._getIndexByID(id);
    let item = this.items[index];
    if ("done" in item) {
      item.done = !item.done;
    } else {
      item.done = true;
    }
    this.items[index] = item;
    window.localStorage.setItem(this.key, JSON.stringify(this.items))
  }

  delete(id) {
    this.items.splice(this._getIndexByID(id), 1);
    window.localStorage.setItem(this.key, JSON.stringify(this.items))
  }

}

export default new Tasks();