// Variable declarations
let pr;
let plu = document.getElementById('pluse');
let tasks = document.querySelector('.tasks');

let todo;
let jsonData = localStorage.getItem("todo");

// Check if there is saved data in local storage and load it into the 'todo' variable
if (jsonData) {
    todo = JSON.parse(jsonData);

    vivi();
} else {
    todo = [];
}

let task;

// Add a click event listener to the 'Add' button
plu.addEventListener('click', () => {
    Swal.fire({
        title: 'Enter your task',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
            if (!value) {
                return 'You must enter a task before saving!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            task = result.value;
            viewTodo();
        }
    });
});


// display the entered task
function viewTodo() {
    let mission = {
        mission: task,
        checked: false,
        bg: false,
    };
    todo.push(mission);
    localStorage.setItem("todo", JSON.stringify(todo));
    vivi(); 
}

// to display tasks
function vivi() {
    let oyo = "";
    for (let i = 0; i < todo.length; i++) {
        let checkedStyle = todo[i].checked ? 'color: #1eff00;' : 'color: #5d5f5e;';
        let bg = todo[i].bg ? 'background-color:#a5ff9a;' : 'background-color:#ffff';

        oyo += `<div id="task" class="task${i}" style="${bg}">
            <i id="pen" class="fa-solid fa-pen-to-square" style="color: #005eff;" onclick="(update(${i}))"></i>
            <i id="check${i}" class="fa-solid fa-circle-check" style="${checkedStyle}" onclick="activ(${i}, this)"></i>
            <i id="delete" class="fa-solid fa-trash" style="color: #ff0f0f;" onclick="del(${i})"></i>
            <h2 id="miss${i}">${todo[i].mission}</h2>
        </div>`;
    }
    tasks.innerHTML = oyo;
}

// update a task
function update(i) {
    Swal.fire({
        title: 'Change Your Task',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
            if (!value) {
                return 'You must enter a task before saving!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector("#miss" + i).innerHTML = result.value;
            let tas = result.value;
            todo[i].mission = tas;
            localStorage.setItem("todo", JSON.stringify(todo));
        }
    });
}

// to activate a task when the check button is clicked
function activ(i, element) {
    let mybg = element;
    if(todo[i].checked == true){
        mybg.style.color =  '#5d5f5e';
        document.querySelector(".task" + i).style.backgroundColor = '#ffff';
        todo[i].checked = false;
        todo[i].bg = false;
    }
    else{
        mybg.style.color ='#1eff00',
        document.querySelector(".task" + i).style.backgroundColor = '#a5ff9a';
        todo[i].checked = true;
        todo[i].bg = true;
    };

    localStorage.setItem("todo", JSON.stringify(todo));
}


// Function to delete a task
function del(i) {
    Swal.fire({
        title: 'Delete Task',
        text: 'Are you sure you want to delete the task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {

            Swal.fire(
                'Task Deleted',
                'The task has been deleted successfully',
                'success'
            );
            
            todo.splice(i, 1);
            vivi();
            localStorage.setItem('todo', JSON.stringify(todo));
        }
    });
}




