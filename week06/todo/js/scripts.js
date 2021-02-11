// Event Listener for the enter key to submit a task to the list
addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
    document.getElementById('taskName').value = '';
  }
})

// Adds a task to the todo list
function addTask() {
  var taskName = document.getElementById("taskName").value;
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(taskName));
  li.setAttribute("class", "task");
  tasks.appendChild(li);
  taskCounter(li);
}

// Removes a task from the todo list by selecting the 'X' to the right of the item
function removeTask() {

}

// Counts how many tasks are in the list and displays it in the task list footer
function taskCounter(li) {
  var numOfTasks = document.querySelectorAll('.task').length;
  if (numOfTasks == 0) {
    document.getElementById("taskCounter").innerHTML = "0 tasks left";
  }
  else if (numOfTasks == 1) {
    document.getElementById("taskCounter").innerHTML = "1 task left";
    var allDone = document.getElementById("allDone");
    allDone.classList.add("notAllDone");
  }
  else {
    document.getElementById("taskCounter").innerHTML = numOfTasks + " tasks left";
  }
}