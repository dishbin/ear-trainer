//connecting...
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
const notesModal = document.querySelector('#notes-modal');
const notesModalTextbox = document.querySelector('#notes-modal-textbox');
const closeNotesModal = document.querySelector('#close-modal');
const notesToInclude = document.querySelectorAll('.include-notes');
const toggleSelectButton = document.querySelector('.toggle-select');
const instructionsModal = document.querySelector('#instructions-modal');
const instructionsTextbox = document.querySelector('#instructions-textbox');
const closeInstructions = document.querySelector('#close-instructions');

//create tone genereator
let AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext;
const masterVolume = context.createGain();
masterVolume.connect(context.destination);

//notes generated in easy mode
//C4 to B4
let easyOctave = {
    C: 261.63,
    Csharp: 277.18,
    D: 293.66,
    Dsharp: 311.13,
    E: 329.63,
    F: 349.23,
    Fsharp: 369.99,
    G: 392.00,
    Gsharp: 415.30,
    A: 440.00,
    Asharp: 466.16,
    B: 493.88
    
}

//adds these notes to available notes in medium mode
//Fsharp2 to B2 && C5 to F5
let mediumOctave = {
    C: 523.25,
    Csharp: 554.37,
    D: 587.33,
    Dsharp: 622.25,
    E: 659.25,
    F: 698.46,
    Fsharp: 185.00,
    G: 196.00,
    Gsharp: 207.65,
    A: 220.00,
    Asharp: 233.08,
    B: 246.94
    
}

//adds these notes to available notes in hard mode
//C2 to F2 && Fsharp5 to B5
let hardOctave = {
    C: 130.81,
    Csharp: 138.59,
    D: 146.83,
    Dsharp: 155.56,
    E: 164.81,
    F: 174.61,
    Fsharp: 739.99,
    G: 783.99,
    Gsharp: 830.61,
    A: 880.00,
    Asharp: 932.33,
    B: 987.77
}

let majorChords = {
    C: [261.63, 329.63, 392.00],
    Csharp: [277.18, 349.23, 415.30],
    D: [293.66, 369.99, 440.00],
    Dsharp: [311.13, 392.00, 466.16],
    E: [329.63, 415.30, 493.88],
    F: [349.23, 440.00, 523.25],
    Fsharp: [369.99, 466.16, 554.37],
    G: [392.00, 493.88, 587.33],
    Gsharp: [415.30, 523.25, 622.25],
    A: [440.00, 554.37, 659.25],
    Asharp: [466.16, 587.33, 698.46],
    B: [493.88, 622.25, 739.99],
}

let majorChords1stInversion = {
    C: [523.25, 329.63, 392.00],
    Csharp: [554.37, 349.23, 415.30],
    D: [587.33, 369.99, 440.00],
    Dsharp: [622.25, 392.00, 466.16],
    E: [659.25, 415.30, 493.88],
    F: [698.46, 440.00, 523.25],
    Fsharp: [739.99, 466.16, 554.37],
    G: [783.99, 493.88, 587.33],
    Gsharp: [830.61, 523.25, 622.25],
    A: [880.00, 554.37, 659.25],
    Asharp: [932.33, 587.33, 698.46],
    B: [987.77, 622.25, 739.99],
}

let majorChords2ndInversion = {
    C: [261.63, 329.63, 196.00],
    Csharp: [277.18, 349.23, 207.65],
    D: [293.66, 369.99, 220.00],
    Dsharp: [311.13, 392.00, 233.08],
    E: [329.63, 415.30, 246.94],
    F: [349.23, 440.00, 261.63],
    Fsharp: [369.99, 466.16, 277.18],
    G: [392.00, 493.88, 293.66],
    Gsharp: [415.30, 523.25, 311.13],
    A: [440.00, 554.37, 329.63],
    Asharp: [466.16, 587.33, 349.23],
    B: [493.88, 622.25, 369.99],
}

