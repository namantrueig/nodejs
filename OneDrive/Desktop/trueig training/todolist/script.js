document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const filterTasks = document.getElementById('filterTasks');

addTaskButton.addEventListener('click', addTask);
filterTasks.addEventListener('change', filterTasksFunction);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // parsing into array
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        createTaskElement(taskText, false);
        saveTaskToLocalStorage(taskText, false);
        taskInput.value = ''; // Clear the input
    } else {
        alert('Please enter a task!');
    }
}

function createTaskElement(taskText, completed) {
    const li = document.createElement('li');  // list item
    li.textContent = taskText;   //setting task content
    if (completed) {
        li.classList.add('completed');
    }

    const completeButton = document.createElement('button'); //create button
    completeButton.textContent = completed ? 'Undo' : 'Complete';
    completeButton.addEventListener('click', function() {
        li.classList.toggle('completed');  //set it to completed
        completeButton.textContent = li.classList.contains('completed') ? 'Undo' : 'Complete';  // based on completed it will change button content
        updateTaskInLocalStorage(taskText, li.classList.contains('completed'));  // save it to local storage
    });

    const editButton = document.createElement('button'); //create edit button
    editButton.textContent = 'Edit'; // set textcontent to edit
    editButton.classList.add('edit');  // setting additional classname 
    editButton.addEventListener('click', function() {
        const newTaskText = prompt('Edit your task:', taskText); 
        if (newTaskText) {
            li.firstChild.textContent = newTaskText; // set the updated task name
            updateTaskInLocalStorage(taskText, li.classList.contains('completed'), newTaskText); // update in localstorage
        }
    });

    const deleteButton = document.createElement('button'); // create delete button
    deleteButton.textContent = 'Delete'; //set button name
    deleteButton.addEventListener('click', function() {   // applying eventlistener
        li.remove();   // remove task from list item
        removeTaskFromLocalStorage(taskText); // remove from localstorage
    });

     // include all buttons in list item
    li.appendChild(completeButton); 
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li); // include the task into tasklist (ul)
}

function saveTaskToLocalStorage(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];  // parse string into array
    tasks.push({ text: taskText, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(oldTaskText, completed, newTaskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === oldTaskText); // find index
    if (taskIndex > -1) {
        tasks[taskIndex].text = newTaskText;
        tasks[taskIndex].completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText); //filter   
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function filterTasksFunction() {
    const filterValue = filterTasks.value; // selected value
    const tasks = taskList.getElementsByTagName('li');  // get all tasks

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]; // current task
        const isCompleted = task.classList.contains('completed'); // staus of that task

        if (filterValue === 'all') {
            task.style.display = ''; // show all
        } else if (filterValue === 'completed' && !isCompleted) { //filtervalue complete and complete status is false
            task.style.display = 'none';  // hide it
        } else if (filterValue === 'pending' && isCompleted) {    //filtervalue pending and complete status is true
            task.style.display = 'none'; // hide
        } else {
            task.style.display = '';  // show all 
        }
    }
}