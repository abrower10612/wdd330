import CategoryList from "./categoryList.js"
import CategoryItem from "./categoryItem.js"
import TransactionList from "./transactionList.js"
import TransactionItem from "./transactionItem.js"


const categoryList = new CategoryList;

const updatePersistentData = (categories) => {
  localStorage.setItem("myCategories", JSON.stringify(categories));
}

const updateTransactionPersistentData = (category, transactions) => {
  localStorage.setItem(category.getItem() + "Transactions", JSON.stringify(transactions));
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
  loadTransactions();
  pageRefresh();
}


const loadTransactions = () => {
  var categories = categoryList.getList();
  categories.forEach(category => {
    const storedTransactions = localStorage.getItem(category._item + "Transactions");
    if (typeof storedTransactions != "string") return;
    const parsedTransactionList = JSON.parse(storedTransactions);
    parsedTransactionList.forEach(transaction => {
      const newTransaction = createNewTransaction(transaction._item, transaction._id, transaction._date, transaction._amount, transaction._parentCategory);
      console.log(newTransaction);
      categories.forEach(category => {
        console.log(newTransaction._parentCategory);
        if (category.getItem() == newTransaction._parentCategory) {
          category.addTransactionToList(newTransaction);
        }
        else {
          console.log("not quite");
        }
      })
    })
  })
}


