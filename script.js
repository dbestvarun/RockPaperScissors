let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScore();
function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = ''
    if (randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 2 / 3) {
        computerMove = 'paper';
    }
    else {
        computerMove = 'scissors';
    }

    return computerMove;
}

let autoPlaying = false;
let intervalId;

document.querySelector('.js-auto').addEventListener('click', () => {
    if (!autoPlaying) {
        intervalId = setInterval(() => {
            let playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        autoPlaying = true;
        document.querySelector('.js-auto').innerHTML = 'Stop Playing';
    } else {
        clearInterval(intervalId);
        autoPlaying = false;
        document.querySelector('.js-auto').innerHTML = 'Auto Play';
    }
});



document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    }
    else if (event.key === 'p') {
        playGame('paper');
    }
    else if (event.key === 's') {
        playGame('scissors');
    }
    else if (event.key === 'a') {
        if (!autoPlaying) {
            intervalId = setInterval(() => {
                let playerMove = pickComputerMove();
                playGame(playerMove);
            }, 1000);
            autoPlaying = true;
            document.querySelector('.js-auto').innerHTML = 'Stop Playing';
        } else {
            clearInterval(intervalId);
            autoPlaying = false;
            document.querySelector('.js-auto').innerHTML = 'Auto Play';
        }
    }
    else if (event.key === 'Backspace') {
        document.querySelector('.js-confirmation').innerHTML = `Are you sure you want to reset the score? 
    <button class="js-yes-confirmation reset-confirm-button">Yes</button>
    <button class="js-no-confirmation reset-confirm-button">No</button>`;
    }
    console.log(event.key);
});

function playGame(playerMove) {


    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'scissors') {
            result = 'Tie';
        }
        else if (computerMove === 'rock') {
            result = 'You Lose.';
        }
        else {
            result = 'You Win.';
        }
    }
    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        }
        else if (computerMove === 'paper') {
            result = 'You Lose.';
        }
        else {
            result = 'You Win.';
        }
    }
    else {
        if (computerMove === 'paper') {
            result = 'Tie';
        }
        else if (computerMove === 'scissors') {
            result = 'You Lose.';
        }
        else {
            result = 'You Win.';
        }
    }

    if (result === 'Tie') {
        score.ties += 1;
    }
    else if (result == 'You Win.') {
        score.wins += 1;
    }
    else {
        score.losses += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
<img src="pictures/${playerMove}-emoji.png" class="move-icon">
<img src="pictures/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    document.querySelector('.js-confirmation').innerHTML = `Are you sure you want to reset the score? 
    <button class="js-yes-confirmation reset-confirm-button">Yes</button>
    <button class="js-no-confirmation reset-confirm-button">No</button>`;
});

document.querySelector('.js-confirmation').addEventListener('click', (event) => {
    if (event.target.classList.contains('js-yes-confirmation')) {
        score.wins = 0;
        score.ties = 0;
        score.losses = 0;
        localStorage.removeItem('score');
        updateScore();
        document.querySelector('.js-result').innerHTML = '';
        document.querySelector('.js-moves').innerHTML = `The score was reset.`;
        document.querySelector('.js-confirmation').innerHTML = ' ';
    } else if (event.target.classList.contains('js-no-confirmation')) {
        document.querySelector('.js-confirmation').innerHTML = ' ';
    }
});

function updateScore() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}. Loses: ${score.losses}. Ties: ${score.ties}.`;
}


