import { getWeeklytWeather } from './services/weather.js'
import { getLatlon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDOM } from './utils/dom.js'

function configWeeklyWeather(weeklist) {
  const $container = document.querySelector('.weeklyWeather')
  weeklist.forEach((item) => {
    const $el = createDOM('<h2>hola mundo!</h2>')
    $container.append($el)
  })
}

export default async function weeklyWeather() {
  const {lat, lon, isError} = await getLatlon()
  if (isError) return console.log('ha ocurrido un error ubicandote')
  const { isError: weeklytWeatherError , data: weather } = await getWeeklytWeather(lat, lon)
  if (weeklytWeatherError) return console.log('oh! ha ourrido un error trayendo el pronostico del clima')
  const weeklist = formatWeekList(weather.list)
  configWeeklyWeather(weeklist)
}