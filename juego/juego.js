const body = () => {
  return document.querySelector('body')
}
const createElement = tag => {
  return document.createElement(tag)
}
const creaTablero = (numeroElementos, ganador) => {
  const tablero = createElement('div')
  for(let i = 0; i < numeroElementos; i++){
    const elemento = createElement('p')
    elemento.setAttribute('name', i + 1)
    addClickEvent(elemento, ganador)
    tablero.appendChild(elemento)
  }
  body().appendChild(tablero)
}
const addClickEvent = (elemento, ganador) => {
  elemento.addEventListener('click', event => {
    if( parseInt(elemento.getAttribute('name'), 10) === ganador){
      alert("Ganaste")
    }
    else {
      alert("Perdiste")
    }
  });
}
const iniciarJuego = () => {
  const numeroInicial = window.prompt("Numero de elementos");
  const ganador = getRndInteger(1, numeroInicial)
  creaTablero(numeroInicial, ganador)
  console.log(ganador);
}
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}