// creates the new category as an object
const createNewTransaction = (transactionName, transactionId, transactionDate, transactionAmount, transactionParentCategory) => {
  const transaction = new TransactionItem();
  transaction.setId(transactionId);
  transaction.setItem(transactionName);
  transaction.setDate(transactionDate);
  transaction.setAmount(transactionAmount);
  transaction.setParentCategory(transactionParentCategory);
  return transaction;
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


// creates the new category as an object
const createNewCategory = (categoryName, categoryId) => {
  const category = new CategoryItem();
  category.setId(categoryId);
  category.setItem(categoryName);
  return category;
}


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


// calculates a unique id for each category
const calcCategoryId = () => {
  let nextCategoryId = 1;
  const list = categoryList.getList();
  if (list.length > 0) {
    nextCategoryId = list[list.length - 1].getId() + 1;
  }
  return nextCategoryId;
}


// calculates a unique id for each transaction in the category
const calcTransactionId = (category) => {
  let nextTransactionId = 1;
  const list = category.getList();
  if (list.length > 0) {
    nextTransactionId = list[list.length - 1].getId() + 1;
  }
  return nextTransactionId;
}


// adds a transaction to the selected category
function newTransaction(transactionBar, transactionSubmit, transactionAmount, transactionDate, transactionName, category) {
  transactionBar.classList.toggle("hide");
  transactionSubmit.onclick = () => {
    const transaction = new TransactionItem();
    transaction.setItem(transactionName.value);
    transaction.setDate(transactionDate.value);
    transaction.setAmount(transactionAmount.value);
    transaction.setId(calcTransactionId(category));
    transaction.setParentCategory(category._item);
    category.addTransactionToList(transaction);
    updateTransactionPersistentData(category, category.getList());
    pageRefresh();
  }
}


const createCategory = (category) => {
  // Variables
  var node = document.createElement("div");
  var textnode = document.createTextNode(category.getItem());
  node.id = category.getId();
  var addTransaction = document.createElement("button");
  var deleteBtn = document.createElement("button");
  var clearBtn = document.createElement("button");
  var clearText = document.createTextNode("clear");
  var categoryTitle = document.createElement("div");
  var categoryHeading = document.createElement("h2");
  var transactionTable = document.createElement("table");
  var transactionTableHeader = document.createElement("tr");

  // table header for vendor name
  var tableNameHeader = document.createElement("th")
  var tableNameHeaderText = document.createTextNode("Vendor");
  tableNameHeader.appendChild(tableNameHeaderText);

  // table header for transaction date
  var tableDateHeader = document.createElement("th")
  var tableDateHeaderText = document.createTextNode("Date");
  tableDateHeader.appendChild(tableDateHeaderText);

  // table header for transaction amount
  var tableAmountHeader = document.createElement("th")
  var tableAmountHeaderText = document.createTextNode("Amount");
  tableAmountHeader.appendChild(tableAmountHeaderText);

  transactionTable.appendChild(transactionTableHeader);
  transactionTableHeader.appendChild(tableNameHeader)
  transactionTableHeader.appendChild(tableDateHeader)
  transactionTableHeader.appendChild(tableAmountHeader)
  var transactionBar = document.createElement("div");
  var transactionName = document.createElement("input");
  var transactionAmount = document.createElement("input")
  transactionAmount.type = "number";
  var transactionDate = document.createElement("input")
  transactionDate.type = "date";
  var transactionSubmitText = document.createTextNode("Track Expense");
  var transactionSubmit = document.createElement("a");
  var transactions = category.getList();
  buildTransactionsList(transactions, transactionTable);

  // classes, styles, and ids
  categoryTitle.classList.add("categoryTitle");
  transactionTable.classList.add("transactionList")
  deleteBtn.classList.add("fa");
  deleteBtn.classList.add("fa-trash-o");
  deleteBtn.id = category.getId();
  clearBtn.id = category.getId();
  transactionSubmit.id = category.getId();
  node.classList.add("bucket");
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
  clearBtn.appendChild(clearText);
  categoryTitle.appendChild(clearBtn);
  node.appendChild(transactionTable);
  node.appendChild(transactionBar);
  transactionBar.appendChild(transactionName);
  transactionBar.appendChild(transactionDate);
  transactionBar.appendChild(transactionAmount);
  transactionSubmit.appendChild(transactionSubmitText);
  transactionBar.appendChild(transactionSubmit);

  // Onclick and finish
  trashcanClickListener(deleteBtn);
  clearBtnClickListener(clearBtn, category);
  addTransaction.onclick = () => { 
    newTransaction(transactionBar, transactionSubmit, transactionAmount, transactionDate, transactionName, category)
  }
  document.getElementById("categories").appendChild(node);
}


const buildTransactionsList = (transactions, transactionTable) => {
  transactions.forEach(transaction => {
  // transaction name
  var transactionTableRow = document.createElement("tr")
  var transactionNameTextNode = document.createTextNode(transaction.getItem());
  var transactionName = document.createElement("td");
  transactionName.appendChild(transactionNameTextNode);
  transactionTableRow.appendChild(transactionName)

  //transaction date
  var transactionDateTextNode = document.createTextNode(transaction.getDate());
  var transactionDate = document.createElement("td");
  transactionDate.appendChild(transactionDateTextNode);
  transactionTableRow.appendChild(transactionDate)


  //transaction amount
  var transactionAmountTextNode = document.createTextNode(transaction.getAmount());
  var transactionAmount = document.createElement("td");
  transactionAmount.appendChild(transactionAmountTextNode);
  transactionTableRow.appendChild(transactionAmount)
  transactionTable.appendChild(transactionTableRow);
  });
}


const trashcanClickListener = (deleteBtn) => {
  deleteBtn.addEventListener("click", (event) => {
    var confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      categoryList.removeCategoryFromList(deleteBtn.id);
      updatePersistentData(categoryList.getList());
      if (categoryList.getList().length == 0) {
        alert("Category has been deleted");
        localStorage.removeItem("myCategories");
      }
      pageRefresh();
    }
  })
};


const clearBtnClickListener = (clearBtn, category) => {
  clearBtn.addEventListener("click", (event) => {
    var confirmClear = window.confirm("Are you sure you want to clear all transactions from this category?");
    if (confirmClear) {
      category.clearList(clearBtn.id);
      updateTransactionPersistentData(category, category.getList());
      if (category.getList().length == 0) {
        alert("Transactions have been cleared");
        localStorage.removeItem(category.getItem() + "Transactions");
      }
      else alert("Transactions could not be cleared. Please try again.");
      pageRefresh();
    }
  })
};



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