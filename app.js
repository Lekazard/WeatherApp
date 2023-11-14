// Nykyisen päivämäärän näyttäminen suomeksi
const currentDateElement = document.getElementById("currentDate");
const currentDate = new Date();
currentDateElement.textContent = dateBuilder(currentDate);

// Hakukentän tulosten hakeminen
function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(event.target.value);
  }
}

// Haettujen säätietojen näyttäminen
function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = translateWeatherToFI(weather.weather[0].main);

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

// Säätietojen haku API:sta
async function getResults(cityName) {
  try {
    const weatherData = await fetchWeatherData(cityName);
    displayResults(weatherData);
  } catch (error) {
    console.error('Virhe säätietojen haussa:', error.message);
    alert('Säätietoja ei saatavilla');
  }
}

// Päivämäärän muotoilufunktio suomeksi
function dateBuilder(date) {
  const months = ["tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta"];
  const days = ["sunnuntaina", "maanantaina", "tiistaina", "keskiviikkona", "torstaina", "perjantaina", "lauantaina"];

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${date.getDate()}. ${month} ${year}`;
}

// Käännökset säätyypeille suomeksi
function translateWeatherToFI(weather) {
  switch (weather) {
    case "Thunderstorm":
      return "Ukkonen";
    case "Drizzle":
      return "Tihku";
    case "Rain":
      return "Sade";
    case "Snow":
      return "Lumi";
    case "Mist":
      return "Sumu";
    case "Smoke":
      return "Savu";
    case "Haze":
      return "Sumu";
    case "Dust":
      return "Pöly";
    case "Fog":
      return "Sumu";
    case "Sand":
      return "Hiekkamyrsky";
    case "Ash":
      return "Tuhka";
    case "Squall":
      return "Puuska";
    case "Tornado":
      return "Tornado";
    case "Clear":
      return "Kirkas";
    case "Clouds":
      return "Pilvistä";
    default:
      return weather;
  }
}