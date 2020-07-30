const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const USER_LS_KEY = "currentUser",
    SHOWING_CN = "showing";

function saveName(key, value){
    localStorage.setItem(key, value);
};

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    saveName(USER_LS_KEY, currentValue);
    loadName();
};

function askName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
};

function paintText(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
};

function loadName(){
    const currentUser = localStorage.getItem(USER_LS_KEY);
    if(currentUser === null){
        askName();
        document.querySelector(".js-toDoForm").classList.remove(SHOWING_CN);
        document.querySelector(".js-toDoList").classList.remove(SHOWING_CN);
    } else {
        paintText(currentUser);
        document.querySelector(".js-toDoForm").classList.add(SHOWING_CN);
        document.querySelector(".js-toDoList").classList.add(SHOWING_CN);
    }
};

function init(){
    loadName();
};

init();