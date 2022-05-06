import { BASE_API, API_KEY } from "../constants.js"

//fetch devulve una promesa
//enlace de openweathermap https://api.openweathermap.org/data/2.5/weather?lat=-12.0464&lon=-77.0428&appid=233132ea13a168651dca3836c7b107bc
export async function getCurrentWeather(lat, lon) {
  const response = await fetch(`${BASE_API}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  if (!response.ok) return {
    isError: true,
    data: null
  }
  const data = await response.json()
  return {
    isError: false,
    data,
  }
}

export async function getWeeklytWeather(lat, lon) {
  const response = await fetch(`${BASE_API}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  if (!response.ok) return {
    isError: true,
    data: null
  }
  const data = await response.json()
  return {
    isError: false,
    data,
  }
}