/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
/* Flag variable to determine if game is over.
   Initialized to true so roll and hold buttons dont trigger */
let winner = true;
// Global variable to determine current player
let player;
// Default score to end game. In case it's not specified
let winningScore = 100;
// Selecting elements
const dice = [...document.querySelectorAll('.dice')];
const newGameBtn = document.querySelector('.btn-new');
const rollDiceBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const scoreInput = document.querySelector('.winningScore');
const roundScores = document.querySelectorAll('.player-current-score');
const playerScores = document.querySelectorAll('.player-score');
const playerNames = [...document.querySelectorAll('.player-name')];
const playerPanels = {
  0: document.querySelector('.player-0-panel'),
  1: document.querySelector('.player-1-panel'),
};
// Runs on page load and for new games. Resets 'board'
function startGame() {
  // Hiding dice
  dice.forEach(dice => dice.style.display = 'none');
  // First player is always Player 1
  player = 0;
  // Clearing out scores
  roundScores.forEach(round => round.textContent = 0);
  playerScores.forEach(playerScore => playerScore.textContent = 0);
  // Resetting player names. Arrays are 0-based so 1 is added to the index
  playerNames.forEach(name => name.textContent = `Player ${playerNames.indexOf(name) + 1}`);
  // Removing winner and active classes from both player 'panels' - outermost player div
  Object.entries(playerPanels).forEach(([key, panel]) => panel.classList.remove('active', 'winner'));
}

function newGame() {
  // to reset scores, panels, classes
  startGame();  
  // Setting flag to false
  winner = false;
  // Player 1 is the active player
  playerPanels[player].classList.add('active');
}
// Runs on dice roll click
function playGame() {
  // If there is a winner - return
  if (winner) return;
  // Displaying dice
  dice.forEach(dice => dice.style.display = 'block');
  // roundScore for current player is text in current player's round score div
  let roundScore = parseInt(roundScores[player].textContent);
  // Generating two random numbers. Between 1 and 6 (1 inclusive) 
  const rollDice1 = Math.floor(Math.random() * (7 - 1) + 1);
  const rollDice2 = Math.floor(Math.random() * (7 - 1) + 1);
  // Setting src for dice img elements to be dice of random values  
  dice[0].src = `dice-${rollDice1}.png`;
  dice[1].src = `dice-${rollDice2}.png`;
  // If neither dice were value of 1
  if (rollDice1 > 1 && rollDice2 > 1) {
    // Current player's round score is value of both dice 
    roundScores[player].textContent += rollDice1 + rollDice2;
  } else {
    // Else current players round score is 0
    roundScores[player].textContent = 0; 
    // Next player's turn
    switchPlayer();  
  }
}
// Runs when a player rolls a one
function switchPlayer() {
  // Hiding dice
  dice.forEach(dice => dice.style.display = 'none');
  // Switching the active player by witching active class player
  playerPanels[player].classList.remove('active');
  player = (player > 0) ? 0 : 1;
  playerPanels[player].classList.add('active');
}
// Runs on hold click
function handleHold() {
  if (winner) return;
  // winning score is value in text input or (if empty) - the default
  winningScore = scoreInput.value || winningScore;
  // round and player score are current text contents of current player's score div's
  const roundScore = parseInt(roundScores[player].textContent);
  let playerScore = parseInt(playerScores[player].textContent);
  // round score is added to player score
  playerScore += roundScore;
  // Updating the display for player score  
  playerScores[player].textContent = playerScore;
  // Setting round score to 0 (both visually and programatically)
  roundScores[player].textContent = 0;
  // If player score >= the game end score
  if (playerScore >= winningScore) {
    // Winner replaces Player display
    playerNames[player].textContent = 'Winner!';
    // active class is removed and winner class is added for player div
    playerPanels[player].classList.remove('active');
    playerPanels[player].classList.add('winner');
    // game over flag set to true
    winner = true;  
  } else {
    // Player score < game end score. Switch players
    switchPlayer();
  }
}
// Button click events
newGameBtn.addEventListener('click', newGame);
rollDiceBtn.addEventListener('click', playGame);
holdBtn.addEventListener('click', handleHold);
// Resets the 'board' on page load
startGame();