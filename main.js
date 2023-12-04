let inpuText = document.querySelector('#inpuText')
let header = document.querySelector('header h2')
let submit = document.querySelector('.submit')
document.addEventListener('DOMContentLoaded', loadTasks)

function saveTasks () {
  const tasks = Array.from(todoList.children).map(task => ({
    Title: task.firstChild.textContent,
    Date: new Date().getDate(),
    Id: new Date().getTime()
  }))
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

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

function headeReplace () {
  header.innerHTML = this.firstChild.textContent
}

function addTaskToDOM (todos) {
  let el = document.createElement('li')
  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.style =
    'background-color:grey; margin-left: 20px; border: 1px solid lightslategray; border-radius: 2px'
  deleteBtn.onclick = deleteTodo
  el.style = 'cursor: pointer'
  el.appendChild(document.createTextNode(todos.Title))
  el.appendChild(deleteBtn)
  el.onclick = headeReplace
  todoList.appendChild(el)
}

submit.addEventListener('click', () => {
  let title = inpuText.value
  let todos
  if (title === '') {
    inpuText.placeholder = 'Please input something'
  } else {
    todos = {
      Title: title,
      Date: new Date().getDate(),
      Id: new Date().getTime()
    }
    saveTasks()
    addTaskToDOM(todos)
    inpuText.value = ''
  }
})
let todoList = document.querySelector('.todoList')
