const updatePersistentData = (categories) => {
  localStorage.setItem("myCategories", JSON.stringify(categories));
}

var categories = [];
renderCount = 0;

function renderCategories() {
  if (renderCount == 0) {
    var retrievedData = localStorage.getItem("myCategories");
    var retrievedCategories = JSON.parse(retrievedData);
    for (let i = 0; i < retrievedCategories.length; i++) {
      var node = document.createElement("div");
      var textnode = document.createTextNode(retrievedCategories[i]);

      // Variables
      var addTransaction = document.createElement("i");
      var clear = document.createElement("button");
      var clearText = document.createTextNode("clear");
      var deleteBtn = document.createElement("button");
      var categoryTitle = document.createElement("div");
      var categoryHeading = document.createElement("h2");

      // class and id
      categoryTitle.classList.add("categoryTitle");
      deleteBtn.classList.add("fa");
      deleteBtn.classList.add("fa-trash-o");
      node.classList.add("bucket");
      addTransaction.classList.add("fa");
      addTransaction.classList.add("fa-plus-circle");
      addTransaction.style.color = "white";
      addTransaction.style.fontSize = "1.5em";
      node.id = retrievedCategories[i];

      // appendChild
      categoryHeading.appendChild(textnode);
      categoryTitle.appendChild(categoryHeading);
      categoryTitle.appendChild(deleteBtn);
      node.appendChild(categoryTitle);
      categoryTitle.appendChild(addTransaction);
      clear.appendChild(clearText);
      categoryTitle.appendChild(clear);
      document.getElementById("categories").appendChild(node); 

      // finish
      deleteBtn.onclick = function() { 
        deleteCategory(document.getElementById(retrievedCategories[i])) 
      };
      categories.push(retrievedCategories[i]);
      updatePersistentData(categories);
    }
  }
  renderCount = 1;
}

function addCategory() {
  var categoryName = prompt("What are you going to name this one?")
  if (categoryName == "") alert("Oops, the category name can't be blank.")
  else if (categoryName == null) return;
  else {

    // Variables
    var node = document.createElement("div");
    var textnode = document.createTextNode(categoryName);
    var addTransaction = document.createElement("button");
    var deleteBtn = document.createElement("button");
    var addTransaction = document.createElement("i");
    var clear = document.createElement("button");
    var clearText = document.createTextNode("clear");
    var clear = document.createElement("button");
    var clearText = document.createTextNode("clear");
    var categoryTitle = document.createElement("div");
    var categoryHeading = document.createElement("h2");

    // class and id
    categoryTitle.classList.add("categoryTitle");
    deleteBtn.classList.add("fa");
    deleteBtn.classList.add("fa-trash-o");
    node.classList.add("bucket");
    node.id = categoryName;
    addTransaction.classList.add("fa");
    addTransaction.classList.add("fa-plus-circle");
    addTransaction.style.color = "white";
    addTransaction.style.fontSize = "1.5em";

    // appendChild
    categoryHeading.appendChild(textnode);
    categoryTitle.appendChild(categoryHeading);
    categoryTitle.appendChild(deleteBtn);
    node.appendChild(categoryTitle);
    categoryTitle.appendChild(addTransaction);
    clear.appendChild(clearText);
    categoryTitle.appendChild(clear);

    // Finish
    deleteBtn.onclick = function() { deleteCategory(document.getElementById(node.id)) };
    document.getElementById("categories").appendChild(node);
    categories.push(categoryName);
    updatePersistentData(categories);
  }
}

function displayBucket(categoryName) {
  location.href='bucket.html'; 
  if (document.getElementById("bucketHeading")) alert("true");
  else alert("false");
  addTransaction();
}

function addTransaction() {

}

function deleteCategory(node) {
  var confirmDelete = window.confirm("Are you sure you want to delete this category?");
  if (confirmDelete) {
      var categoryName = document.getElementById(node.id);
      document.getElementById("categories").removeChild(node);
      deleteFromPersistent(categoryName);
  }
}

function deleteFromPersistent(categoryName) {
  categories.pop(categoryName);
  updatePersistentData(categories);
}

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