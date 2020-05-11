import { createElement, mainContainer } from 'global.js'

const creaTablero = (numeroElementos, ganador) => {
  const tablero = createElement('div')
  tablero.classList.add('azar')
  for (let i = 0; i < numeroElementos; i++) {
    const elemento = createElement('p')
    elemento.setAttribute('name', i + 1)
    addAction(elemento, ganador)
    tablero.appendChild(elemento)
  }
  mainContainer().appendChild(tablero)
}
const addAction = (elemento, ganador) => {
  elemento.addEventListener('click', event => {
    if (parseInt(elemento.getAttribute('name'), 10) === ganador) {
      /* global alert */
      alert('Ganaste')
    } else {
      /* global */
      alert('Perdiste')
    }
  })
}
const iniciarJuego = () => {
  const numeroInicial = window.prompt('Numero de elementos')
  const ganador = getRndInteger(1, numeroInicial)
  creaTablero(numeroInicial, ganador)
}
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