let minorChords = {
    C: [261.63, 311.13, 392.00],
    Csharp: [277.18, 329.63, 415.30],
    D: [293.66, 349.23, 440.00],
    Dsharp: [311.13, 369.99, 466.16],
    E: [329.63, 392.00, 493.88],
    F: [349.23, 415.30, 523.25],
    Fsharp: [369.99, 440.00, 554.37],
    G: [392.00, 466.16, 587.33],
    Gsharp: [415.30, 493.88, 622.25],
    A: [440.00, 523.25, 659.25],
    Asharp: [466.16, 554.37, 698.46],
    B: [493.88, 587.33, 739.99],
}

let minorChords1stInversion = {
    C: [523.25, 311.13, 392.00],
    Csharp: [554.37, 329.63, 415.30],
    D: [587.33, 349.23, 440.00],
    Dsharp: [622.25, 369.99, 466.16],
    E: [659.25, 392.00, 493.88],
    F: [698.46, 415.30, 523.25],
    Fsharp: [739.99, 440.00, 554.37],
    G: [783.99, 466.16, 587.33],
    Gsharp: [830.61, 493.88, 622.25],
    A: [880.00, 523.25, 659.25],
    Asharp: [932.33, 554.37, 698.46],
    B: [987.77, 587.33, 739.99],
}

let minorChords2ndInversion = {
    C: [261.63, 311.13, 196.00],
    Csharp: [277.18, 329.63, 207.65],
    D: [293.66, 349.23, 220.00],
    Dsharp: [311.13, 369.99, 233.08],
    E: [329.63, 392.00, 246.94],
    F: [349.23, 415.30, 261.63],
    Fsharp: [369.99, 440.00, 277.18],
    G: [392.00, 466.16, 293.66],
    Gsharp: [415.30, 493.88, 311.13],
    A: [440.00, 523.25, 329.63],
    Asharp: [466.16, 554.37, 349.23],
    B: [493.88, 587.33, 369.99],
}

//keeps track of current note in round
let noteIndex = 0;
//used for scoring in infinite mode
let infiniteNoteCount = 0;

//contains the randomly generated frequencies from each round, resets at each game start
let roundValues = [];
//matches the note to the randomly generated frequencies from each round, resets at each game start
let noteValues = [];

//stores the notes that the user gets correct each round
let correctNotes = [];
//stores the notes that the user gets incorrect each round
let incorrectNotes = [];

//boolean for knowing if infinite mode is activated or not
let infiniteModeToggle = false;

//boolean for knowing if chord mode is activated or not
let chordModeToggle = false;

//check if all notes in notes modal are selected
let allNotesSelected = true;

//activate deselect/select all button
toggleSelectButton.addEventListener('click', function () {
    if (allNotesSelected === true) {
        notesToInclude.forEach(note => note.checked = false);
        toggleSelectButton.innerHTML = 'select all';
        allNotesSelected = false;
        console.log(allNotesSelected)
    } else if (allNotesSelected === false) {
        notesToInclude.forEach(note => note.checked = true);
        toggleSelectButton.innerHTML = 'deselect all';
        allNotesSelected = true;
        console.log(allNotesSelected)
    }
});

//keeps track of shown notes
//default set to 12 (all notes)
let shownNotes = 12;
//stores shown note values generated each round
let shownNotesValues = [];
//stores shown note buttons for easy access
let shownNotesButtons = [];

//create header
let heading = document.createElement('h1');
heading.innerHTML = 'semi-tone ear trainer';
header.appendChild(heading);

////create, style, and activate notes button
let notesButton = document.createElement('button');
notesButton.innerHTML = 'notes';
notesButton.classList.add('notes-button');
//when notes button is pressed --> display select notes modal
notesButton.addEventListener('click', function () {
    displayNotesModal();
})
header.appendChild(notesButton);

