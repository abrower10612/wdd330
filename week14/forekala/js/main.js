import CategoryList from "./categoryList.js"
import CategoryItem from "./categoryItem.js"
import TransactionList from "./transactionList.js"
import TransactionItem from "./transactionItem.js"


const categoryList = new CategoryList;

const updatePersistentData = (categories) => {
  localStorage.setItem("myCategories", JSON.stringify(categories));
}

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  const addCategoryBtn = document.getElementById("addCategoryBtn");
  addCategoryBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addCategory();
  });
  monthAndYear();
  loadCategories();
  pageRefresh();
}


const loadCategories = () => {
  const storedCategories = localStorage.getItem("myCategories");
  if (typeof storedCategories != "string") return;
  const parsedList = JSON.parse(storedCategories);
  parsedList.forEach(category => {
    const newCategory = createNewCategory(category._item, category._id);
    categoryList.addCategoryToList(newCategory);
  })
}


const pageRefresh = () => {
  clearCategories();
  renderCategories();
}

const renderCategories = () => {
  const categories = categoryList.getList();
  categories.forEach(category => {
    createCategory(category);
  })
}

const clearCategories = () => {
  const container = document.getElementById("categories");
  deleteCategories(container);
}

const deleteCategories = (container) => {
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
};


// adds a new category when the "Add Category" button is pushed
function addCategory() {
  const categoryName = prompt("What are you going to name this one?")
  if (categoryName == "") alert("Oops, the category name can't be blank.")
  else if (categoryName == null) return;
  else {
    const nextCategoryId = calcCategoryId();
    const newCategory = createNewCategory(categoryName, nextCategoryId);
    categoryList.addCategoryToList(newCategory);
    updatePersistentData(categoryList.getList());
    pageRefresh();
  }
}


const createCategory = (category) => {
  // Variables
  var node = document.createElement("div");
  var textnode = document.createTextNode(category.getItem());
  var addTransaction = document.createElement("button");
  var deleteBtn = document.createElement("button");
  var addTransaction = document.createElement("button");
  var clear = document.createElement("button");
  var clearText = document.createTextNode("clear");
  var clear = document.createElement("button");
  var clearText = document.createTextNode("clear");
  var categoryTitle = document.createElement("div");
  var categoryHeading = document.createElement("h2");
  var transactionBar = document.createElement("div");
  var transactionName = document.createElement("input");
  var transactionAmount = document.createElement("input")
  var transactionDate = document.createElement("input")
  var transactionSubmitText = document.createTextNode("Track Expense");
  var transactionSubmit = document.createElement("a");

  // classes, styles, and ids
  categoryTitle.classList.add("categoryTitle");
  deleteBtn.classList.add("fa");
  deleteBtn.classList.add("fa-trash-o");
  node.classList.add("bucket");
  node.id = category.getId();
  addTransaction.classList.add("fa");
  addTransaction.classList.add("fa-plus-circle");
  addTransaction.style.color = "white";
  addTransaction.style.fontSize = "1.5em";
  transactionBar.classList.add("hide");
  transactionBar.style.height = "fit-content";
  transactionBar.classList.add("transactionBar");
  transactionName.placeholder = "Where?";
  transactionAmount.placeholder = "How much?";
  transactionDate.placeholder = "When?";
  transactionSubmit.classList.add("transactionSubmit");

  // appendChild
  categoryHeading.appendChild(textnode);
  categoryTitle.appendChild(categoryHeading);
  categoryTitle.appendChild(deleteBtn);
  node.appendChild(categoryTitle);
  categoryTitle.appendChild(addTransaction);
  clear.appendChild(clearText);
  categoryTitle.appendChild(clear);
  node.appendChild(transactionBar);
  transactionBar.appendChild(transactionName);
  transactionBar.appendChild(transactionDate);
  transactionBar.appendChild(transactionAmount);
  transactionSubmit.appendChild(transactionSubmitText);
  transactionBar.appendChild(transactionSubmit);

  // Onclick and finish
  deleteBtn.onclick = () => { deleteCategory(document.getElementById(node.id)) };
  clear.onclick = () => { clearCategory() };
  addTransaction.onclick = () => { newTransaction(transactionBar, transactionSubmit, transactionAmount, transactionDate, transactionName, category) }
  document.getElementById("categories").appendChild(node);
}


// adds a transaction to the selected category
function newTransaction(transactionBar, transactionSubmit, transactionAmount, transactionDate, transactionName, category) {
  transactionBar.classList.toggle("hide");
  transactionSubmit.onclick = () => {
    const transaction = new TransactionItem();
    transaction.setItem(transactionName.value);
    transaction.setDate(transactionDate.value);
    transaction.setAmount(transactionAmount.value);
    const categoryId = category.getId();
    console.log(categoryId);
    // addTransactionToBucket(transaction);
  }
}


const addTransactionToBucket = (transaction) => {
}


// calculates a unique id for each category
const calcCategoryId = () => {
  let nextCategoryId = 1;
  const list = categoryList.getList();
  if (list.length > 0) {
    nextCategoryId = list[list.length - 1].getId() + 1;
  }
  console.log(list);
  return nextCategoryId;
}


// creates the new category as an object
const createNewCategory = (categoryName, categoryId) => {
  const category = new CategoryItem();
  category.setId(categoryId);
  category.setItem(categoryName);
  return category;
}



// clears the list of transactions within the selected category
function clearCategory() {
  alert("Transactions cleared");
}


// deletes a category when the delete icon is selected
function deleteCategory(node) {
  var confirmDelete = window.confirm("Are you sure you want to delete this category?");
  if (confirmDelete) {
    categoryList.removeCategoryFromList(node.id);
    updatePersistentData(categoryList.getList());
    pageRefresh();
  }
}


// Dynamically sets and displays the month and year 
function monthAndYear() {
  var today = new Date();
  var mm = String(today.getMonth()).padStart(2, '0');
  switch(mm) {
    case "00":
      mm = "January";
      break;
    case "01":
      mm = "February";
      break;
    case "02":
      mm = "March";
      break;
    case "03":
      mm = "April";
      break;
    case "04":
      mm = "May";
      break;
    case "05":
      mm = "June";
      break;
    case "06":
      mm = "July";
      break;
    case "07":
      mm = "August";
      break;
    case "08":
      mm = "September";
      break;
    case "09":
      mm = "October";
      break;
    case "10":
      mm = "November";
      break;
    default:
      mm = "December";
      break;
  }
  var yyyy = today.getFullYear();
  today = mm + " " + yyyy;
  var node = document.createElement("h1");
  var textnode = document.createTextNode(today);
  node.appendChild(textnode);
  document.getElementById("monthAndYear").appendChild(node);
}