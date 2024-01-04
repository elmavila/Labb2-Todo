const div = document.querySelector("#todo")
let users = []
const getUsersUrl = "https://jsonplaceholder.typicode.com/users"

fetch(getUsersUrl)
  .then((response) => response.json())
  .then((result) => {
    users = result
    console.log(users)
    printUsers(result)
  })

function printUsers(users) {
  div.innerHTML = "" // rensa alla användare i diven
  if (users.length === 0) {
    div.innerHTML = "No matching users found."
    return
  }

  for (let i = 0; i < users.length; i++) {
    const userParagraph = document.createElement("p")
    userParagraph.setAttribute("id", users[i].id)
    userParagraph.innerText = `${users[i].name}\n${users[i].email}`
    userParagraph.addEventListener("click", onUserClick)
    div.appendChild(userParagraph)
  }
}

function onUserClick(event) {
  const userParagraph = event.target
  let userId = userParagraph.getAttribute("id")
  window.location.href = `todos.html?userId=${userId}` // navigera till användarens todos
}

document.querySelector("#searchButton").addEventListener("click", search)

document.querySelector("#searchName").addEventListener("change", search)

function search() {
  const searchName = document.querySelector("#searchName").value

  function matchUsername(user) {
    return user.name.toLowerCase().startsWith(searchName.toLowerCase())
  }

  if (searchName) {
    const foundUsers = users.filter(matchUsername)
    printUsers(foundUsers)
  } else {
    printUsers(users)
  }
}
