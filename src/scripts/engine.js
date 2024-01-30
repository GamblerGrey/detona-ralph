const state ={
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector("enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
    error: 3,
  },

  actions: {
    timerId: setInterval(randomSquare, 1000),
    conutDownTimerId: setInterval(conutDown, 1000),
  }

};


function conutDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0){
        clearInterval(state.actions.conutDownTimerId)
        clearInterval(state.actions.timerId)
        alert("O RALPH DETONOU! o seu resultado foi: " + state.values.result);

    }
}

function playSound(audioName) {
 let audio = new Audio('./src/audios/${audioName}.m4a');
 audio.volume = 0.2;
 audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })


let randomNumber = Math.floor(Math.random()*9);
let randomSquare = state.view.squares[randomNumber];
randomSquare.classList.add("enemy");
state.values.hitPosition = randomSquare.id
}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if(square.id === state.values.hitPosition){
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound("hit");
        }
        if (square.id !== state.values.hitPosition){
            state.values.error--;
            state.view.lives.textContent = state.values.error;
            state.values.hitPosition = null;
            
        }    
        
      });
    });
}

function gameOver() {
    
    state.view.lives.textContent = state.values.error;

    if(state.values.error <= 0){
        alert("Você detonou mais que o RALPH! Seu resultado foi: " + state.values.result);
    }
}gameOver();


function start() {
 
 addListenerHitBox();
}


start();