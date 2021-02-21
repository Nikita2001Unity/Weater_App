const api = {
    key: "5a69fa1f4b696fa6a97365c679e1d0c9",
    base: "https://api.openweathermap.org/data/2.5/"
}


const searchbox = document.querySelector('.search-box');

searchbox.addEventListener('keypress', setQuery);

const UpdateBackgroud = () =>{
    const date = new Date();;
    const time = date.getHours();
    const morning =[5,6,7,8,9,10];
    const noon = [11,12,13,14,15,16];
    const evening = [17,18,19,20];
    const night = [21,22,23,24,1,2,3,4];

      if (morning.includes(time)) {
          console.log('Morninf is now');
          document.body.style.backgroundImage = 'https://img1.goodfon.ru/wallpaper/nbig/e/84/firewatch-game-priroda.jpg';
      }
      else if(noon.includes(time)){
          console.log('noon')
        document.body.style.backgroundImage = 'url(https://poster.nicefon.ru/2018_12/02/1080x610/255663d8ecee9ece8c03c0.jpg)';
      }
      else if(evening.includes(time)){
          console.log('evening')
          document.body.style.backgroundImage = 'url(https://img1.goodfon.ru/original/1366x768/1/f5/firewatch-igra-minimalizm.jpg)'

      }
      else if(night.includes(time)){
          document.body.style.backgroundImage = 'url(https://img4.goodfon.ru/wallpaper/nbig/9/47/firewatch-campo-santo-solntse-zakat-kholmy-vid-les-peizazh-i.jpg)';
      }
  }    

UpdateBackgroud();

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(wheater => {
        return wheater.json();
    }).then(displayResults)
}

function displayResults(weather) {
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');

    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current .temp');

    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°c<span/>`;

    let weather_el = document.querySelector('.current .weather');

    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');

    hilow.innerText = `${weather.main.temp_min}°c / ${weather.main.temp_max}°c`



}


function dateBuilder(d){
    const months = ["January", "February", "March", "April", "May",
                    "June", "July", "August", "September", "October", 
                    "November", "December"];
    const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

    let day = days[d.getDay()];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}
