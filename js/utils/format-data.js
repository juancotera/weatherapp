//date
const defaultDateOption = { //hara que los parametros de la fecha salga con los datos solicitados
  day: 'numeric', // el día como un numero
  weekday: 'long', // nombre del día de la semana
  month: 'long', // nombre del mes
}

export function formatDate(date, options = defaultDateOption) {
  return new Intl.DateTimeFormat('es', options).format(date)
}

//temp
export function formatTemp(value) {
  return `${Math.floor(value)}°` // Math.floor para dovelver numero redondeado menor
}

export function formatWeekList(rawData) {
  let dayList = []
  const weeklist = []
  rawData.forEach((item, index) => {
    dayList.push(item)
    if ((index + 1)git  % 8 === 0) {
      weeklist.push(dayList)
      dayList = []
    }
  })
  return weeklist
}