//create, style, and activate chord button
let chordButton = document.createElement('button');
chordButton.classList.add('chord-button');
chordButton.innerHTML = 'chords';
//when chord button is clicked...
chordButton.addEventListener('click', function () {
    removeInfiniteMode();
    //enable start button
    startBtn.disabled = false;
    //reset start button text to default
    startBtn.innerHTML = 'begin training';
    //re-style start button to default 
    startBtn.classList.add('start-button');
    //if chord mode is off...
    if (chordButton.innerHTML === 'chords') {
        //change inner text to major
        chordButton.innerHTML = 'major'
        //enable chord mode
        chordModeToggle = true;
        //style chord button
        chordButton.classList.add('chord-button-active');
        //change text for replay button
        replayBtn.innerHTML = 'replay chord';
        
    //if chord mode is set to major
    } else if (chordButton.innerHTML === 'major') {
        //change inner text to minor
        chordButton.innerHTML = 'minor'

    //if chord mode is set to minor
    } else if (chordButton.innerHTML === 'minor') {
        //change inner text to both
        chordButton.innerHTML = 'both'

    //if chord mode is set to both
    }  else if (chordButton.innerHTML === 'both') {
        //change inner text to chords
        chordButton.innerHTML = 'chords'
        //disable chord mode
        chordModeToggle = false;
        //re-style chord button
        chordButton.classList.remove('chord-button-active');
        replayBtn.innerHTML = 'replay tone';
    }
});
header.appendChild(chordButton);

//create, style, and activate infinite mode button
let infiniteButton = document.createElement('button');
infiniteButton.innerHTML = '&#8734';
infiniteButton.classList.add('infinite-button');
//when infinite mode button is clicked...
infiniteButton.addEventListener('click', function () {
    //if infinite mode is NOT on
    if (infiniteModeToggle === false) {
        //display current score in infinite mode button text
        infiniteButton.innerHTML = '--%'
        //change background color to yellow to show that notes mode is activated
        infiniteButton.classList.add('infinite-button-active');
        //set the infinite mode toggle to TRUE
        infiniteModeToggle = true;
        //run infinite mode
        infiniteMode();
    //if infinite mode is already on
    } else {
        removeInfiniteMode();
        //enable start button
        startBtn.disabled = false;
        //change start button text back to default
        startBtn.innerHTML = 'begin training';
        //re-style start button to default 
        startBtn.classList.add('start-button');
    }
});
header.appendChild(infiniteButton);

//create, style, and activate difficulty button
let difficultyButton = document.createElement('button');
difficultyButton.classList.add('difficulty-button');
difficultyButton.classList.add('easy');
difficultyButton.innerHTML = 'easy';
//when difficulty button is clicked...
difficultyButton.addEventListener('click', function () {
    removeInfiniteMode();
    //enable start button
    startBtn.disabled = false;
    //reset start button text to default
    startBtn.innerHTML = 'begin training';
    //re-style start button to default 
    startBtn.classList.add('start-button');
    //if difficulty is already set to easy
    if (difficultyButton.classList.value.includes('easy')) {
        //remove easy styling
        difficultyButton.classList.remove('easy');
        //add medium styling
        difficultyButton.classList.add('medium');
        //change text to medium
        difficultyButton.innerHTML = 'medium';
    //if difficulty is already set to medium
    } else if (difficultyButton.classList.value.includes('medium')) {
        //remove medium styling
        difficultyButton.classList.remove('medium');
         //add hard styling
        difficultyButton.classList.add('hard');
        //change text to hard
        difficultyButton.innerHTML = 'hard';
    //if difficulty is already set to hard
    } else if (difficultyButton.classList.value.includes('hard')) {
        //remove hard styling
        difficultyButton.classList.remove('hard');
        //add easy styling
        difficultyButton.classList.add('easy');
        //change text to easy
        difficultyButton.innerHTML = 'easy';
    }
});
header.appendChild(difficultyButton);

