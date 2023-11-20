const WEATHER_API_KEY = "869818480b17893359d0afb2e4dfd3a8";

const cityInput = document.querySelector("#city-input");
const weatherButton = document.querySelector("#weather-button");

const weatherDetailsBlock = document.querySelector("#weather-details-block");
const cityTitle = document.querySelector("#city-title");
const weatherImg = document.querySelector("#weather-details__img");
const weatherDescription = document.querySelector("#weather-details__description");
const dateText = document.querySelector("#date");
const temperatureText = document.querySelector("#temperature");
const feelsLikeText = document.querySelector("#feels-like");
const cloudsText = document.querySelector("#clouds");
const humidityText = document.querySelector("#humidity");
const sunriseText = document.querySelector("#sunrise");
const sunsetText = document.querySelector("#sunset");

const weatherCarousel = document.querySelector("#weather-carousel");
const prevArrow = document.querySelector("#prev-arrow");
const nextArrow = document.querySelector("#next-arrow");
const carouselContent = document.querySelector("#weather-carousel__content");

const weekDays = ["ВС","ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

let carouselIndex = 0;
let maxCarouselIndex = 0;


async function fetchData(url) {
        let response = await fetch(`${url}?q=${cityInput.value}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`)
        let data = await response.json();

        if(response.ok) {
            return data;
        } else {
            throw new Error(data.message)
        }
        
}

async function getWeather() {
    try {
        const currentWeather = await fetchData("https://api.openweathermap.org/data/2.5/weather");
        const forecast = await fetchData("https://api.openweathermap.org/data/2.5/forecast");

        showMainInformation(currentWeather);
        showWeatherDetails(currentWeather);
        showForecast(forecast);

    } catch (error) {
        alert(error.message);
        console.log(error.message);
    }
    
}


/* function getWeather() {
    fetchData("https://api.openweathermap.org/data/2.5/weather", (data) => {
        showMainInformation(data);
        showWeatherDetails(data);
    });
    fetchData("https://api.openweathermap.org/data/2.5/forecast", showForecast);
} */

function showMainInformation(data) {
    cityTitle.textContent = data.name;
    sunriseText.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    sunsetText.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
}


function showWeatherDetails(data) {
    console.log(data);

    weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    weatherDescription.textContent = data.weather[0].description;
    dateText.textContent = getDate(data.dt);
    temperatureText.textContent = `${data.main.temp}°C`;
    feelsLikeText.textContent = `${data.main.feels_like}°C`;
    cloudsText.textContent = `${data.clouds.all}%`;
    humidityText.textContent = `${data.main.humidity}%`;
    
    weatherDetailsBlock.classList.remove("hide");
}

function showForecast(data) {
    console.log(data);
    carouselIndex = 0;
    maxCarouselIndex = Math.floor(data.list.length / 3);
    carouselContent.innerHTML = "";

    for(let i = 0; i < data.list.length; i++) {
        const weatherItem = createWeatherItem(data.list[i]);
        carouselContent.append(weatherItem);
    }

    weatherCarousel.classList.remove("hide");

    moveCarousel();
}

function createWeatherItem(itemData) {
    const weatherItem = document.createElement("div");
    const date = getDate(itemData.dt);
    const iconURL = `https://openweathermap.org/img/wn/${itemData.weather[0].icon}@4x.png`;
    const description = itemData.weather[0].description;
    const temp = itemData.main.temp;

    weatherItem.classList.add("weather-item");
    weatherItem.innerHTML = `
        <h4>${date}</h4>
        <div class="weather-item__information">
            <figure class="weather-item__figure">
                <img class="weather-item__img" src="${iconURL}" alt="${description}">
                <figcaption class="weather-item__description">${description}</figcaption>
            </figure>
            <div class="weather-item__text-block">
                <p class="weather-item__text"><span class="weather-item__value">${temp}°C</span></p>
            </div>
        </div>
    `;

    weatherItem.addEventListener("click", () => showWeatherDetails(itemData));

    return weatherItem;
}

function getDate(dt) {
    const date = new Date(dt * 1000);
    const day = date.getDay();

    return `${weekDays[day]} ${date.toLocaleTimeString()}`;
}


function moveCarousel() {
    carouselContent.style.transform = `translate(${carouselIndex * -795}px)`;
}

function next() {
    carouselIndex += 1;

    if(carouselIndex > maxCarouselIndex) {
        carouselIndex = maxCarouselIndex;
    }

    moveCarousel();
}

function prev() {
    carouselIndex -= 1;

    if(carouselIndex < 0) {
        carouselIndex = 0
    }

    moveCarousel();
}

weatherButton.addEventListener("click", getWeather);
nextArrow.addEventListener("click", next);
prevArrow.addEventListener("click", prev);
