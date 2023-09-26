const gameDisplay = document.querySelector('.app')
const rulesModal = document.querySelector('#rulesModal')
const rulesBtn = document.querySelector('#rules')
const closeBtn = document.querySelector('#closeBtn')

const resultWaitDisplay = document.querySelector('.result');
const finalResultDisplay = document.querySelector('.result-display')
const resultText = document.querySelector('#resultText')

const playAgainBtn = document.querySelector('#playAgain')
const yourChoice = document.querySelector('.your-choice')
const blankCircle = document.querySelector('.blank-div');
// const nextBlankCircle = document.querySelector('.has-played')

const computerChoiceDisplay = document.querySelector('.computer-choice');
const scoreDisplay = document.querySelector('#score')

let userChoiceData;
let computerChoiceData;
let counter = 0


// template for choice made
const yourChoiceTemplate = (data, title) => `
<p>${title}</p>
<div class="border ${data} upsize upsize-border">
        <div class="circle upsize">
          <img class="upsize" src="images/icon-${data}.svg" alt="hand symbol for ${data}">
        </div>
        `;

// listening for user choice
const choices = document.querySelectorAll('.choices')

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        data = choice.getAttribute('data-choice')
        let title = 'YOU PICKED'
        appendChoice(data, title)
        randomChoice()
        userChoiceData = data

        compareChoices(userChoiceData, computerChoiceData)
    })
})

// passing the choice to a new div and changing screens
function appendChoice(data, title) {
    const userChoice = document.createElement('div');
    userChoice.classList.add('choice')
    userChoice.innerHTML = yourChoiceTemplate(data, title)
    yourChoice.appendChild(userChoice);

    gameDisplay.classList.add('hidden')
    resultWaitDisplay.classList.remove('hidden')
    console.log(data)
    return data
}


// making a random computer choice
let choiceArray = ['rock', 'paper', 'scissors']
const min = 0;
const max = 3;

function randomChoice() {
    const randomInteger = Math.floor(Math.random() * (max - min)) + min;

    const computerChoiceValue = choiceArray[randomInteger];
    let data = computerChoiceValue
    let title = 'THE HOUSE PICKED'


    const makeWait = () => {
        const computerChoice = document.createElement('div');
        computerChoice.classList.add('choice')
        computerChoice.innerHTML = yourChoiceTemplate(data, title);


        computerChoiceDisplay.appendChild(computerChoice);
        const allBlankCircles = document.querySelectorAll('.blank-div');
        allBlankCircles.forEach(blankCircle => {
            blankCircle.classList.add('hidden');
        });

        computerChoiceData = data
        compareChoices()
    };
    setTimeout(makeWait, 1000);
    setTimeout(showResult, 1800)
}

// This could probably be done with a switch statement...
function compareChoices() {
    if (userChoiceData == 'rock' && computerChoiceData == 'rock') {
        draw()
    } else if (userChoiceData == 'rock' && computerChoiceData == 'paper') {
        win()
    } else if (userChoiceData == 'rock' && computerChoiceData == 'scissors') {
        lost()
    } else if (userChoiceData == 'paper' && computerChoiceData == 'paper') {
        draw()
    } else if (userChoiceData == 'paper' && computerChoiceData == 'scissors') {
        lost()
    } else if (userChoiceData == 'paper' && computerChoiceData == 'rock') {
        win()
    } else if (userChoiceData == 'scissors' && computerChoiceData == 'scissors') {
        draw()
    } else if (userChoiceData == 'scissors' && computerChoiceData == 'paper') {
        win()
    } else if (userChoiceData == 'scissors' && computerChoiceData == 'rock') {
        lost()
    }
}

function win() {
    resultText.textContent = 'YOU WIN'
    counter++
}
function lost() {
    resultText.textContent = 'YOU LOSE'
    counter--
}
function draw() {
    resultText.textContent = 'DRAW'
}


function showResult() {
    finalResultDisplay.classList.remove('hidden')
    scoreDisplay.textContent = counter
}
function clearChoices() {
    // Clear user's choice divs
    while (yourChoice.firstChild) {
        yourChoice.removeChild(yourChoice.firstChild);
    }

    // Clear computer's choice divs
    while (computerChoiceDisplay.childNodes.length > 1) {
        computerChoiceDisplay.removeChild(computerChoiceDisplay.lastChild);
    }
}
playAgainBtn.addEventListener('click', () => {
    finalResultDisplay.classList.add('hidden');
    resultWaitDisplay.classList.add('hidden');
    gameDisplay.classList.remove('hidden');

    // Clear the user's and computer's choices
    computerChoiceDisplay.innerHTML = '';
    yourChoice.innerHTML = '';

    // Reset user and computer choice data to null
    userChoiceData = null;
    computerChoiceData = null;

    // Show the computer's choice display
    computerChoiceDisplay.appendChild(blankCircle);

    // Create a new blankCircle div for the next round and append it to the computerChoiceDisplay
    const nextBlankCircle = document.createElement('div');
    nextBlankCircle.classList.add('blank-div');
    nextBlankCircle.innerHTML = `
        <div class="blank-circle"></div>
    `;
    computerChoiceDisplay.appendChild(nextBlankCircle);

    // Reset the computerChoiceData to null for the new round
    computerChoiceData = null;
});



// rules modal
rulesBtn.addEventListener('click', () => {
    rulesModal.classList.remove('hidden')
})

closeBtn.addEventListener('click', () => {
    rulesModal.classList.add('hidden')

})

