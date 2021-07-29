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

//create tone genereator
let AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext;
const masterVolume = context.createGain();
masterVolume.connect(context.destination);

let octaveThree = {
    C: 130.81,
    Csharp: 138.59,
    D: 146.83,
    Dsharp: 155.56,
    E: 164.81,
    F: 174.61,
    Fsharp: 185.00,
    G: 196.00,
    Gsharp: 207.65,
    A: 220.00,
    Asharp: 233.08,
    B: 246.94
}

let noteIndex = 0;

let roundValues = [];
let noteValues = [];

//start game function
function startGame () {
    
    populateRoundValues();
    playCurrentNote();
}

//replay tone function
function replayTone () {
    console.log('the tone is being replayed');
    playCurrentNote();
}

//get note function
function getNote () {
    return this.value;
}

//play current note
function playCurrentNote () {
    const oscillator = context.createOscillator();
    oscillator.frequency.setValueAtTime(220, 0);
    oscillator.connect(masterVolume);
    oscillator.start();
    oscillator.stop(context.currentTime + 1);
}

function populateRoundValues () {
    roundValues = [];
    noteValues = [];
    for (let i = 0; i < buttonSelects.children.length; i++) {
        let randVal = Math.floor(Math.random() * buttonSelects.children.length);
        console.log(randVal);
        let randNote = buttonSelects.children[randVal].id;
        noteValues.push(randNote);
        roundValues.push(Object.values(octaveThree)[randVal]);
    };
    console.log(roundValues);
    console.log(noteValues);
}
