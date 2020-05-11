import { createElement, body } from 'global.js'
import { iniciarJuego } from 'juego.js'
import { iniciar } from 'gato.js'
import { index } from 'cv.js'

const text = text => {
  return document.createTextNode(text)
}
const createElementWithText = (tag, textElement) => {
  const element = createElement(tag)
  element.appendChild(text(textElement))
  return element
}
const iniciarComputadora = () => {
  body().appendChild(createHeader())
}

const getTurnButtonText = text => {
  return text === 'Encender' ? 'Apagar' : 'Encender'
}
const createHeader = () => {
  const header = createElement('header')
  const h1 = createElement('h1')
  const h1Text = text('Computadora de Jorge Tolentino')
  const turnButton = createElement('button')
  const turnButtonText = text('Encender')
  turnButton.appendChild(turnButtonText)
  turnButton.addEventListener('click', turnComputer)
  h1.appendChild(h1Text)
  header.appendChild(h1)
  header.appendChild(turnButton)
  return header
}
const turnComputer = event => {
  if (event.target.innerText === 'Encender') {
    turnOnComputer()
  } else {
    turnOffComputer()
  }
  event.target.innerText = getTurnButtonText(event.target.innerText)
}
const createButton = (textElement, callback) => {
  const element = createElementWithText('button', textElement)
  element.addEventListener('click', callback)
  return element
}
const turnOnComputer = () => {
  const main = createElement('main')
  const h2 = createElementWithText('h2', 'Selecciona una tarea')
  const cvButton = createButton('Pintar mi cv', showCV)
  const azarButton = createButton('Juego del azar', showAzarGame)
  const gatoButton = createButton('Juego del gato', showGatoGame)
  const div = createElement('div')
  div.classList.add('computer')
  main.appendChild(h2)
  main.appendChild(cvButton)
  main.appendChild(azarButton)
  main.appendChild(gatoButton)
  main.appendChild(div)
  body().appendChild(main)
}

const turnOffComputer = () => {
  const main = document.querySelector('main')
  main.remove()
}

const showAzarGame = () => {
  restartContainer()
  iniciarJuego()
}
const showGatoGame = () => {
  restartContainer()
  iniciar()
}
const showCV = () => {
  restartContainer()
  index()
}
const restartContainer = () => {
  document.querySelector('main').removeChild(document.querySelector('main > div'))
  const div = createElement('div')
  div.classList.add('computer')
  document.querySelector('main').appendChild(div)
}