//create, style, and activate start button
let startBtn = document.createElement('button');
startBtn.innerHTML = 'begin training';
startBtn.classList.add('start-button');
startBtn.addEventListener('click', startGame);
main.appendChild(startBtn);

//create, style, and activate replay button
let replayBtn = document.createElement('button');
replayBtn.innerHTML = 'replay tone';
replayBtn.classList.add('replay-button');
replayBtn.addEventListener('click', replayTone);
main.appendChild(replayBtn);
replayBtn.disabled = true;

//style note select buttons
let noteButtons = [...buttonSelects.children];
noteButtons.forEach(button => button.classList.add('note-button'))

//gets default shown note values (all)
getShownNoteValues();

//displays instructions modal
window.setTimeout(() => {
    instructionsModal.style.display = 'block';
    instructionsTextbox.style.display = 'block';
    closeInstructions.addEventListener('click', function () {
        instructionsModal.style.display = 'none';
        instructionsTextbox.style.display = 'none';
    })
}, 1000);


//starts a normal round
function startGame () { 
    //give each shown note button a click listener that calls getNote
    shownNotesButtons.forEach(button => button.addEventListener('click', getNote));
    //enable replay current tone button
    replayBtn.disabled = false;
    //set note index to 0
    noteIndex = 0;
    //empty the correct and incorrect note arrays
    correctNotes = [];
    incorrectNotes = [];
    //get round values
    populateRoundValues();
    //remove start button text
    startBtn.innerHTML = "";
    //disable start button
    startBtn.disabled = true;
    //play first note after 1 second
    window.setTimeout(() => {
        if (chordModeToggle !== true) {
            playCurrentNote();
        } else {
            playCurrentChord();
        }
    }, 1000)
}

//replays current tone
function replayTone () {
    if (chordModeToggle !== true) {
        playCurrentNote();
    } else {
        playCurrentChord();
    }
}

//logs the user choice, triggers next note and 
//checks for score after each click
function getNote () {
    //create local variable that equals the value of the button pressed
    let answer = this.value;
    //if answer is equal to the value of the current note
    (answer === noteValues[noteIndex]) ?
        //push the answer into the correct notes arr
        correctNotes.push(answer) :
        //else push the correct answer into the incorrect notes arr
        incorrectNotes.push(noteValues[noteIndex]);
    //increment note index
    noteIndex++;
    //if the round isn't over
    if (noteIndex < shownNotes) {
        //play the next note
        window.setTimeout(() => {
            if (chordModeToggle !== true) {
                playCurrentNote();
            } else {
                playCurrentChord();
            }
        }, 1000)
    //else...
    } else {
        //display score modal
        displayModal();
        //make start button red
        startBtn.classList.add('star-button-red');
    }   
}

//plays current note in noteValues index
function playCurrentNote () {
    //make start button green to show audio playing
    startBtn.classList.add('playing-note');
    //create oscillator
    const oscillator = context.createOscillator();
    //set oscillator frequency to the current notes frequency
    oscillator.frequency.setValueAtTime(roundValues[noteIndex], 0);
    //connect oscillator to master vol
    oscillator.connect(masterVolume);
    //start the oscillator
    oscillator.start();
    //stop the oscillator after 1 sec
    oscillator.stop(context.currentTime + 1);
    //after the note stops playing...
    window.setTimeout (() => {
        //change start button color back to default
        startBtn.classList.remove('playing-note');
    }, context.currentTime + 1000)
}

