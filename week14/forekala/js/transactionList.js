export default class TransactionList {

  constructor() {
    this._list = list;
  }

  getList() {
    return this._list;
  }

  clearList() {
    this._list = [];
  }

  addCategoryToList(transactionObj) {
    this._list.push(transactionObj);
  }

  removeCategoryFromList(id) {
    const transactions = this._list;
    for(let i = 0; i < transactions.length; i++) {
      if (transactions[i]._id == id) {
        transactions.splice(i, 1);
        break;
      }
    }
  }  

  
}