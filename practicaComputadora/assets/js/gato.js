import { createElement, mainContainer } from 'global.js'

const iniciar = () => {
  let marca = 'o'
  let status = 0
  let callback

  const tablero = createElement('div')
  tablero.classList.add('gato')
  for (let i = 0; i < 9; i++) {
    const elemento = createElement('p')
    tablero.appendChild(elemento)
    elemento.addEventListener('click', callback = () => {
      if (status === 0 && elemento.innerText === '') {
        marca = getMarca(marca)
        elemento.innerText = marca
        status = juega(marca)
      }
      elemento.removeEventListener('click', callback)
    })
  }
  mainContainer().appendChild(tablero)
}

const getMarca = (marca) => {
  return marca === 'x' ? 'o' : 'x'
}

const juega = marca => {
  if (gameOver()) {
    /* global alert */
    alert(`Ganador: ${marca}`)
    return 1
  }
  return 0
}
const getTablero = () => {
  return Array.from(document.querySelectorAll('p')).map(cuadro => {
    return cuadro.innerText
  })
}
const gameOver = () => {
  const tablero = getTablero()
  if (
    (tablero[0] !== '' && (tablero[0] === tablero[1]) && (tablero[1] === tablero[2])) ||
    (tablero[3] !== '' && (tablero[3] === tablero[4]) && (tablero[4] === tablero[5])) ||
    (tablero[6] !== '' && (tablero[6] === tablero[7]) && (tablero[7] === tablero[8])) ||
    (tablero[0] !== '' && (tablero[0] === tablero[3]) && (tablero[3] === tablero[6])) ||
    (tablero[1] !== '' && (tablero[1] === tablero[4]) && (tablero[4] === tablero[7])) ||
    (tablero[2] !== '' && (tablero[2] === tablero[5]) && (tablero[5] === tablero[8])) ||
    (tablero[0] !== '' && (tablero[0] === tablero[4]) && (tablero[4] === tablero[8])) ||
    (tablero[2] !== '' && (tablero[2] === tablero[4]) && (tablero[4] === tablero[6]))
  ) {
    return true
  }
  return false
}