//plays current note as a chord in noteValues index
function playCurrentChord () {
    //make start button green to show audio playing
    startBtn.classList.add('playing-note');
    //create oscillators
    const oscillator = context.createOscillator();
    const oscillator3rd = context.createOscillator();
    const oscillator5th = context.createOscillator();
    //create index of root notes
    let rootNotes = [...Object.keys(easyOctave)];
    //get the root note index of the current value
    let rootNoteIndex = rootNotes.indexOf(noteValues[noteIndex]);
    //get chord values of root note
    let chordValues = [];
    if (chordButton.innerHTML === 'major') {
        if (difficultyButton.classList.value.includes('easy')) {
            chordValues = Object.values(majorChords)[rootNoteIndex];
        } else if (difficultyButton.classList.value.includes('medium')) {
            //create a local variable that is either a 0 or a 1
            let mediumModifier = Math.floor(Math.random() * 2);
                 //if medium modifier is equal to 0
                (mediumModifier === 0) ? 
                    chordValues = Object.values(majorChords)[rootNoteIndex] :
                    chordValues = Object.values(majorChords1stInversion)[rootNoteIndex];
        } else if (difficultyButton.classList.value.includes('hard')) {
            //create a local variable that is either a 0, 1, or a 2
            let hardModifier = Math.floor(Math.random() * 3);
            //if hard modifier is equal to 0
            (hardModifier === 0) ? 
                chordValues = Object.values(majorChords)[rootNoteIndex] :
                (hardModifier === 1) ?
                    chordValues = Object.values(majorChords1stInversion)[rootNoteIndex] :
                    chordValues = Object.values(majorChords2ndInversion)[rootNoteIndex] ;
        }   
    } else if (chordButton.innerHTML === 'minor') {
        if (difficultyButton.classList.value.includes('easy')) {
            chordValues = Object.values(minorChords)[rootNoteIndex];
        } else if (difficultyButton.classList.value.includes('medium')) {
            //create a local variable that is either a 0 or a 1
            let mediumModifier = Math.floor(Math.random() * 2);
                 //if medium modifier is equal to 0
                (mediumModifier === 0) ? 
                    chordValues = Object.values(minorChords)[rootNoteIndex] :
                    chordValues = Object.values(minorChords1stInversion)[rootNoteIndex];
        } else if (difficultyButton.classList.value.includes('hard')) {
            //create a local variable that is either a 0, 1, or a 2
            let hardModifier = Math.floor(Math.random() * 3);
            //if hard modifier is equal to 0
            (hardModifier === 0) ? 
                chordValues = Object.values(minorChords)[rootNoteIndex] :
                (hardModifier === 1) ?
                    chordValues = Object.values(minorChords1stInversion)[rootNoteIndex] :
                    chordValues = Object.values(minorChords2ndInversion)[rootNoteIndex] ;
        }   
    } else if (chordButton.innerHTML === 'both') {
        let switchModifier = Math.floor(Math.random() * 2);
        if (switchModifier === 0) {
            if (difficultyButton.classList.value.includes('easy')) {
                chordValues = Object.values(majorChords)[rootNoteIndex];
            } else if (difficultyButton.classList.value.includes('medium')) {
                //create a local variable that is either a 0 or a 1
                let mediumModifier = Math.floor(Math.random() * 2);
                     //if medium modifier is equal to 0
                    (mediumModifier === 0) ? 
                        chordValues = Object.values(majorChords)[rootNoteIndex] :
                        chordValues = Object.values(majorChords1stInversion)[rootNoteIndex];
            } else if (difficultyButton.classList.value.includes('hard')) {
                //create a local variable that is either a 0, 1, or a 2
                let hardModifier = Math.floor(Math.random() * 3);
                //if hard modifier is equal to 0
                (hardModifier === 0) ? 
                    chordValues = Object.values(majorChords)[rootNoteIndex] :
                    (hardModifier === 1) ?
                        chordValues = Object.values(majorChords1stInversion)[rootNoteIndex] :
                        chordValues = Object.values(majorChords2ndInversion)[rootNoteIndex] ;
            }   
        } else {
            if (difficultyButton.classList.value.includes('easy')) {
                chordValues = Object.values(minorChords)[rootNoteIndex];
            } else if (difficultyButton.classList.value.includes('medium')) {
                //create a local variable that is either a 0 or a 1
                let mediumModifier = Math.floor(Math.random() * 2);
                     //if medium modifier is equal to 0
                    (mediumModifier === 0) ? 
                        chordValues = Object.values(minorChords)[rootNoteIndex] :
                        chordValues = Object.values(minorChords1stInversion)[rootNoteIndex];
            } else if (difficultyButton.classList.value.includes('hard')) {
                //create a local variable that is either a 0, 1, or a 2
                let hardModifier = Math.floor(Math.random() * 3);
                //if hard modifier is equal to 0
                (hardModifier === 0) ? 
                    chordValues = Object.values(minorChords)[rootNoteIndex] :
                    (hardModifier === 1) ?
                        chordValues = Object.values(minorChords1stInversion)[rootNoteIndex] :
                        chordValues = Object.values(minorChords2ndInversion)[rootNoteIndex] ;
            }   
        }
    }
    //set oscillator frequency to the current notes frequency 
    oscillator.frequency.setValueAtTime((chordValues[0]), 0);
    oscillator3rd.frequency.setValueAtTime((chordValues[1]), 0);
    oscillator5th.frequency.setValueAtTime((chordValues[2]), 0);
    //connect oscillator to master vol
    oscillator.connect(masterVolume);
    oscillator3rd.connect(masterVolume);
    oscillator5th.connect(masterVolume);
    //start the oscillator
    oscillator.start();
    oscillator3rd.start();
    oscillator5th.start();
    //stop the oscillator after 1 sec
    oscillator.stop(context.currentTime + 1);
    oscillator3rd.stop(context.currentTime + 1);
    oscillator5th.stop(context.currentTime + 1);
    //after the note stops playing...
    window.setTimeout (() => {
        //change start button color back to default
        startBtn.classList.remove('playing-note');
    }, context.currentTime + 1000)
}

