function geolocationSupport() {
  // if ('geolocation' in navigator){
  //   return true
  // }
  // return false
  return 'geolocation' in navigator //esto hace lo mismo que lo anterior
}

const defaultOptions = {
  enableHighAccurady: true,
  timeout: 5000,
  maximumAge: 1000000,
}


export function getCurrentPosition( option = defaultOptions){
  if (!geolocationSupport()) throw new Error('No hay soporte de geolocalización en tu navegador') //obejto de error

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      resolve(position)
      // console.log(lat, lon)
      // console.log('esto ES getCurrentPosition')
    }, () => {
      reject('no hemos podido obtener tu ubicación')
    }, option)
  })
}

export async function getLatlon(option = defaultOptions) {
  try {
    const { coords: { latitude: lat, longitude: lon } } = await getCurrentPosition(option)
    return {lat, lon, isError: false}
  } catch {
    return {isError: true, lat: null, lon: null}
  }
}
