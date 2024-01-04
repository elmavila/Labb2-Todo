const urlParams = new URLSearchParams(window.location.search) // hämta sökvägen
const userId = urlParams.get("userId")
let todos = []
let div = document.querySelector("#todos")

if (!userId) {
  alert("The requested page was not found")
} else {
  const userHeader = document.createElement("h3")
  userHeader.innerHTML = "Loading..."
  div.appendChild(userHeader)

  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      const userHeading = document.getElementById("userHeader")
      // if the user is not found, we get an empty object which we know because it doesnt contain any properties
      if (Object.keys(user).length === 0) {
        userHeading.innerText = "No matching users found."
        div.innerHTML = ""
        return
      }

      userHeading.innerText = `User: ${user.name}`

      fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
        .then((response) => response.json())
        .then((todoData) => {
          todos = todoData

          if (todos.length === 0) {
            div.innerHTML = "The user has completed all tasks 😊."
            return
          }

          // Anropa printUsers igen för att visa todos
          printTodos(todos)
        })
    })
}

function printTodos(todos) {
  if (todos) {
    div.innerHTML = ""

    for (let i = 0; i < todos.length; i++) {
      const todoParagraph = document.createElement("li")
      todoParagraph.setAttribute("id", todos[i].id)
      todoParagraph.innerHTML = todos[i].title
      todoParagraph.addEventListener("click", onTodoClick)
      div.appendChild(todoParagraph)
    }
  }
}

function onTodoClick(event) {
  const todoParagraph = event.target
  let todoId = todoParagraph.getAttribute("id")
  todoParagraph.classList.toggle("completed")
}
