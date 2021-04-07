export default class TransactionItem {

  constructor() {
    this._id = null;
    this._item = null;
    this._date = null;
    this._amount = null;
  }

  // ID
  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  // Parent category
  getParentCategory() {
    return this._item;
  }

  setParentCategory(item) {
    this._parentCategory = item;
  }


  // Name
  getItem() {
    return this._item;
  }

  setItem(item) {
    this._item = item;
  }


  // Date
  getDate() {
    return this._date;
  }

  setDate(date) {
    this._date = date;
  }


  // Amount
  getAmount() {
    return this._amount;
  }

  setAmount(amount) {
    this._amount = amount;
  }


}