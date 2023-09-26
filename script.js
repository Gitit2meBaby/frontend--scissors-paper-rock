const gameDisplay = document.querySelector('.app')

const resultWaitDisplay = document.querySelector('.result');
const finalResultDisplay = document.querySelector('.result-display')


// template for choice made
const yourChoiceTemplate = (data) => `
<div class="border ${data} upsize upsize-border">
        <div class="circle upsize">
          <img class="upsize" src="images/icon-${data}.svg" alt="hand symbol for ${data}">
        </div>
        `;

// listening for user choice
const choices = document.querySelectorAll('.choices')

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        console.log('clicked')
        data = choice.getAttribute('data-choice')
        appendChoice(data)
        randomChoice()
    })
})

// passing the choice to a new div and changing screens
function appendChoice(data) {
    const userChoice = document.createElement('div');
    userChoice.innerHTML = yourChoiceTemplate(data)

    const yourChoice = document.querySelector('.your-choice')
    yourChoice.appendChild(userChoice);

    gameDisplay.classList.add('hidden')
    resultWaitDisplay.classList.remove('hidden')
}


// making a random computer choice
let choiceArray = ['rock', 'paper', 'scissors']
const min = 0;
const max = 3;

function randomChoice() {
    const randomInteger = Math.floor(Math.random() * (max - min)) + min;
    console.log(randomInteger);

    const computerChoiceValue = choiceArray[randomInteger];
    console.log(computerChoiceValue)

    data = computerChoiceValue

    const makeWait = () => {
        const computerChoice = document.createElement('div');
        computerChoice.innerHTML = yourChoiceTemplate(data);

        const computerChoiceDisplay = document.querySelector('.computer-choice');
        computerChoiceDisplay.appendChild(computerChoice);

        const blankCircle = document.querySelector('.blank-div');
        blankCircle.classList.add('hidden');
    };

    setTimeout(makeWait, 1000);


}