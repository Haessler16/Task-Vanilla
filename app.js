const TaskForm = document.getElementById("taskform").addEventListener('submit', saveTask);

function saveTask(e){
    let titulo = document.getElementById("title").value
    let descripcion = document.getElementById("description").value
    const task = {
        titulo,
        descripcion
    }
    if(localStorage.getItem("data") === null){
        const tareas = []
        tareas.push(task)
        window.localStorage.setItem("data", JSON.stringify(tareas))
    }else{
        const respuesta = JSON.parse(window.localStorage.getItem("data"))
        respuesta.push(task)
        localStorage.setItem("data", JSON.stringify(respuesta))
    }

    getTask()
    document.getElementById("taskform").reset()
    e.preventDefault()
}

function getTask(){
    let traer = JSON.parse(window.localStorage.getItem("data"))
    let taskView = document.getElementById("tasks")
    taskView.innerHTML = ""

    for(let i = 0; i < traer.length; i++){
        let titulo = traer[i].titulo
        let descripcion = traer[i].descripcion

        taskView.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                <p>${titulo} - ${descripcion}</p>
                <a class="btn btn-danger" onclick="deleteTask('${titulo}')"> Detele </a>
            </div>
        `
    }
}

function deleteTask(title){
    const data = JSON.parse(window.localStorage.getItem("data"))
    const filteredData = data.filter( tarea => tarea.titulo !== title)
    window.localStorage.setItem("data", JSON.stringify(filteredData))
    getTask()
}

getTask()
