// Selecting the elements from the DOM
const form = document.querySelector(".form");
const taskName = document.getElementById("taskName");
const assignedTo = document.getElementById("assignedTo");
const dueDate = document.getElementById("dueDate");
const taskDescription = document.getElementById("taskDescription");
const addTaskBtn = document.getElementById("addBtn");
const taskLists = document.querySelector('.task-lists');

// Load tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to display tasks
function displayTasks() {
    taskLists.innerHTML = ""; // Clear existing tasks
    tasks.forEach(task => {
      const taskContainer = document.createElement('div');
      const contentContainer = document.createElement('div'); // Wrapper for text content
      const buttonContainer = document.createElement('div'); // Wrapper for buttons
      const h2 = document.createElement('h5');
      const p = document.createElement('p');
      const h3 = document.createElement('h3');
      const h4 = document.createElement('h4');
      const deleteButton = document.createElement('button');
      const editButton = document.createElement('button');
  
      // Add classes and styles to the task container
      taskContainer.classList.add('task-container');
      taskContainer.style.marginBottom = '10px';
      taskContainer.style.padding = '10px';
      taskContainer.style.border = '1px solid #ddd';
      taskContainer.style.borderRadius = '5px';
      taskContainer.style.backgroundColor = '#fff';
      taskContainer.style.display = 'flex';
      taskContainer.style.justifyContent = 'space-around';
      taskContainer.style.alignItems = 'center';
  
      h2.innerHTML = task.name;
      p.innerHTML = task.description;
      h3.innerHTML = task.assignedTo;
      h4.innerHTML = task.dueDate;
  
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger','me-2');
      deleteButton.addEventListener('click', () => deleteTask(task));
  
      editButton.textContent = 'Edit';
      editButton.classList.add('btn', 'btn-primary');
      editButton.addEventListener('click', () => editTask(task));
  
      // Wrap text content and buttons in separate containers
      contentContainer.appendChild(h2);
      contentContainer.appendChild(p);
      contentContainer.appendChild(h3);
      contentContainer.appendChild(h4);
      contentContainer.style.color = 'tomato';
      contentContainer.style.opacity = '0.8';
      contentContainer.style.width ='80%'
  
      buttonContainer.appendChild(deleteButton);
      buttonContainer.appendChild(editButton);
  
      // Append content and button containers to the main task container
      taskContainer.appendChild(contentContainer);
      taskContainer.appendChild(buttonContainer);
  
      taskLists.appendChild(taskContainer);
    });
  }
  

// Function to add a task
function addTask() {
  const name = taskName.value;
  const description = taskDescription.value;
  const assigned = assignedTo.value;
  const due = dueDate.value;
  
  if (name && description && assigned && due) {
    tasks.push({ name, description, assignedTo: assigned, dueDate: due });
    saveTasksToLocalStorage();
    displayTasks();
    clearForm();
  } else {
    alert("All fields are required to add a task.");
  }
}

// Function to delete a task
function deleteTask(task) {
  const taskIndex = tasks.indexOf(task);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    saveTasksToLocalStorage();
    displayTasks();
  }
}

// Function to edit a task
function editTask(task) {
  const newName = prompt("Enter new task name:", task.name);
  if (newName !== null) {
    task.name = newName;
    saveTasksToLocalStorage();
    displayTasks();
  }
}

// Function to clear the form
function clearForm() {
  taskName.value = "";
  taskDescription.value = "";
  assignedTo.value = "";
  dueDate.value = "";
}

// Event listener for the "Add Task" button
addTaskBtn.addEventListener('click', function(e) {
  e.preventDefault();
  addTask();
});

// Display initial tasks on page load
document.addEventListener("DOMContentLoaded", function() {
  displayTasks();
});
