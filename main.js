let inpuText = document.querySelector('#inpuText')
let header = document.querySelector('header h2')
let submit = document.querySelector('.submit')
let todoList = document.querySelector('.todoList')
document.addEventListener('DOMContentLoaded', loadTasks)

//saves the tasks to local storege
function saveTasks () {
  const tasks = Array.from(todoList.children).map(task => ({
    Title: task.firstChild.textContent,
    Date: new Date().getDate(),
    Id: new Date().getTime()
  }))
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//loads tasks from local storage if there are any
function loadTasks () {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  tasks.forEach(task => {
    addTaskToDOM(task)
  })
}
function deleteTodo () {
  this.parentNode.remove()
  saveTasks()
}

//replaces the header with the task clicked
function headeReplace () {
  header.innerHTML = this.firstChild.textContent
}

//creates the task in list 'el', and delete button, then appends to todoList
function addTaskToDOM (todos) {
  let el = document.createElement('li')
  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.style =
    'background-color:grey; margin-left: 20px; border: 1px solid lightslategray; border-radius: 2px;'
  deleteBtn.onclick = deleteTodo
  el.style = 'cursor: pointer; font-size: large; color: whitesmoke;'
  el.appendChild(document.createTextNode(todos.Title))
  el.appendChild(deleteBtn)
  el.onclick = headeReplace
  todoList.appendChild(el)
}
submit.addEventListener('click', () => {
  let title = inpuText.value
  let todos
  if (title === '') {
    //prevent empty tasks
    header.innerHTML = inpuText.placeholder
    inpuText.placeholder = 'Please input something'
  } else {
    todos = {
      Title: title,
      //get the date and time task was created
      Date: new Date().getDate(),
      Id: new Date().getTime()
    }
    addTaskToDOM(todos)
    saveTasks()
    //resets inpuText value 
    inpuText.value = ''
  }
})
