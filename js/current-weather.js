// import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from './utils/format-data.js'
import { weatherConditionsCodes } from './constants.js'
import { getLatlon } from './geolocation.js'
import { getCurrentWeather } from './services/weather.js'

 //usaremos el $ para hacer referencias a elementos del DOM

//date
function setCurrentDate($el) {
  const date = new Date() //hacemos un instancia a una nueva fecha y haremos referencia a la fecha actual
  const formattedDate = formatDate(date)
  $el.textContent = formattedDate
}

//city
function setCurrentCity($el, city) {
  $el.textContent = city
}

//temp
function setCurrentTemp($el, temp) {
  $el.textContent = formatTemp(temp)
}

//background
function solarStatus(sunsetTime, sunriseTime) {
  const currentHours = new Date().getHours() // tomamos la fecha actual para poder hacer el calculo, como solo uasmos las horas por eso llamamos a su metodo getHours
  const sunsetHours = sunsetTime.getHours()
  const sunriseHours = sunriseTime.getHours()

  if (currentHours > sunsetHours || currentHours < sunriseHours) {
    return 'night'
  }
  return 'morning'
}

function setBackground($el, conditionCode, solarStatus) { // recepcionamos el argumento solarStatus
  const weatherType = weatherConditionsCodes[conditionCode] //tremos la condicion que tiene el nombre del tiempo
  const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : '' //
  //true ? '@2x' : '' //operador ternario, si el valor es true, dara como resultado '@2x' ó ''
  $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}

function showCurrentWeather($app, $loader) {
  $app.hidden = false
  $loader.hidden = true
}

//
function configCurrentWeather(weather){
  const $app = document.querySelector('#app')
  const $loading = document.querySelector('#loading')

  //loader
  showCurrentWeather($app, $loading)
  //date
  const $currentWeatherDate = document.querySelector('#current-weather-date')
  setCurrentDate($currentWeatherDate)
  //city
  const $currentWeatherCity = document.querySelector('#current-weather-city')
  const city = weather.name
  setCurrentCity($currentWeatherCity, city)
  //temp
  const $currentWeatherTemp = document.querySelector('#current-weather-temp')
  const temp = weather.main.temp // constante para oredenar mejor el código
  setCurrentTemp($currentWeatherTemp, temp) // sin la constante iría ($currentWeatherTemp, weather.main.temp)
  //background
  const sunriseTime = new Date(weather.sys.sunrise * 1000) //creamos nuevas fechas con new Date
  const sunsetTime = new Date(weather.sys.sunset * 1000)
  const conditionCode = String(weather.weather[0].id).charAt(0)// condicion del nombre del clima clean/drezzly/rainy etc
  setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime)) // pasaremos la función solarStatus y debolvermo como argumento
}


export default async function currentWeather() {
  //GEO | API-WEATHER | CONFIG
  console.log('esto pasa ANTES de getCurrentPosition')
  const {lat, lon, isError} = await getLatlon()
  if (isError) return console.log('ha ocurrido un error ubicandote')
  // console.log(lat, lon)
  // .then((data) =>{
  //   console.log('hemos triunfado', data)
  // })
  // .catch((message) => {
  //   console.log(message)
  // })
  // console.log('esto pasa DESPUES de getCurrentPosition')
  const { isError: currentWeatherError , data: weather} = await getCurrentWeather(lat, lon)
  if (currentWeatherError) return console.log('oh! ha ourrido un error trayendo los datos del cliente')
  configCurrentWeather(weather)
  // console.log('Weather')
}

