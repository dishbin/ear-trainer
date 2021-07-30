//connecting
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const buttonSelects = document.querySelector('.button-selects');
const modalShade = document.querySelector('#modal');
const modalTextbox = document.querySelector('#modal-textbox');
const resultHeader = document.querySelector('#result-header');
const resultPercent = document.querySelector('#result-percent');
const resultSpread = document.querySelector('#result-spread');
const modalScore = document.querySelector('#modal-score');
const resultsCorrect = document.querySelector('#correct-notes');
const resultsIncorrect = document.querySelector('#incorrect-notes');

//create header
let heading = document.createElement('h1');
heading.innerHTML = 'semi-tone ear trainer';
header.appendChild(heading);

let infiniteModeToggle = false;

let infiniteButton = document.createElement('button');
infiniteButton.innerHTML = '<span>&#8734;</span>';
infiniteButton.classList.add('infinite-button');
infiniteButton.addEventListener('click', function () {
    infiniteButton.innerHTML = '--%'
    if (infiniteModeToggle === false) {
        infiniteModeToggle = true;
        infiniteMode();
    } else {
        noteButtons.forEach(button => button.removeEventListener('click', getInfintiteNote));
        infiniteModeToggle = false;
        infiniteButton.innerHTML = '<span>&#8734;</span>';
        startBtn.disabled = false;
        startBtn.innerHTML = 'begin training';
        startBtn.classList.add('start-button');
    }
});
header.appendChild(infiniteButton);

//create main buttons
let startBtn = document.createElement('button');
startBtn.innerHTML = 'begin training';
startBtn.classList.add('start-button');
startBtn.addEventListener('click', startGame);
main.appendChild(startBtn);


let replayBtn = document.createElement('button');
replayBtn.innerHTML = 'replay tone';
replayBtn.classList.add('replay-button');
replayBtn.addEventListener('click', replayTone);
main.appendChild(replayBtn);
replayBtn.disabled = true;


//activate select buttons
let noteButtons = [...buttonSelects.children];
noteButtons.forEach(button => button.classList.add('note-button'))
// noteButtons.forEach(button => button.addEventListener('click', getNote));

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
let infiniteNoteCount = 0;

let roundValues = [];
let noteValues = [];

let correctNotes = [];
let incorrectNotes = [];

//start game function
function startGame () { 
    noteButtons.forEach(button => button.addEventListener('click', getNote));
    replayBtn.disabled = false;
    noteIndex = 0;
    correctNotes = [];
    incorrectNotes = [];
    populateRoundValues();
    startBtn.innerHTML = "";
    startBtn.disabled = true;
    window.setTimeout(() => {
        playCurrentNote();
    }, 1000)
}

//replay tone function
function replayTone () {
    playCurrentNote();
}

//logs the user choice, triggers next note and 
//checks for score after each click
function getNote () {
    let answer = this.value;
    (answer === noteValues[noteIndex]) ?
        correctNotes.push(answer) :
        incorrectNotes.push(noteValues[noteIndex]);
    
    noteIndex++;
    if (noteIndex < 12) {
    window.setTimeout(() => {
        playCurrentNote();
    }, 1000)
    } else {
        displayModal();
        startBtn.classList.add('star-button-red');
    }   
}


//plays current note in noteValues index
function playCurrentNote () {
    startBtn.classList.add('playing-note');
    const oscillator = context.createOscillator();
    oscillator.frequency.setValueAtTime(roundValues[noteIndex], 0);
    oscillator.connect(masterVolume);
    oscillator.start();
    oscillator.stop(context.currentTime + 1);
    window.setTimeout (() => {
        startBtn.classList.remove('playing-note');
    }, context.currentTime + 1000)
}

//set note values for each round
function populateRoundValues () {
    roundValues = [];
    noteValues = [];
    for (let i = 0; i < buttonSelects.children.length; i++) {
        generateAndCheckRoundValues();
    };
}

//is called upon game completion
function displayModal () {
    //display modal
    modalShade.style.display = 'block';
    modalTextbox.style.display = 'block';
    //get and display score
    getScore();
    //log correct/incorrect notes
    addNoteSpread();
    //display play again button
    let playAgain = document.createElement('button');
    playAgain.innerHTML = 'play again?';
    playAgain.classList.add('play-again');
    playAgain.addEventListener('click', function () {
        removeScores();
        correctNotes = [];
        incorrectNotes = [];
        modalTextbox.removeChild(playAgain);
        modalShade.style.display = 'none';
        modalTextbox.style.display = 'none';
        startBtn.style.backgroundColor; 
        startGame();
    });
    modalTextbox.appendChild(playAgain);
}

