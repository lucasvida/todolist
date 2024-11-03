const createTask = document.querySelector("#task");
const tarefas = document.querySelector("#list ul");
const form = document.querySelector("form");
let checkBox;
let excluir;

let listOfTask = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  listOfTask.push(createTask.value);
  createTask.value = "";
  criaLista();
});

function criaLista() {
  tarefas.innerHTML = "";
  for (const itens of listOfTask) {
    const index = listOfTask.indexOf(itens);
    const li = document.createElement("li");
    li.innerHTML = `
           <input type="checkbox" data-id="${index}" id="check-${index}">
<label for="check-${index}">${itens}</label>
<a href="#" id="${index}"><i class="bi bi-trash3-fill"></i></a>
        `;
    tarefas.append(li);
  }
  excluir = document.querySelectorAll("a");
  checkBox = document.querySelectorAll("input[type='checkbox']");
  removeItem();
  checkItem();
}

function removeItem() {
  for (let link of excluir) {
    link.addEventListener("click", () => {
      listOfTask.splice(link.id, 1);
      criaLista();
    });
  }
}

function checkItem() {
  for (let check of checkBox) {
    check.addEventListener("change", () => {
      const getTask = document.querySelector(
        `label[for="check-${check.dataset.id}"]`
      );
      if (check.checked) {
        getTask.style.textDecoration = "line-through";
        getTask.style.color = "red";
      } else {
        getTask.style.textDecoration = "";
        getTask.style.color = "";
      }
    });
  }
}
