var taskInput = document.getElementById("new-task");
var addButton = document.querySelectorAll("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function(taskString) {
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");

    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = 'task__description';

    checkBox.type = "checkbox";
    checkBox.className = "task__checkbox"

    editInput.type = "text";
    editInput.className = "task__text-input";

    editButton.innerText = "Edit";
    editButton.className = "button task__edit-button";

    deleteButton.className = "button task__delete-button";
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.className = "delete-button-image"
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.className = 'task'

    return listItem;
}

var addTask = function() {
    console.log("Add Task...");

    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

var editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector(".task__text-input");
    var label = listItem.querySelector(".task__description");
    var editBtn = listItem.querySelector(".task__edit-button");
    var containsClass = listItem.classList.contains("task_edit-mode");

    if(containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";

    } else{
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("task_edit-mode");
}

var deleteTask = function() {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
}

var taskCompleted = function() {
    console.log("Complete Task...");

    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
    console.log("Incomplete Task...");

    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function() {
    console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");

    var checkBox = taskListItem.querySelector(".task__checkbox");
    var editButton = taskListItem.querySelector(".task__edit-button");
    var deleteButton = taskListItem.querySelector(".task__delete-button");
    
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}