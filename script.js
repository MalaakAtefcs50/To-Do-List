let app = document.getElementById("app");
let taskInput = document.getElementById("taskInput"); 
let addBtn = document.getElementById("addBtn");
let message = document.getElementById("message");
let taskCount = document.getElementById("taskCount");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskCount.textContent = tasks.length;
}

function renderTasks() {
  taskList.innerHTML = "";
  
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    let taskSpan = document.createElement("span");
    taskSpan.textContent = task.text; 
     
    let noteInput = document.createElement("input");
    noteInput.type = "text";
    noteInput.placeholder = "Add a note";
    noteInput.value = task.note || "";
    
    noteInput.addEventListener("input", function() {
      tasks[index].note = noteInput.value;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
     
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
     
    deleteBtn.addEventListener("click", function() {
      tasks.splice(index, 1);
      saveTasksToLocalStorage();
      renderTasks();
      message.textContent = "Task deleted";
    });

    li.appendChild(taskSpan);
    li.appendChild(noteInput);
    li.appendChild(deleteBtn); 
    taskList.appendChild(li); 
  });

  taskCount.textContent = tasks.length;
}

addBtn.addEventListener("click", function() {
  let taskText = taskInput.value.trim(); 

  if (taskText === "") {
    message.textContent = 'Please enter a valid task!';
    return;
  }
  
  tasks.push({
    text: taskText,
    note: ""
  });

  saveTasksToLocalStorage();
  renderTasks();

  message.textContent = "Task added successfully!";
  taskInput.value = "";
});

renderTasks();
