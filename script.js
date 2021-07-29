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
main.appendChild(startBtn);

let replayBtn = document.createElement('button');
replayBtn.innerHTML = 'replay tone';
main.appendChild(replayBtn);

//create select buttons
