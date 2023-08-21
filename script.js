document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addButton = document.getElementById("addButton");
  const taskList = document.getElementById("taskList");
  const clearButton = document.getElementById("clearButton");

  addButton.addEventListener("click", addTask);
  clearButton.addEventListener("click", clearAll);

  // Load tasks from local storage on page load
  loadTasks();

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-button">Delete</button>
        <button class="done-button">Mark as Done</button>
      `;

    const deleteButton = listItem.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      taskList.removeChild(listItem);
      saveTasks();
    });

    const doneButton = listItem.querySelector(".done-button");
    doneButton.addEventListener("click", () => {
      listItem.classList.toggle("done");
      saveTasks();
    });

    taskList.appendChild(listItem);
    taskInput.value = "";

    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    const taskElements = taskList.querySelectorAll("li");
    taskElements.forEach((taskElement) => {
      const taskText = taskElement.querySelector("span").textContent;
      const isDone = taskElement.classList.contains("done");
      tasks.push({ text: taskText, done: isDone });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks && tasks.length) {
      tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-button">Delete</button>
            <button class="done-button">Mark as Done</button>
          `;

        if (task.done) {
          listItem.classList.add("done");
        }

        const deleteButton = listItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
          taskList.removeChild(listItem);
          saveTasks();
        });

        const doneButton = listItem.querySelector(".done-button");
        doneButton.addEventListener("click", () => {
          listItem.classList.toggle("done");
          saveTasks();
        });

        taskList.appendChild(listItem);
      });
    }
  }

  function clearAll() {
    const isConfirmed = confirm("Do you really want to delete all tasks?");
    if (isConfirmed) {
      taskList.innerHTML = "";
      localStorage.removeItem("tasks");
    }
  }
});
