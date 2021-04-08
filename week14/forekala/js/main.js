import CategoryList from "./categoryList.js"
import CategoryItem from "./categoryItem.js"
import TransactionItem from "./transactionItem.js"


const categoryList = new CategoryList;

// number currency formatter
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

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
      categories.forEach(category => {
        if (category.getItem() == newTransaction._parentCategory) {
          category.addTransactionToList(newTransaction);
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
    const newCategory = createNewCategory(category._item, category._id, category._planned);
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
const createNewCategory = (categoryName, categoryId, categoryPlanned) => {
  const category = new CategoryItem();
  category.setId(categoryId);
  category.setItem(categoryName);
  category.setPlanned(categoryPlanned);
  return category;
}


// adds a new category when the "Add Category" button is pushed
function addCategory() {
  const categoryName = prompt("What are you going to name this one?")
  if (categoryName == "") alert("Oops, the category name can't be blank.")
  else if (categoryName == null) return;
  else {
    const nextCategoryId = calcCategoryId();
    const categoryPlanned = 0;
    const newCategory = createNewCategory(categoryName, nextCategoryId, categoryPlanned);
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


const calculateCategorySpent = (category) => {
  var test = category.getList();
  var totalSpent = 0;
  test.forEach(transaction => {
    totalSpent += parseInt(transaction.getAmount());
  })
  return totalSpent;
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

  // build the total bar at the bottom of each category
  var totalBar = document.createElement("table");
  var totalBarHeader = document.createElement("tr");
  var totalBarPlanned = document.createElement("th");
  totalBarPlanned.id = "link";
  var totalBarPlannedText = document.createTextNode("Planned");
  totalBarPlanned.appendChild(totalBarPlannedText);
  var totalBarSpent = document.createElement("th");
  var totalBarSpentText = document.createTextNode("Spent");
  totalBarSpent.appendChild(totalBarSpentText);
  var totalBarLeft = document.createElement("th");
  var totalBarLeftText = document.createTextNode("Left");
  totalBarLeft.appendChild(totalBarLeftText);
  totalBar.appendChild(totalBarHeader);
  totalBarHeader.appendChild(totalBarPlanned);
  totalBarHeader.appendChild(totalBarSpent);
  totalBarHeader.appendChild(totalBarLeft);
  var totalBarContent = document.createElement("tr");
  var totalPlannedAmount = document.createElement("td");
  var getPlanned = formatter.format(category.getPlanned());
  var totalPlannedText = document.createTextNode(getPlanned);
  totalPlannedAmount.appendChild(totalPlannedText);
  var totalSpentAmount = document.createElement("td");
  var totalSpentCalculated = calculateCategorySpent(category);
  var totalSpentFormatted = formatter.format(totalSpentCalculated);
  var totalSpentText = document.createTextNode(totalSpentFormatted);
  totalSpentAmount.appendChild(totalSpentText);
  var totalLeftAmount = document.createElement("td");
  var totalLeftFormatted = formatter.format(category.getPlanned() - totalSpentCalculated);
  var totalLeftText = document.createTextNode(totalLeftFormatted);
  if (category.getPlanned() - totalSpentCalculated < 0) totalLeftAmount.style.color = "red";
  totalLeftAmount.appendChild(totalLeftText);
  totalBarContent.appendChild(totalPlannedAmount);
  totalBarContent.appendChild(totalSpentAmount);
  totalBarContent.appendChild(totalLeftAmount);
  totalBar.appendChild(totalBarContent);
  totalBar.id = "totalBar";

  // transaction table header
  var transactionTableHeader = document.createElement("tr");
  var tableNameHeader = document.createElement("th")
  var tableNameHeaderText = document.createTextNode("Vendor");
  tableNameHeader.appendChild(tableNameHeaderText);
  var tableDateHeader = document.createElement("th")
  var tableDateHeaderText = document.createTextNode("Date");
  tableDateHeader.appendChild(tableDateHeaderText);
  var tableAmountHeader = document.createElement("th")
  var tableAmountHeaderText = document.createTextNode("Amount");
  tableAmountHeader.appendChild(tableAmountHeaderText);
  transactionTable.appendChild(transactionTableHeader);
  transactionTableHeader.appendChild(tableNameHeader)
  transactionTableHeader.appendChild(tableDateHeader)
  transactionTableHeader.appendChild(tableAmountHeader)
  var transactionBar = document.createElement("div");
  transactionBar.id = "transactionBar";
  var transactionName = document.createElement("input");
  var transactionAmount = document.createElement("input")
  transactionAmount.type = "number";
  var transactionDate = document.createElement("input")
  transactionDate.type = "date";
  var transactionSubmitText = document.createTextNode("Track Expense");
  var transactionSubmit = document.createElement("a");
  var transactions = category.getList();
  buildTransactionsList(transactions, transactionTable, category);

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
  node.appendChild(totalBar);
  node.appendChild(transactionBar);
  node.appendChild(transactionTable);
  transactionBar.appendChild(transactionName);
  transactionBar.appendChild(transactionDate);
  transactionBar.appendChild(transactionAmount);
  transactionSubmit.appendChild(transactionSubmitText);
  transactionBar.appendChild(transactionSubmit);

  // Onclick and finish
  trashcanClickListener(deleteBtn);
  clearBtnClickListener(clearBtn, category);
  plannedClickListener(totalBarPlanned, category);
  addTransaction.onclick = () => { 
    newTransaction(transactionBar, transactionSubmit, transactionAmount, transactionDate, transactionName, category)
  }
  document.getElementById("categories").appendChild(node);
}


const buildTransactionsList = (transactions, transactionTable, category) => {
  transactions.forEach(transaction => {

  // transaction name
  var transactionTableRow = document.createElement("tr")
  var transactionNameTextNode = document.createTextNode(transaction.getItem());
  var transactionName = document.createElement("td");
  transactionName.id = "link";
  transactionNameClickListener(transactionName, transaction, category);
  transactionName.appendChild(transactionNameTextNode);
  transactionTableRow.appendChild(transactionName)

  //transaction date
  var transactionDateTextNode = document.createTextNode(transaction.getDate());
  var transactionDate = document.createElement("td");
  transactionDate.id = "link";
  transactionDateClickListener(transactionDate, transaction, category);
  transactionDate.appendChild(transactionDateTextNode);
  transactionTableRow.appendChild(transactionDate)

  //transaction amount
  var newAmount = formatter.format(transaction.getAmount());
  var transactionAmountTextNode = document.createTextNode(newAmount);
  var transactionAmount = document.createElement("td");
  transactionAmount.id = "link";
  transactionAmountClickListener(transactionAmount, transaction, category);
  transactionAmount.appendChild(transactionAmountTextNode);
  transactionTableRow.appendChild(transactionAmount)
  transactionTable.appendChild(transactionTableRow);
  });
}


const transactionNameClickListener = (transactionName, transaction, category) => {
  transactionName.addEventListener("click", (event) => {
    var newName = prompt("Edit transaction vendor name:")
    if (newName == "") {
      alert("Transaction date cannot be empty. Please try again.");
      return;
    }
    else if (newName == null) return;
    else {
      transaction.setItem(newName);
      updateTransactionPersistentData(category, category.getList());
      pageRefresh();
    }
  })
}


const transactionDateClickListener = (transactionDate, transaction, category) => {
  transactionDate.addEventListener("click", (event) => {
    var newDate = prompt("Edit transaction date:")
    if (newDate == "") {
      alert("Transaction date cannot be empty. Please try again.");
      return;
    }
    else if (newDate == null) return;
    else {
      transaction.setDate(newDate);
      updateTransactionPersistentData(category, category.getList());
      pageRefresh();
    }
  })
}


const transactionAmountClickListener = (transactionAmount, transaction, category) => {
  transactionAmount.addEventListener("click", (event) => {
    var newAmount = prompt("Edit transaction amount:")
    if (newAmount == "") {
      alert("Transaction date cannot be empty. Please try again.");
      return;
    }
    else if (newAmount == null) return;
    else {
      transaction.setAmount(newAmount);
      updateTransactionPersistentData(category, category.getList());
      pageRefresh();
    }
  })
}


const trashcanClickListener = (deleteBtn) => {
  deleteBtn.addEventListener("click", (event) => {
    var confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      alert("Category has been deleted");
      categoryList.removeCategoryFromList(deleteBtn.id);
      updatePersistentData(categoryList.getList());
      if (categoryList.getList().length == 0) {
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



const plannedClickListener = (totalBarPlanned, category) => {
  totalBarPlanned.addEventListener("click", (event) => {
    var planned = prompt("How much are you planning for the month?")
    if (planned == "") planned = 0;
    else if (planned == null) return;
    else {
      category.setPlanned(planned);
      updatePersistentData(categoryList.getList());
      pageRefresh();
    }
  })
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