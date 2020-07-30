const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "todo";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const selectedLi = btn.parentNode;
    toDoList.removeChild(selectedLi);
    const cleanToDos = toDos.filter(function(obj){
        return obj.id !== parseInt(selectedLi.id);
    });
    toDos = cleanToDos;
    saveToDos();
    loadToDoList();
};

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

function paintToDo(text){
    const li = document.createElement("li");
    const listText = document.createElement("span");
    listText.innerText = text;
    const dltBtn = document.createElement("button");
    dltBtn.innerText = "X";
    dltBtn.addEventListener("click", deleteToDo);
    const newId = toDos.length + 1;
    li.appendChild(listText);
    li.appendChild(dltBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
};

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    toDoInput.value = "";
    paintToDo(currentValue); 
};

function loadToDoList(){
    const toDosLoaded = localStorage.getItem(TODOS_LS);
    if(toDosLoaded !== null){
        const parsedToDos = JSON.parse(toDosLoaded);
        while (toDoList.firstChild) {
            toDoList.removeChild(toDoList.firstChild);
        }
        toDos = [];
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
};

function init(){
    loadToDoList();
    toDoForm.addEventListener("submit", handleSubmit);
};

init();