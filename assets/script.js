document.addEventListener('DOMContentLoaded', () => {
    const newTaskBtn = document.getElementById('new-task-btn');
    const modal = document.getElementById('task-modal');
    const closeModalBtn = document.querySelector('.close');
    const taskForm = document.getElementById('task-form');

    const loadTasks = () => {
        const notStarted = document.getElementById('not-started');
        const inProgress = document.getElementById('in-progress');
        const completed = document.getElementById('completed');

        notStarted.innerHTML = '';
        inProgress.innerHTML = '';
        completed.innerHTML = '';

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToBoard(task);
        });
    };

    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToBoard = (task) => {
        const taskEl = document.createElement('div');
        taskEl.classList.add('task');
        taskEl.setAttribute('draggable', true);
        taskEl.dataset.id = task.id;
        taskEl.dataset.status = task.status;

        const now = new Date();
        const deadline = new Date(task.deadline);

        if (now > deadline) {
            taskEl.classList.add('red');
        } else if ((deadline - now) / (1000 * 60 * 60 * 24) <= 2) { 
            taskEl.classList.add('yellow');
        }

        taskEl.classList.add(`task[data-status="${task.status}"]`);

        taskEl.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Deadline: ${task.deadline}</p>
            <button class="delete-btn">Delete</button>
        `;

        taskEl.querySelector('.delete-btn').addEventListener('click', () => {
            deleteTask(task.id);
        });

        const taskList = document.getElementById(task.status);
        taskList.appendChild(taskEl);

        taskEl.addEventListener('dragstart', dragStart);
        taskEl.addEventListener('dragend', dragEnd);
    };

    const deleteTask = (taskId) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks(tasks);
        loadTasks();
    };

    let draggedTask = null;

    const dragStart = (e) => {
        draggedTask = e.target;
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
    };

    const dragEnd = (e) => {
        setTimeout(() => {
            e.target.style.display = 'block';
            draggedTask = null;
        }, 0);
    };

    const columns = document.querySelectorAll('.task-list');
    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedTask) {
                const newStatus = column.id;
                const taskId = draggedTask.dataset.id;
                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                tasks = tasks.map(task => {
                    if (task.id === taskId) {
                        task.status = newStatus;
                    }
                    return task;
                });
                saveTasks(tasks);
                loadTasks();
            }
        });
    });

    newTaskBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-desc').value;
        const deadline = document.getElementById('task-deadline').value;

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            deadline,
            status: 'not-started'
        };

        tasks.push(newTask);
        saveTasks(tasks);

        addTaskToBoard(newTask);

        taskForm.reset();
        modal.style.display = 'none';
    });

    
    modal.style.display = 'none';

    loadTasks();
});
