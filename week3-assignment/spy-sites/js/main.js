"use strict"

let originalData = null
let map = null
let marker = null

document.querySelector("#reset-button").addEventListener("click", () => {
  update(originalData)
})

const createCard = (image, title, texts, id) => {
  let text = ""
  for (let t of texts) {
    text += `<p class="card-text">${t}</p>`
  }

  return `<img class="card-img-top" src="${image}" alt="">
            <div class="card-block">
                <h3 class="card-title">${title}</h3>
                ${text}                
            </div>
            <div class="card-footer" id="${id}">
                <p><button class="btn btn-primary">View</button></p>
                <p><button onclick="removeCard" id="del-btn" class="btn btn-primary">Delete</button></p>
            </div>`
}

const categoryButtons = items => {
  items = removeDuplicates(items, "category")
  console.log(items)
  document.querySelector("#categories").innerHTML = ""
  for (let item of items) {
    const button = document.createElement("button")
    button.class = "btn btn-secondary"
    button.innerText = item.category
    document.querySelector("#categories").appendChild(button)
    button.addEventListener("click", () => {
      sortItems(originalData, item.category)
    })
  }
}

const sortItems = (items, rule) => {
  const newItems = items.filter(item => item.category === rule)
  // console.log(newItems);
  update(newItems)
}

const getData = () => {
  fetch("/spy/posts")
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(items => {
      originalData = items
      update(items)
    })
}

const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}
const removeCard = (element) => {
  var parent = element.parentNode
  alert(parent.id)
}
const update = items => {
  categoryButtons(items)
  document.querySelector(".card-deck").innerHTML = ""
  for (let item of items) {
    // console.log(item);
    const article = document.createElement("article")
    article.setAttribute("class", "card")
    const time = moment(item.time)
    article.innerHTML = createCard(item.thumbnail, item.title, [
      "<small>" + time.format("dddd, MMMM Do YYYY, HH:mm") + "</small>",
      item.details
    ],item._id)
    article.addEventListener("click", () => {
      document.querySelector(".modal-body img").src = item.image
      document.querySelector(".modal-title").innerHTML = item.title

      const myModal = $("#myModal")
      myModal.on("shown.bs.modal", () => {})
      myModal.modal("show")
    })
    document.querySelector(".card-deck").appendChild(article)
  }
}

getData()

// add new
document.querySelector("#spyForm").addEventListener("submit", evt => {
  evt.preventDefault()
  const data = new FormData(evt.target)
  const fileElement = evt.target.querySelector("input[type=file]")
  const file = fileElement.files[0]
  data.append("file", file)

  const url = "/spy/new"

  fetch(url, {
    method: "post",
    body: data
  }).then(resp => {
    // console.log(resp);
    getData()
    $("#myTabs a:first").tab("show")
  })
})

// init tabs
$("#myTabs a").click(function(e) {
  e.preventDefault()
  $(this).tab("show")
})
