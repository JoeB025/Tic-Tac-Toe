// Get references to all grid cells/buttons on the game board
const topLeft = document.getElementById('top-left');
const topCentre = document.getElementById('top-centre');
const topRight = document.getElementById('top-right');
const midLeft = document.getElementById('mid-left');
const midCentre = document.getElementById('mid-centre');
const midRight = document.getElementById('mid-right');
const bottomLeft = document.getElementById('bottom-left');
const bottomCentre = document.getElementById('bottom-centre');
const bottomRight = document.getElementById('bottom-right');

// Add event listeners to each cell/button on the game board
topLeft.addEventListener('click', () => handleClick('top-left', topLeft));
topCentre.addEventListener('click', () => handleClick('top-centre', topCentre));
topRight.addEventListener('click', () => handleClick('top-right', topRight));
midLeft.addEventListener('click', () => handleClick('mid-left', midLeft));
midCentre.addEventListener('click', () => handleClick('mid-centre', midCentre));
midRight.addEventListener('click', () => handleClick('mid-right', midRight));
bottomLeft.addEventListener('click', () => handleClick('bottom-left', bottomLeft));
bottomCentre.addEventListener('click', () => handleClick('bottom-centre', bottomCentre));
bottomRight.addEventListener('click', () => handleClick('bottom-right', bottomRight));

// Get references to reset button and player score displays
const resetButton = document.getElementById('reset-button');
const playerOneScoreDisplay = document.getElementById('player-one-score');
const playerTwoScoreDisplay = document.getElementById('player-two-score');
const displayTurn = document.getElementById('turn');
const winMessage = document.getElementById('win-message');

const playerOneTurn = 'Player One To Play'
const playerTwoTurn = 'Player Two To Play'
const playerOneWinMessage = 'Player One Wins This Game'
const playerTwoWinMessage = 'Player Two Wins This Game'
const gameDrawn = 'This Game Is a Draw. No Points awarded.'

// Define constants for player names
const playerOne = 'Player One';
const playerTwo = 'Player Two';
const playerOneSymbol = 'X'
const playerTwoSymbol = 'O'

// Initialize variables to track current player and scores
let currentPlayer = playerOne;
let playerOneScore = 0;
let playerTwoScore = 0;

// Initialize arrays to store available picks and each player's picks
const availablePicks = [];
const playerOnePicks = [];
const playerTwoPicks = [];

// Function to handle click events on cells/buttons
function handleClick(choice, button) {
  // Check if the cell/button has already been selected
  if (!availablePicks.includes(choice)) {
    // console.log(`${currentPlayer} clicked on ${choice}`);
    availablePicks.push(choice);

    // Update picks arrays and display 'X' or 'O' based on current player
    if (currentPlayer === playerOne) {
      playerOnePicks.push(choice);
      button.textContent = 'X'; // Display 'X' for Player One
      currentPlayer = playerTwo;
      displayTurn.textContent = playerTwoTurn
      // displayTurnFunction(playerTwo)
    } else if (currentPlayer === playerTwo) {
      playerTwoPicks.push(choice);
      button.textContent = 'O'; // Display 'O' for Player Two
      currentPlayer = playerOne;
      // displayTurnFunction(playerOne)
      displayTurn.textContent = playerOneTurn
    }

    // Check for a winner after each move
    checkWinner();
    // console.log(`The current player is now ${currentPlayer}`);
  } else {
    // console.log(`${choice} has already been chosen. Please choose another!`);
  }
}

// Function to check if there's a winner after each move
function checkWinner() {
  // Define winning combinations
  const winningCombinations = [
    ['top-left', 'top-centre', 'top-right'],
    ['mid-left', 'mid-centre', 'mid-right'],
    ['bottom-left', 'bottom-centre', 'bottom-right'],
    ['top-left', 'mid-left', 'bottom-left'],
    ['top-centre', 'mid-centre', 'bottom-centre'],
    ['top-right', 'mid-right', 'bottom-right'],
    ['top-left', 'mid-centre', 'bottom-right'],
    ['top-right', 'mid-centre', 'bottom-left']
  ];

  // Iterate through each winning combination
  for (const combination of winningCombinations) {
    // Check if Player One has won
    if (combination.every(cell => playerOnePicks.includes(cell))) {
      // console.log('Player One has won with', playerOnePicks, '<<<<<<<');
      // alert('Player One Wins!');
      winMessage.textContent = playerOneWinMessage
      playerOneScore++;
      playerOneScoreDisplay.textContent = playerOneScore;
      resetGame();
      return 'Player One Wins';
    } 
    
    // Check if Player Two has won
    if (combination.every(cell => playerTwoPicks.includes(cell))) {
      // console.log('Player Two has won with', playerTwoPicks, '<<<<<<<');
      // alert('Player Two Wins!');
      winMessage.textContent = playerTwoWinMessage
      playerTwoScore++;
      playerTwoScoreDisplay.textContent = playerTwoScore;
      resetGame();
      return 'Player Two Wins';
    }
  }

  // If there's no winner and the board is full, it's a draw
  if (availablePicks.length === 9) {
    // alert('It\'s a draw!');
    winMessage.textContent = gameDrawn
    resetGame();
  } 
  
  return null;
}

// Function to reset the game board and arrays
function resetGame() {
  availablePicks.length = 0;
  playerOnePicks.length = 0;
  playerTwoPicks.length = 0;

  // Reset the text content of all buttons to an empty string
  const buttons = document.querySelectorAll('.game-buttons');
  buttons.forEach(button => button.textContent = '');

  // Alternate initial player after each game
  if (playerOneScore === 0 && playerTwoScore === 0) {
    // Player One always starts first for the first game
    currentPlayer = playerOne;
  } 
  
}

// Event listener for the reset button
resetButton.addEventListener('click', () => {
  // Reset game scores and player scores displays
  playerOneScore = 0;
  playerTwoScore = 0;
  playerOneScoreDisplay.textContent = playerOneScore;
  playerTwoScoreDisplay.textContent = playerTwoScore;
  displayTurn.textContent = playerOne + ' To Go First'
  winMessage.textContent = 'Game Has Been Reset'
  setTimeout(() => winMessage.textContent = '', 5000)
  // Reset the game board
  resetGame();
});




// need to add in a line for when the game finishes. 
// the last symbol does not appear on the game board when a player wins
// the last symbol does not appear on the game board when the game is a draw