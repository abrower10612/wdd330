import ToDoList from "./todolist.js"
import ToDoItem from "./todoitem.js"

const toDoList = new ToDoList();

var view = "active";

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  const itemEntryForm = document.getElementById("itemEntryForm");
  itemEntryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    processSubmission();
  });

  const clearItems = document.getElementById("clearItems");
  clearItems.addEventListener("click", (event) => {
    const list = toDoList.getList();
    if (list.length) {
      const confirmed = confirm("Are you sure you want to clear the entire list?");
      if (confirmed) {
        toDoList.clearList();
        updatePersistentData(toDoList.getList());
        refreshThePage();
        taskCounter();
      }
    }
  });

  const clearCompleted = document.getElementById("clearCompleted");
  clearCompleted.addEventListener("click", (event) => {
    const completedList = toDoList.getCompleted();
    if (completedList.length) {
      const confirmed = confirm("Are you sure you want to clear your completed tasks?");
      if (confirmed) {
        toDoList.clearCompleted();
        completedPersistentData(toDoList.getCompleted());
        refreshThePage();
      }
    }
  });


  // Procedural
  loadListObject();
  loadCompletedListObject();
  refreshThePage();
}

const loadListObject = () => {
  const storedList = localStorage.getItem("myToDoList");
  if (typeof storedList != "string") return;
  const parsedList = JSON.parse(storedList);
  parsedList.forEach(itemObj => {
    const newToDoItem = createNewItem(itemObj._id, itemObj._item);
    toDoList.addItemToList(newToDoItem);
  })
}

const loadCompletedListObject = () => {
  const completedList = localStorage.getItem("completedList");
  if (typeof completedList != "string") return;
  const parsedList = JSON.parse(completedList);
  parsedList.forEach(itemObj => {
    toDoList.addItemToCompletedList(itemObj);
  })
}

const refreshThePage = () => {
  clearListDisplay();
  if (view === "active") renderList();
  else renderCompletedList();
  clearItemEntryField();
  setFocusOnItemEntry();
  taskCounter();
}

const showCompleted = document.getElementById("showCompleted");
showCompleted.addEventListener("click", (event) => {
  view = "completed";
  renderCompletedList();
});

const showActive = document.getElementById("showActive");
showActive.addEventListener("click", (event) => {
  view = "active";
  renderList();
});

const clearListDisplay = () => {
  const parentElement = document.getElementById("listItems");
  deleteContents(parentElement);
}

const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

const renderList = () => {
  document.getElementById("completed").style.visibility === 'hidden';
  document.getElementById("listItems").style.visibility === 'visible';
  const list = toDoList.getList();
  list.forEach(item => {
    buildListItem(item);
  })
}

const renderCompletedList = () => {
  document.getElementById("completed").style.visibility === 'visible';
  document.getElementById("listItems").style.visibility === 'hidden';
  const completedList = toDoList.getCompleted();
  completedList.forEach(item => {
    buildListItem(item);
  })
}

const buildListItem = (item) => {
  const div = document.createElement("div");
  div.className = "item";
  const check = document.createElement("input");
  check.type = "checkbox";
  check.id = item.getId();
  check.tabIndex = 0;
  addClickListenerToCheckbox(item, check);
  const label = document.createElement("label");
  label.htmlFor = item.getId();
  label.textContent = item.getItem();
  // const deleteItem = document.createElement("button");
  // deleteItem.type = "button";
  // deleteItem.id = item.getId();
  // deleteItem.textContent = "X";
  // addClickListenerToDeleteItem(deleteItem);
  // div.appendChild(deleteItem);
  div.appendChild(check);
  div.appendChild(label);
  const container = view === 'active' ? document.getElementById("listItems") : document.getElementById("completed");
  container.appendChild(div);
};

const addClickListenerToDeleteItem = (deleteItem) => {
  deleteItem.addEventListener("click", (event) => {
    toDoList.removeItemFromList(deleteItem.id);
    updatePersistentData(toDoList.getList());
    setTimeout(() => {
      refreshThePage();
    }, 1000);
  });
};

const addClickListenerToCheckbox = (item, checkbox) => {
  checkbox.addEventListener("click", () => {
    const itemId = item.getId();
    toDoList.completedItem(item, itemId);
    updatePersistentData(toDoList.getList());
    completedPersistentData(toDoList.getCompleted());
    setTimeout(() => {
      refreshThePage();
    }, 1000);
  });
};

const updatePersistentData = (listArray) => {
  localStorage.setItem("myToDoList", JSON.stringify(listArray));
}

const completedPersistentData = (listArray) => {
  localStorage.setItem("completedList", JSON.stringify(listArray));
}

const clearItemEntryField = () => {
  document.getElementById("newItem").value = "";
}

const setFocusOnItemEntry = () => {
  document.getElementById("newItem").focus();
}

const processSubmission = () => {
  const newEntryText = getNewEntry();
  if (!newEntryText.length) return;
  const nextItemId = calcNextItemId();
  const toDoItem = createNewItem(nextItemId, newEntryText);
  toDoList.addItemToList(toDoItem);
  updatePersistentData(toDoList.getList());
  refreshThePage();
}

const getNewEntry = () => {
  return document.getElementById("newItem").value.trim();
}

const calcNextItemId = () => {
  let nextItemId = 1;
  const list = toDoList.getList();
  if (list.length > 0) {
    nextItemId = list[list.length - 1].getId() + 1;
  }
  return nextItemId;
}

const createNewItem = (itemId, itemText) => {
  const toDo = new ToDoItem();
  toDo.setId(itemId);
  toDo.setItem(itemText);
  taskCounter();
  return toDo;
} 

function taskCounter() {
  const taskList = toDoList.getList().length;
  if (taskList === 0)
    document.getElementById("taskCount").innerHTML = "0 Tasks Left"
  else if (taskList === 1)
    document.getElementById("taskCount").innerHTML = "1 Task Left"
  else 
    document.getElementById("taskCount").innerHTML = taskList + " Tasks Left"
}