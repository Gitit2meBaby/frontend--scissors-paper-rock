const gameDisplay = document.querySelector('.app')
const resultWaitDisplay = document.querySelector('.result');
const finalResultDisplay = document.querySelector('.result-display')
const resultText = document.querySelector('#resultText')
const playAgainBtn = document.querySelector('#playAgain')
const yourChoice = document.querySelector('.your-choice')
const computerChoiceDisplay = document.querySelector('.computer-choice');

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
function appendChoice(data) {
    const userChoice = document.createElement('div');
    userChoice.classList.add('choice')
    userChoice.innerHTML = yourChoiceTemplate(data)
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
        computerChoice.innerHTML = yourChoiceTemplate(data);


        computerChoiceDisplay.appendChild(computerChoice);

        const blankCircle = document.querySelector('.blank-div');
        blankCircle.classList.add('hidden');

        computerChoiceData = data
        compareChoices()
    };

    setTimeout(makeWait, 1000);
    setTimeout(showResult, 1500)
}

console.log(userChoiceData)
console.log(computerChoiceData)


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
    console.log(userChoiceData, computerChoiceData)
    // updateCounter()
}

//play again
playAgainBtn.addEventListener('click', () => {
    finalResultDisplay.classList.add('hidden')
    resultWaitDisplay.classList.add('hidden')
    gameDisplay.classList.remove('hidden')
    while (yourChoice.firstChild) {
        yourChoice.removeChild(yourChoice.firstChild);
    }

    // Remove all children from computerChoiceDisplay
    while (computerChoiceDisplay.firstChild) {
        computerChoiceDisplay.removeChild(computerChoiceDisplay.firstChild);
    }
})
