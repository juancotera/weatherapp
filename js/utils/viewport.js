//se debe configurar el tamaño del Viewport
//para que en el cualquier dispositivo tome su alto y pueda observars de manera
// correcta.

export function setViewportSize($el) {
  const ViewportBlockSize = getViewport()
  $el.style.blockSize = `${ViewportBlockSize}px`
}

export function getViewport() {
  return window.innerHeight
}

export function onViewportResize(callback) {
  window.addEventListener('resize', callback)
}

export function offViewportResize(callback) {
  window.removeEventListener('resize', callback)
}

export function ViewportSize($el) {
  setViewportSize($el)

  onViewportResize(() => setViewportSize($el))
}