document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    document.getElementById('addTaskBtn').addEventListener('click', handleSaveTask);
});

let tasks = [];
let editTaskId = null;

function handleSaveTask() {
    if (editTaskId) {
        updateTask();
    } else {
        addTask();
    }
}

function addTask() {
    const taskInput = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (taskInput === "") {
        alert("Por favor, ingrese una tarea.");
        return;
    }

    const task = {
        id: Date.now(),
        description: taskInput,
        priority: parseInt(priority)
    };

    tasks.push(task);
    tasks.sort((a, b) => a.priority - b.priority);

    saveTasks();
    renderTasks();
    clearForm();
}

function renderTasks() {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item');
        taskDiv.innerHTML = `
            <div class="task-content">
                <p>${task.description} 
                    <span class="priority ${task.priority === 1 ? 'high' : 'low'}">
                        ${task.priority === 1 ? 'Alto' : 'Bajo'}
                    </span>
                </p>
            </div>
            <button class="delete-btn" data-id="${task.id}">Eliminar</button>
        `;

        taskList.appendChild(taskDiv);
    });

    // Añadir evento de eliminar a cada botón
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => deleteTask(parseInt(button.dataset.id)));
    });

    // Añadir evento de editar a cada tarea
    document.querySelectorAll('.task-item .task-content').forEach(content => {
        content.addEventListener('click', () => populateForm(parseInt(content.parentElement.querySelector('.delete-btn').dataset.id)));
    });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function populateForm(id) {
    const task = tasks.find(t => t.id === id);
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskPriority').value = task.priority;
    editTaskId = id;
    document.getElementById('addTaskBtn').innerText = "Guardar Cambios";
}

function updateTask() {
    const taskInput = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (taskInput === "") {
        alert("Por favor, ingrese una tarea.");
        return;
    }

    const taskIndex = tasks.findIndex(task => task.id === editTaskId);
    tasks[taskIndex].description = taskInput;
    tasks[taskIndex].priority = parseInt(priority);

    saveTasks();
    renderTasks();
    clearForm();
}

function clearForm() {
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskPriority').value = '1';
    document.getElementById('addTaskBtn').innerText = "Agregar Tarea";
    editTaskId = null;
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}
