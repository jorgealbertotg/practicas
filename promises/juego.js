const levelOne = (value) => {
  return new Promise((resolve, reject) => {
    resolve(value + 5)
  })
}
function levelTwo(value, callback) {
  let newScore = value + 10;
  callback(newScore);
}
function levelThree(value, callback) {
  let newScore = value + 30;
  callback(newScore);
}
function startGame() {
  let currentScore = 5;
  console.log('Comenzó el juego! La puntuación actual es ' + currentScore);
  levelOne(currentScore, (levelOneReturnedValue) => {
      console.log('¡Nivel Uno alcanzado! El nuevo puntaje es ' + levelOneReturnedValue);
      levelTwo(levelOneReturnedValue, (levelTwoReturnedValue) => {
          console.log('¡Nivel Dos alcanzado! El nuevo puntaje es ' + levelTwoReturnedValue);
          levelThree(levelTwoReturnedValue, (levelThreeReturnedValue) => {
              console.log('¡Nivel Tres alcanzado! El nuevo puntaje es ' + levelThreeReturnedValue);
          });
      });
  });
}
startGame();