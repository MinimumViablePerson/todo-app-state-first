// todo: { text: 'Go shopping', completed: false }

let state = {
  todos: [
    { text: 'Go shopping', completed: true },
    { text: 'Work out', completed: false },
    { text: 'See the doctor', completed: false },
    { text: 'Learn JS', completed: true },
  ],
  showCompleted: true,
}

// input: none
// action: gets the incomplete todos
// output: the incomplete todos
function getIncompleteTodos() {
  return state.todos.filter(todo => todo.completed === false)
}

function getCompleteTodos() {
  return state.todos.filter(todo => todo.completed === true)
}

function getTodosToDisplay() {
  if (state.showCompleted) return state.todos
  else return getIncompleteTodos()
}

// input: text: string
// action: add a new todo to the list if it doesn't already exist
// output: undefined
function createTodo(text) {
  // check if the todo is in the list
  let foundMatch = state.todos.some(todo => todo.text === text)
  if (foundMatch) return // guard statement

  state.todos.push({ text: text, completed: false })
}

// input: text: string
// action: remove a todo that has this *text*
// output: undefined
function deleteTodo(text) {
  let updatedTodos = state.todos.filter(todo => todo.text !== text)
  state.todos = updatedTodos
}

// input: none
// action: empty the todo list
// output: undefined
function deleteAllTodos() {
  state.todos = []
}

// input: text: string
// action: turn a todo from completed true to false, or vice versa
// output: undefined
function toggleTodo(text) {
  // find the todo we want to toggle
  let match = state.todos.find(todo => todo.text === text)
  if (!match) return

  // if it exists, toggle it
  match.completed = !match.completed
}

// input: nothing
// action: change showCompleted from true to false, or vice versa
// output: undefined
function toggleShowCompleted() {
  state.showCompleted = !state.showCompleted
}

function renderAddTodoForm() {
  let formEl = document.createElement('form')

  let textInput = document.createElement('input')
  textInput.type = 'text'
  textInput.placeholder = 'Add your todo here...'

  let addTodoBtn = document.createElement('button')
  addTodoBtn.textContent = 'ADD TODO'

  formEl.addEventListener('submit', function (event) {
    event.preventDefault()
    createTodo(textInput.value)
    render()
  })

  formEl.append(textInput, addTodoBtn)
  document.body.append(formEl)
}

function renderShowCompleted() {
  let showCompletedLabel = document.createElement('label')
  showCompletedLabel.textContent = 'Show completed: '

  let showCompletedCheckbox = document.createElement('input')
  showCompletedCheckbox.type = 'checkbox'
  if (state.showCompleted) showCompletedCheckbox.checked = true
  showCompletedCheckbox.addEventListener('click', function () {
    toggleShowCompleted()
    render()
  })

  showCompletedLabel.append(showCompletedCheckbox)
  document.body.append(showCompletedLabel)
}

function renderTodoList() {
  let todoList = document.createElement('ul')

  // an li for each todo in my list
  let todosToDisplay = getTodosToDisplay()
  for (let todo of todosToDisplay) {
    let liEl = document.createElement('li')

    liEl.addEventListener('click', function () {
      // update state
      toggleTodo(todo.text)
      // render
      render()
    })

    if (todo.completed) liEl.className = 'todo completed'
    else liEl.className = 'todo'

    liEl.textContent = todo.text

    let deleteBtn = document.createElement('button')
    deleteBtn.textContent = '🗑'
    deleteBtn.addEventListener('click', function () {
      deleteTodo(todo.text)
      render()
    })
    liEl.append(deleteBtn)

    todoList.append(liEl)
  }

  document.body.append(todoList)
}

function render() {
  document.body.textContent = ''

  renderAddTodoForm()
  renderShowCompleted()
  renderTodoList()
}

render()
