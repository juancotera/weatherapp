import { getWeeklytWeather } from './services/weather.js'
import { getLatlon } from './geolocation.js'

function configWeeklyWeather() {

}

export default async function weeklyWeather() {
  const {lat, lon, isError} = await getLatlon()
  if (isError) return console.log('ha ocurrido un error ubicandote')
  const { isError: weeklytWeatherError , data: weather } = await getWeeklytWeather(lat, lon)
  if (weeklytWeatherError) return console.log('oh! ha ourrido un error trayendo el pronostico del clima')
  debugger
  configWeeklyWeather(weather)
}