//set note values for each round
function populateRoundValues () {
    //empty round and note value arrays
    roundValues = [];
    noteValues = [];
    //remove shown notes values
    shownNotesValues = [];
    //repopulate shown notes values arrays
    getShownNoteValues();
    //for every shown note...
    for (let i = 0; i < shownNotes; i++) {
        //generate a round value
        generateAndCheckRoundValues();
    };
    
}

//creates a round value and checks to see if 
//it has already been added to this round
//to make sure that each note is only in the round once
function generateAndCheckRoundValues () {
    //gets a random number from 0 to the amount of shown notes - 1
    let randVal = Math.floor(Math.random() * shownNotesValues.length);
    //uses that random number to select a note value from the shown notes
    let randNote = shownNotesValues[randVal];
    //if current note values does NOT contain the random note
    if (!(noteValues.includes(randNote))) {
        //push the random note into note values
        noteValues.push(randNote);
        //if difficulty is set to EASY
        if (difficultyButton.classList.value.includes('easy')) {
            //push the frequency of the random note grabbed from the easy octave
            roundValues.push(Object.values(easyOctave)[randVal]);
        //else if difficulty is set to MEDIUM
        } else if (difficultyButton.classList.value.includes('medium')) {
            //create a local variable that is either a 0 or a 1
            let mediumModifier = Math.floor(Math.random() * 2);
            //if medium modifier is equal to 0
            (mediumModifier === 0) ? 
                //push the frequency of the random note grabbed from the easy octave
                roundValues.push(Object.values(easyOctave)[randVal]) :
                //if medium modifier is equal to 1
                //push the frequency of the random note grabbed from the medium octave
                roundValues.push(Object.values(mediumOctave)[randVal]);
        //if difficulty is set to HARD
        } else if (difficultyButton.classList.value.includes('hard')) {
            //create a local variable that is either a 0, 1, or a 2
            let hardModifier = Math.floor(Math.random() * 3);
            //if hard modifier is equal to 0
            (hardModifier === 0) ? 
                //push the frequency of the random note grabbed from the easy octave
                roundValues.push(Object.values(easyOctave)[randVal]) :
                //else if hard modifier is equal to 1 
                (hardModifier === 1) ?
                    //push the frequency of the random note grabbed from the medium octave
                    roundValues.push(Object.values(mediumOctave)[randVal]) :
                    //else if medium modifier is equal to 2
                    //push the frequency of the random note grabbed from the hard octave
                    roundValues.push(Object.values(hardOctave)[randVal]);
        }
    //if current note values already contains the random note
    } else {
        //generate a new random note to ensure every note is in each round
        generateAndCheckRoundValues();
    }
}

