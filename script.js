const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

loadTasks();

function addTask() {

    if(taskInput.value.trim() === ""){
        alert("Vazifa kiriting!");
        return;
    }

    const task = {
        text: taskInput.value,
        completed: false
    };

    let tasks = getTasks();
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    loadTasks();
}

function getTasks(){
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks(){

    taskList.innerHTML = "";

    let tasks = getTasks();

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button class="delete-btn"
                onclick="deleteTask(${index})">X</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index){

    let tasks = getTasks();

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

function deleteTask(index){

    let tasks = getTasks();

    tasks.splice(index,1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}