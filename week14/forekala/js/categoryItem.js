export default class CategoryItem {

  constructor() {
    this._id = null;
    this._item = null;
    this._list = [];
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getItem() {
    return this._item;
  }

  setItem(item) {
    this._item = item;
  }

  getList() {
    return this._list;
  }

  clearList() {
    this._list = [];
  }

  addTransactionToList(transactionObj) {
    this._list.push(transactionObj);
  }

  removeCategoryFromList(id) {
    const transactions = this._list;
    for(let i = 0; i < categories.length; i++) {
      if (categories[i]._id == id) {
        categories.splice(i, 1);
        break;
      }
    }
  } 


}