//is called upon game completion, displays score
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
    //when play again button is clicked...
    playAgain.addEventListener('click', function () {
        //call remove scores
        removeScores();
        //emoty the correct/incorrect notes array
        correctNotes = [];
        incorrectNotes = [];
        //remove play again button from modal
        modalTextbox.removeChild(playAgain);
        //remove modal from display
        modalShade.style.display = 'none';
        modalTextbox.style.display = 'none';
        //start a new game
        startGame();
    });
    //add play agai button to score modal
    modalTextbox.appendChild(playAgain);
}

//gets and prepares score for display
function getScore () {
    //get score
    let percentCorrect = parseInt((correctNotes.length / shownNotes) * 100);
    //choose header adn percent color based on score; display results
    //if score is less than 25...
    if (percentCorrect < 25) {
        resultPercent.style.color = 'rgb(255, 82, 82)';
        resultHeader.innerHTML = 'yikes!!';
        resultPercent.innerHTML = `${percentCorrect}%`;
        resultSpread.innerHTML = `you got ${correctNotes.length} out of ${shownNotes} notes correct`
    //if score is between 25 and 49...
    } else if (percentCorrect >= 25 && percentCorrect < 50) {
        resultPercent.style.color = 'black';
        resultHeader.innerHTML = 'good try!!';
        resultPercent.innerHTML = `${percentCorrect}%`;
        resultSpread.innerHTML = `you got ${correctNotes.length} out of ${shownNotes} notes correct`
    //if score is between 50 and 74...
    } else if (percentCorrect >= 50 && percentCorrect < 75) {
        resultPercent.style.color = 'black';
        resultHeader.innerHTML = 'well done!!';
        resultPercent.innerHTML = `${percentCorrect}%`;
        resultSpread.innerHTML = `you got ${correctNotes.length} out of ${shownNotes} notes correct`
    //if score is 75 or greater
    } else if (percentCorrect >= 75) {
        resultPercent.style.color = 'rgb(153, 255, 153)';
        resultHeader.innerHTML = 'wow!!';
        resultPercent.innerHTML = `${percentCorrect}%`;
        resultSpread.innerHTML = `you got ${correctNotes.length} out of ${shownNotes} notes correct`
    }
}

//adds note spread to score modal
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

//starts game in infinite mode
function infiniteMode () {
    //remove get note click listener from each shown button
    shownNotesButtons.forEach(button => button.removeEventListener('click', getNote));
    //add get infinite note click listener to each shown button
    shownNotesButtons.forEach(button => button.addEventListener('click', getInfintiteNote));
    //enable replay current tone button
    replayBtn.disabled = false;
    //set note index to 0
    noteIndex = 0;
    //get values for the round
    populateRoundValues();
    //remove start button text
    startBtn.innerHTML = "";
    //disable start button
    startBtn.disabled = true;
    //wait 1 second then play the current note
    window.setTimeout(() => {
        if (chordModeToggle !== true) {
            playCurrentNote();
        } else {
            playCurrentChord();
        }
    }, 1000);
}