//gets and prepares score for display
function getScore () {
    //get score
    let percentCorrect = parseInt((correctNotes.length / 12) * 100);
    //choose header adn percent color based on score; display results
    if (percentCorrect < 25) {
        resultPercent.style.color = 'red';
        resultHeader.innerHTML = 'yikes!!';
        resultPercent.innerHTML = `${percentCorrect}%`;
        resultSpread.innerHTML = `you got ${correctNotes.length} out of 12 notes correct`
    } else if (percentCorrect >= 25 && percentCorrect < 50) {
        resultPercent.style.color = 'black';
        resultHeader.innerHTML = 'good try!!';
        resultPercent.innerHTML = `${percentCorrect}%`;
        resultSpread.innerHTML = `you got ${correctNotes.length} out of 12 notes correct`
    } else if (percentCorrect >= 50 && percentCorrect < 75) {
        resultPercent.style.color = 'black';
        resultHeader.innerHTML = 'well done!!';
        resultPercent.innerHTML = `${percentCorrect}%`;
        resultSpread.innerHTML = `you got ${correctNotes.length} out of 12 notes correct`
    } else if (percentCorrect >= 75) {
        resultPercent.style.color = rgb(153, 255, 153);
        resultHeader.innerHTML = 'wow!!';
        resultPercent.innerHTML = `${percentCorrect}%`;
        resultSpread.innerHTML = `you got ${correctNotes.length} out of 12 notes correct`
    }
}

function addNoteSpread () {
    //log correct notes
    for (let i = 0; i < correctNotes.length; i++) {
        let newNote = document.createElement('p');
        let noteText = document.getElementById(correctNotes[i]);
        newNote.innerHTML = noteText.innerHTML
        newNote.classList.add('result-note');
        resultsCorrect.appendChild(newNote);
    }
    
    //log incorrect notes
    for (let i = 0; i < incorrectNotes.length; i++) {
        let newNote = document.createElement('p');
        let noteText = document.getElementById(incorrectNotes[i]);
        newNote.innerHTML = noteText.innerHTML
        newNote.classList.add('result-note');
        resultsIncorrect.appendChild(newNote);
    }
}
//removes correct/incorrect notes from score modal
function removeScores () {
   for (let i = 0; i < correctNotes.length; i++) {
        resultsCorrect.removeChild(resultsCorrect.lastChild);    
    }
    for (let i = 0; i < incorrectNotes.length; i++) {
        resultsIncorrect.removeChild(resultsIncorrect.lastChild); 
    } 
}

//creates a round value and checks to see if 
//it has already been added to this round
//to make sure that each note is only in the round once
function generateAndCheckRoundValues () {
    let randVal = Math.floor(Math.random() * buttonSelects.children.length);
    let randNote = buttonSelects.children[randVal].id;
    if (!(noteValues.includes(randNote))) {
        noteValues.push(randNote);
        roundValues.push(Object.values(octaveThree)[randVal]);
    } else {
        generateAndCheckRoundValues();
    }
}

function infiniteMode () {
    noteButtons.forEach(button => button.removeEventListener('click', getNote));
    noteButtons.forEach(button => button.addEventListener('click', getInfintiteNote));
    replayBtn.disabled = false;
    noteIndex = 0;
    populateRoundValues();
    startBtn.innerHTML = "";
    startBtn.disabled = true;
    window.setTimeout(() => {
        playCurrentNote();
    }, 1000);
}

function getInfintiteNote () {
    infiniteNoteCount++;
    let answer = this.value;
    (answer === noteValues[noteIndex]) ?
        correctNotes.push(answer) :
        incorrectNotes.push(noteValues[noteIndex]);
    let infinitePercent = parseInt((correctNotes.length / infiniteNoteCount) * 100);
    infiniteButton.innerHTML = `${infinitePercent}%`;
    noteIndex++;
    if (noteIndex < 12) {
    window.setTimeout(() => {
        playCurrentNote();
    }, 1000)
    } else {
        infiniteMode();
    }   
}