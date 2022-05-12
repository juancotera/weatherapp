import { getWeeklytWeather } from './services/weather.js'
import { getLatlon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDOM } from './utils/dom.js'
import { createPeriodTime } from './period-time.js'
import draggable from './draggable.js'

function tabPanelTemplate(id) {
  return `
  <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
    <div class="dayWeather" id="dayWeather-${id}">
      <ul class="dayWeather-list" id="dayWeather-list-${id}">

      </ul>
    </div>
  </div>
  `
}

function createTabPanel(id) {
  const $panel = createDOM(tabPanelTemplate(id))
  if (id > 0) {
    $panel.hidden = true
  }
  return $panel
}

function configWeeklyWeather(weeklist) {
  const $container = document.querySelector('.tabs')
  weeklist.forEach((day, index) => {
    const $panel = createTabPanel(index)
    $container.append($panel)
    day.forEach((weather, indexWeather) => {
      $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather))
    })
  })
}

export default async function weeklyWeather() {
  const $container = document.querySelector('.weeklyWeather')
  const {lat, lon, isError} = await getLatlon()
  if (isError) return console.log('ha ocurrido un error ubicandote')
  const { isError: weeklytWeatherError , data: weather } = await getWeeklytWeather(lat, lon)
  if (weeklytWeatherError) return console.log('oh! ha ourrido un error trayendo el pronostico del clima')
  const weeklist = formatWeekList(weather.list)
  configWeeklyWeather(weeklist)
  draggable($container)
}