//get note function but for infinite mode
//on note button click
function getInfintiteNote () {
    //increment infinite note count
    infiniteNoteCount++;
    //create local variable that stores the value of the note button that was clicked
    let answer = this.value;
    //if the value of answer is equal to the current notes value
    (answer === noteValues[noteIndex]) ?
        //push note into correct notes array
        correctNotes.push(answer) :
        //else push note into incorrect notes arr
        incorrectNotes.push(noteValues[noteIndex]);
    //create a local variable thats equal to the percentage of correct notes out of total infinite mode notes
    let infinitePercent = parseInt((correctNotes.length / infiniteNoteCount) * 100);
    //set text of infinite button to the percent correct
    infiniteButton.innerHTML = `${infinitePercent}%`;
    //increment the noteIndex for the current round
    noteIndex++;
    //if note index is less than the rounds note values length
    if (noteIndex < shownNotes) {
        //play next note after 1 second
        window.setTimeout(() => {
            if (chordModeToggle !== true) {
                playCurrentNote();
            } else {
                playCurrentChord();
            }
        }, 1000)
    //if note the round ends
    } else {
        //start new infinite mode round
        infiniteMode();
    }   
}

//displays a menu to choose which notes to show
function displayNotesModal () {
    //display notes modal
    notesModal.style.display = 'block';
    notesModalTextbox.style.display = 'block';
    //activate select toggle button
    notesToInclude.forEach(note => {
        if (note.checked === false) {
            allNotesSelected = false;
        }
    });
    if (allNotesSelected === true) {
        toggleSelectButton.innerHTML = 'deselect all';
    } else if (allNotesSelected === false) {
        toggleSelectButton.innerHTML = 'select all';
    }
    notesToInclude.forEach(note => note.addEventListener('change', function () {
        notesToInclude.forEach(note => {
            if (note.checked === false) {
                allNotesSelected = false;
            };
            if (allNotesSelected === true) {
                toggleSelectButton.innerHTML = 'deselect all';
            } else if (allNotesSelected === false) {
                toggleSelectButton.innerHTML = 'select all';
            };
        });
    }));
    toggleSelectButton.classList.add('toggle-select-button');
    
    //when close notes modal button is pressed...
    closeNotesModal.addEventListener('click', function () {
        //remove notes modal from display
        notesModal.style.display = 'none';
        notesModalTextbox.style.display = 'none';
        //get shown note values
        getShownNoteValues();
        //enable start button
        startBtn.disabled = false;
        //reset start button text to default
        startBtn.innerHTML = "begin training";
    });
}

//gets shown note values when select notes modal is closed
function getShownNoteValues () {
    //sets shown notes to 0
    shownNotes = 0;
    //empties shown notes values and buttons arrays
    shownNotesValues = [];
    shownNotesButtons = [];
    //for each note button
    notesToInclude.forEach(note => {
        //if the note checkbox is not checked
        if (note.checked !== true) {
            //get the button element that corresponds to the unchecked note
            let removeNoteButton = document.getElementById(note.value);
            //remove that button from the display
            removeNoteButton.style.display = 'none';
        //if the note checkbox remains checked
        } else {
            //display that button
            let addNoteButton = document.getElementById(note.value);
            addNoteButton.style.display = 'inline';
            //increment the shown notes count
            shownNotes++;
            //push the note value into the shown notes array
            shownNotesValues.push(addNoteButton.id);
            //push the button element into the shown notes buttons array
            shownNotesButtons.push(addNoteButton);
        }
    })
}

function removeInfiniteMode () {
    //remove yellow background
    infiniteButton.classList.remove('infinite-button-active');
    //remove getInfiniteNote click listener from each button
    shownNotesButtons.forEach(button => button.removeEventListener('click', getInfintiteNote));
    //set infinite mode toggle to FALSE
    infiniteModeToggle = false;
    //change infinite mode button text back to infinity symbol
    infiniteButton.innerHTML = '<span>&#8734;</span>';
}

function signifyInput () {
    startBtn.classList.add('input-received');
    window.setTimeout(() => {
        startBtn.classList.remove('input-received');
    }, 250)
}