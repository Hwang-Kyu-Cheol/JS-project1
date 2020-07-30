const weather = document.querySelector(".js-weather");

const API_KEYS = "34d747d27b47c269be65453245db28d1";
const COORDS = "coords";

function getWeather(latitude, longitude){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEYS}&units=metric`
    ).then(function(weatherData){
        weatherData = weatherData.json();
        return weatherData;
    }).then(function(data){
        const temperature = data.main.temp;
        const location = data.name;
        console.log(temperature, location);
        weather.innerText = `${temperature} at ${location}`;
    });
};

function saveCoords(posObj){
    localStorage.setItem(COORDS, JSON.stringify(posObj));
};

function handlePosSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const posObj = {
        latitude,
        longitude
    }
    saveCoords(posObj);
    getWeather(latitude, longitude);
};

function handlePosFail(){
    console.log("Can't access Position");
};

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handlePosSuccess, handlePosFail);
};

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
};

function init(){
    loadCoords();
};

init();