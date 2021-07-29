//connecting
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const buttonSelects = document.querySelector('.button-selects');

//create header
let heading = document.createElement('h1');
heading.innerHTML = 'semi-tone ear trainer';
header.appendChild(heading);

//create main buttons
let startBtn = document.createElement('button');
startBtn.innerHTML = 'begin training';
startBtn.addEventListener('click', startGame);
main.appendChild(startBtn);


let replayBtn = document.createElement('button');
replayBtn.innerHTML = 'replay tone';
replayBtn.addEventListener('click', replayTone);
main.appendChild(replayBtn);


//activate select buttons
let noteButtons = [...buttonSelects.children];
noteButtons.forEach(button => button.addEventListener('click', getNote));



//start game function
function startGame () {
    console.log('game has started');
}

//replay tone function
function replayTone () {
    console.log('the tone is being replayed');
}

//get note function

function getNote () {
    console.log(this.value);
}