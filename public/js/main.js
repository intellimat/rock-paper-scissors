// Players
const USER      = 'user';
const COMPUTER  = 'computer';
const DRAW      = 'draw';

// Possible choices
const ROCK      = 'rock';
const PAPER     = 'paper';
const SCISSORS  = 'scissors';

let userChoice      = '';
let randomChoice    = '';

let scores = {
    user: 0,
    computer: 0
};

const scoreIncrements = {
    win: 100,
    draw: 50,
    lose: 0
};

// IIFE main function
(function () {
    let closeModalButton = document.getElementById('closeModalButton');
    closeModalButton.addEventListener('click', () => showModal(false));

    document.getElementById('restartButton').addEventListener('click', () => {
        scores.user = 0;
        scores.computer = 0;
        renderScores();
        setRandomChoice();
        userChoice = '';
        showRestartButton(false);
    })

    setRandomChoice();

    let choices = document.getElementsByClassName('choice');
    for(let i=0; i<choices.length; i++){
        let choice = choices[i];
        choice.addEventListener('click', function(event){
            userChoice = choice.getAttribute('id');
            console.log('User choice is: ' + userChoice);

            let winner = getWinner();
            updateModal(winner);
            updateScores(winner);
            showModal(true);
            showRestartButton(true);
        })
    }
})();

// Select a random choice (Computer choice)
function setRandomChoice () {
    let randomNumber = Math.floor(Math.random() * 3);
    switch(randomNumber){
        case 0:
            randomChoice = ROCK;
        break;
        case 1:
            randomChoice = PAPER;
        break;
        case 2:
            randomChoice = SCISSORS;
        break;
    }
}

function getWinner() {
    if (userChoice === randomChoice)
        return DRAW;

    switch (userChoice){
        case ROCK:
            if (randomChoice === SCISSORS)
                return USER;
            return COMPUTER;

        case PAPER:
            if (randomChoice === ROCK)
                return USER;
            return COMPUTER;

        case SCISSORS:
            if (randomChoice === PAPER)
                return USER;
            return COMPUTER;
        default:
            return '';
    }
}

function updateScores(winner){
    switch(winner){
        case USER:
            scores.user     += scoreIncrements.win;
        break;
        case COMPUTER:
            scores.computer += scoreIncrements.win;
        break;
        case DRAW:
            scores.user     += scoreIncrements.draw;
            scores.computer += scoreIncrements.draw;
        break;
    }
    renderScores();
}

function renderScores(){
    document.getElementById('userScore').innerText = `Player: ${scores.user}`;
    document.getElementById('computerScore').innerText = `Computer: ${scores.computer}`;
}

function showRestartButton(boolean){
    if (boolean)
        document.getElementById('restartButton').style.display = 'inline-block';
    else
        document.getElementById('restartButton').style.display = 'none';
}

function updateModal(winner){
    let modalContent = document.getElementById('result');
    let h1 = document.createElement('h1');
    let p  = document.createElement('p');

    if (winner === USER){
        h1.innerText = 'You Win';
        p.innerText  = `Computer chose ${randomChoice}`;
    }
    else if (winner === COMPUTER){

        h1.innerText = 'You Lost';
        p.innerText  = `Computer chose ${randomChoice}`;
    }
    else if (winner === DRAW){ // It's a draw
        h1.innerText = `It's a draw`;
        p.innerText  = `The computer and you chose ${randomChoice}`;
    } 
    else {
        h1.innerText = 'Sorry, an error occurred.';
        p.innerText  = 'Uncaught error ';
    }

    modalContent.appendChild(h1);
    modalContent.appendChild(p);

}

function showModal(boolean){
    let modalElement = document.getElementsByClassName('modal')[0];
    if (boolean)
        modalElement.style.display = 'block';
    else {
        modalElement.style.display = 'none';
        // Let's cancel the content so that the modal will be ready for the next round of the game
        let modalContent = document.getElementById('result');
        modalContent.removeChild(modalContent.getElementsByTagName('h1')[0]);
        modalContent.removeChild(modalContent.getElementsByTagName('p')[0]);
        // Let's also reset the computer choice
        setRandomChoice();
        userChoice = '';
    }
}