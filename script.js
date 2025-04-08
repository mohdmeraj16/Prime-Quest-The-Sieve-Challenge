let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;
const gridContainer = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');

// Prime number check function
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Generate a grid of random numbers
function generateGrid() {
    gridContainer.innerHTML = ''; // Clear grid before generating new one
    const numbers = [];
    const level = localStorage.getItem('selectedLevel'); // Get selected level from local storage
    let maxNumber;

    // Set max number based on level
    if (level === 'easy') {
        maxNumber = 100;
    } else if (level === 'medium') {
        maxNumber = 250;
    } else {
        maxNumber = 500;
    }

    for (let i = 0; i < 25; i++) {
        const num = Math.floor(Math.random() * maxNumber) + 1;
        numbers.push(num);
    }

    // Create grid items
    numbers.forEach(num => {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.textContent = num;
        div.onclick = () => checkNumber(num, div);
        gridContainer.appendChild(div);
    });
}

// Check if the selected number is prime
function checkNumber(num, element) {
    if (isPrime(num)) {
        score += 10;
        element.style.backgroundColor = '#32CD32'; // Green for prime
    } else {
        score -= 5;
        element.style.backgroundColor = '#FF0000'; // Red for non-prime
    }
    scoreDisplay.textContent = `Score: ${score}`;
}

// Start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    generateGrid(); // Generate grid on game start

    // Start timer countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer
            alert('Game Over! Your score is ' + score);
            resetGame(); // Reset the game after time is up
        }
    }, 1000);

    // Start score interval for smoother gameplay
    gameInterval = setInterval(() => {
        scoreDisplay.textContent = `Score: ${score}`;
    }, 100);
}

// Reset the game
function resetGame() {
    clearInterval(timerInterval);
    clearInterval(gameInterval);
    startButton.textContent = 'Restart Game';
    startButton.onclick = () => location.reload(); // Reload to restart the game
}