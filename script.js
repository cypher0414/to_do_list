const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filters = document.querySelectorAll('.filter-btn');
const prioritySelect = document.getElementById('priority-select');

let currentFilter = 'all';

// Add Task
addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;
    if (!text) return;

    const li = document.createElement('li');
    li.classList.add(priority);

    // Task text span
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = text;
    taskTextSpan.style.flex = "1";
    taskTextSpan.style.cursor = "pointer";

    // Edit on double click
    taskTextSpan.addEventListener('dblclick', () => {
        const newText = prompt("Edit task:", taskTextSpan.textContent);
        if(newText) taskTextSpan.textContent = newText;
    });

    li.appendChild(taskTextSpan);

    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        applyFilter();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    taskInput.value = '';
    applyFilter();
});

// Filter buttons
filters.forEach(btn => {
    btn.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        applyFilter();
    });
});

function applyFilter() {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach(task => {
        if(currentFilter === 'all') task.style.display = 'flex';
        else if(currentFilter === 'active') task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
        else if(currentFilter === 'completed') task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
    });
}

// Enter key to add
taskInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') addBtn.click();
});

// Drag and Drop
let dragged = null;
taskList.addEventListener('dragstart', e => dragged = e.target);
taskList.addEventListener('dragover', e => e.preventDefault());
taskList.addEventListener('drop', e => {
    e.preventDefault();
    if (e.target.tagName === 'LI' && dragged) {
        taskList.insertBefore(dragged, e.target.nextSibling);
    }
});

// Make li draggable
taskList.addEventListener('DOMNodeInserted', () => {
    taskList.querySelectorAll('li').forEach(li => li.setAttribute('draggable', true));
});
