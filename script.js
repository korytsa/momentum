const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');
    
function showTime(){
    let s;
    let w;
    let today = new Date(),
        week = today.getDay(),
        month = today.getMonth(),
        date = today.getDate(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
        switch (month){
        case 0: s ="января"; break;
        case 1: s ="февраля"; break;
        case 2: s ="марта"; break;
        case 3: s ="апреля"; break;
        case 4: s ="мае"; break;
        case 5: s="июня"; break;
        case 6: s ="июля"; break;
        case 7: s ="августа"; break;
        case 8: s ="сентября"; break;
        case 9: s ="октября"; break;
        case 10: s ="ноября"; break;
        case 11: s ="декабря"; break;}

        switch (week){
            case 0: w ="Воскресенье"; break;
            case 1: w ="Понедельник"; break;
            case 2: w ="Вторник"; break;
            case 3: w ="Среда"; break;
            case 4: w ="Четверг"; break;
            case 5: w="Пятница"; break;
            case 6: w ="Суббота"; break;
            }

    
    hour = hour % 24 || 24;
    time.innerHTML = `${w}<span>, </span>${addZero(date)}<span> </span>${s}<br>
    ${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    if(min === 0 && sec === 0){
        numImg = numImgMax - 6;
        numImg = numImg + hour % 6;
        setBgGreet();
}
setTimeout(showTime, 1000);
}

function addZero(n){
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function whatIsPeriod(){
    let today = new Date();
    let hour = today.getHours(); 

    if(hour >= 0 && hour < 6 ){
        dayPeriod = per[0];
        greeting.textContent = "Good Night";
    } else if (hour >= 6 && hour < 12){
        dayPeriod = per[1];
        greeting.textContent = "Good Morning";
    } else if (hour >= 12 && hour < 18){
        dayPeriod = per[2];
        greeting.textContent = "Good Afternoon";
    } else if (hour >= 18 && hour < 24) {
        dayPeriod = per[3];
        greeting.textContent = "Good Evening";
        
    }
    document.body.style.backgroundImage ="url('assets/images/"+dayPeriod+"/"+ numImg +".jpg')";
}

function getName(){
    if (localStorage.getItem('name') === null){
        name.textContent = '[Enter name]';

    } else{
        name.textContent = localStorage.getItem('name');
    }
}

function setName(e) {
    if (e.type === 'keypress') {
        if (e.key === 'Enter' && e.target.innerText !== '') {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
        if (e.key === 'Enter' && e.target.innerText === '') {
            name.blur();
            getName()
        }
    }else if (e.type === 'click'){
        e.target.innerText = '';
        name.focus();
    } else {
        getName()
    }
}

function getFocus(){
    if (localStorage.getItem('focus') === null){
        focus.textContent = '[Enter Focus]';
    } else{
        focus.textContent = localStorage.getItem('focus');
    }
}

function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.key === 'Enter' && e.target.innerText !== '') {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
        if (e.key === 'Enter' && e.target.innerText === '') {
            focus.blur();
            getFocus()
        }
    }else if (e.type === 'click'){
        e.target.innerText = '';
        focus.focus();
    } else {
        getFocus()
    }
}
function clearAll(e){
    e.target.innerHTML = ''
}

const btnBcg = document.querySelector('.btnBcg');

let numImg = parseInt((Math.random() * 13)+1);
let numImgMax = numImg + 6 ; 
let per = ['night','morning','day','evening'];

function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();
        min = today.getMinutes();
        dayPeriod = ''

    whatIsPeriod(hour)
    numImg = numImg + hour % 6;
    document.body.style.backgroundImage ="url('assets/images/"+dayPeriod+"/"+ numImg +".jpg')";
}

function changeImg(){
    btnBcg.disabled = true;
    if(parseFloat(numImg) < numImgMax){
        numImg = ''+(parseFloat(numImg)+1);
    }else{
        numImg = numImgMax-5
    if(per.indexOf(dayPeriod)+1 !== 4 ){
        dayPeriod = per[per.indexOf(dayPeriod)+1]
    }else{
        dayPeriod = per[0]
    }
}
document.body.style.backgroundImage ="url('assets/images/"+dayPeriod+"/"+ numImg +".jpg')";
setTimeout(function() { btnBcg.disabled = false }, 1000);
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clearAll);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clearAll);
btnBcg.addEventListener('click', changeImg);


showTime();
setBgGreet();
getName();
getFocus();
console.log(showTime)



const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
    
async function getQuote() {  
    const url = `https://programming-quotes-api.herokuapp.com/quotes`;
    const res = await fetch(url);
    const data = await res.json(); 
    let item = Math.floor(Math.random()*data.length);
    blockquote.textContent = `${data[item].en}`;
    figcaption.textContent = `${data[item].author}`;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);




const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const speed = document.querySelector('.speed');
const air = document.querySelector('.air');
const city = document.querySelector('.city');


function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = '[Enter City]';
    } else {
        city.textContent = localStorage.getItem('city');
    }
}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.key === 'Enter' && e.target.innerText !== '') {
            localStorage.setItem('city', e.target.innerText);
            getWeather();
            city.blur();
        }
        if (e.key === 'Enter' && e.target.innerText === '') {
            city.blur();
            getCity()
        }
    }else if (e.type === 'click'){
        e.target.innerText = '';
        city.focus();
    } else {
        getCity()
    }
}

async function getWeather() {  
    weatherIcon.className = 'weather-icon owf';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=3a1a4c383125a433d9e95b1ec194e6a0&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    speed.textContent = `Ветер: ${data.wind.speed}км/ч`;
    air.textContent = `Влажность: ${data.main.humidity}%`;
    weatherDescription.textContent = data.weather[0].description;
}


document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);