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
      var deleteBtn = document.createElement("button");
      var categoryTitle = document.createElement("div");
      var categoryHeading = document.createElement("h2");
      categoryTitle.classList.add("categoryTitle");
      deleteBtn.classList.add("fa");
      deleteBtn.classList.add("fa-trash-o");
      node.classList.add("bucket");
      node.id = retrievedCategories[i];
      categoryHeading.appendChild(textnode);
      categoryTitle.appendChild(categoryHeading);
      categoryTitle.appendChild(deleteBtn);
      node.appendChild(categoryTitle);
      deleteBtn.onclick = function() { 
        deleteCategory(document.getElementById(retrievedCategories[i])) 
      };
      // node.onclick = function URL() {
      //   displayBucket(retrievedCategories[i]);
      // };
      document.getElementById("categories").appendChild(node);
      categories.push(retrievedCategories[i]);
      updatePersistentData(categories);
    }
  }
  renderCount = 1;
}

// function common() {
//   var node = document.createElement("div");
//     var textnode = document.createTextNode(categoryName);
//     var deleteBtn = document.createElement("button");
//     var categoryTitle = document.createElement("div");
//     var categoryHeading = document.createElement("h2");
//     categoryTitle.classList.add("categoryTitle");
//     deleteBtn.classList.add("fa");
//     deleteBtn.classList.add("fa-trash-o");
//     node.classList.add("bucket");
//     categoryHeading.appendChild(textnode);
//     categoryTitle.appendChild(categoryHeading);
//     categoryTitle.appendChild(deleteBtn);
//     node.appendChild(categoryTitle);
// }

function addCategory() {
  var categoryName = prompt("What are you going to name this one?")
  if (categoryName == "") alert("The name of the category can't be blank.")
  else if (categoryName == null) return;
  else {
    var node = document.createElement("div");
    var textnode = document.createTextNode(categoryName);
    var deleteBtn = document.createElement("button");
    var categoryTitle = document.createElement("div");
    var categoryHeading = document.createElement("h2");
    categoryTitle.classList.add("categoryTitle");
    deleteBtn.classList.add("fa");
    deleteBtn.classList.add("fa-trash-o");
    node.classList.add("bucket");
    node.id = categoryName;
    categoryHeading.appendChild(textnode);
    categoryTitle.appendChild(categoryHeading);
    categoryTitle.appendChild(deleteBtn);
    node.appendChild(categoryTitle);
    deleteBtn.onclick = function() { deleteCategory(document.getElementById(node.id)) };
    // node.onclick= function URL() {location.href='bucket.html'; };
    // node.onclick = function() { displayBucket(document.getElementById(node.id)) };
    document.getElementById("categories").appendChild(node);
    categories.push(categoryName);
    updatePersistentData(categories);
  }
}

function displayBucket(categoryName) {
  location.href='bucket.html'; 
  document.getElementById("bucketHeading").innerHTML = categoryName;
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