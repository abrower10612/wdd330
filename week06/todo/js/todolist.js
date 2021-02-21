export default class ToDoList {
  constructor() {
    this._list = [];
    this._completedList = [];
  }

  getList() {
    return this._list;
  }

  getCompleted() {
    return this._completedList;
  }

  clearList() {
    this._list = [];
  }

  clearCompleted() {
    this._completedList = [];
  }

  addItemToList(itemObj) {
    this._list.push(itemObj);
  }

  removeItemFromList(id) {
    const list = this._list;
    for(let i = 0; i < list.length; i++) {
      if (list[i]._id == id) {
        list.splice(i, 1);
        break;
      }
    }
  }

  addItemToCompletedList(id) {
    this._completedList.push(id);
  }

  completedItem(item, itemId) {
    const completedItem = this._list.find((i) => itemId === i._id);

    this.removeItemFromList(itemId);
    this._completedList.push(item);
  }
}