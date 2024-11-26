const createTask = document.querySelector("#task");
const createDescription = document.querySelector("#description");
const tarefas = document.querySelector("#list ul");
const form = document.querySelector("form");
let checkBox;
let excluir;

let listOfTask = [];

const options = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}

class Task {
  constructor(task, description, date, done) {
    this.task = task;
    this.description = description;
    this.date = date;
    this.done = done;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTask = new Task(createTask.value, createDescription.value, new Date(), false);
  listOfTask.push(newTask);
  localStorage.setItem("list", JSON.stringify(listOfTask));
  createTask.value = "";
  createDescription.value = "";
  criaLista();
});

function criaLista() {
  tarefas.innerHTML = "";

  const list = JSON.parse(localStorage.getItem("list"));

  
  list.forEach((itens, index) => {
    //Converte itens.date em data.
    itens.date = new Date(itens.date);
    const li = document.createElement("li");
    li.classList.add('card-line');
    li.innerHTML = `
      <div>
        <input type="checkbox" data-id="${index}" id="check-${index}" ${itens.done ? 'checked' : ''}>
        <label for="check-${index}" class="${itens.done ? 'done' : 'none'}">
          <span class="task-title">${itens.task} </span> <hr>
        </label>
        
      </div>
      <div>
        <span class="task-date">${itens.date.toLocaleDateString('pt-BR',options)}</span>
      <p class="task-description">${itens.description}</p> 
      </div>
      <div  class="task-remove">
        <a href="#" id="${index}">
      <i class="bi bi-trash3-fill"> Remover Tarefa</i></a>
      </div>
      
      
    `;
    tarefas.append(li);
  });

  excluir = document.querySelectorAll("a");
  checkBox = document.querySelectorAll("input[type='checkbox']");
  removeItem();
  checkItem();
  sort();
}

function removeItem() {
  for (let link of excluir) {
    link.addEventListener("click", () => {
      listOfTask.splice(link.id, 1);
      localStorage.setItem("list", JSON.stringify(listOfTask));
      criaLista();  // Atualizar a lista após excluir
    });
  }
}

function checkItem() {
  for (let check of checkBox) {
    check.addEventListener("change", () => {
      const index = check.dataset.id;
      const getTask = document.querySelector(`label[for="check-${index}"]`);

      if (check.checked) {
        listOfTask[index].done = true;
        getTask.classList.add('done');
        getTask.classList.remove('none');
      } else {
        listOfTask[index].done = false;
        getTask.classList.remove('done');
        getTask.classList.add('none');
        
      }

      localStorage.setItem("list", JSON.stringify(listOfTask));  // Atualiza o estado no localStorage
    });
  }
}

function sort(){

  const itensList = document.getElementById(
    'itens-list'
  );
  
  new Sortable(itensList, {
    animation: 250,
    ghostClass: 'task-drag'
});
 
}

/* Menu Off-Canvas */
const config = document.querySelector(".btn-config");
const menuOfCanvas = document.querySelector(".menu-offcanvas");

config.addEventListener("click", () => {
  menuOfCanvas.style.marginRight = 0;
});

const close = document.querySelector(".close");

close.addEventListener("click", () => {
  menuOfCanvas.style.marginRight = "-500px";
});

