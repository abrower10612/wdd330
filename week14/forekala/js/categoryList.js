export default class CategoryList {

  constructor() {
    this._list = [];
  }

  getList() {
    return this._list;
  }

  clearList() {
    this._list = [];
  }

  addCategoryToList(categoryObj) {
    this._list.push(categoryObj);
  }

  removeCategoryFromList(id) {
    const categories = this._list;
    for(let i = 0; i < categories.length; i++) {
      if (categories[i]._id == id) {
        categories.splice(i, 1);
        break;
      }
    }
  }  
}