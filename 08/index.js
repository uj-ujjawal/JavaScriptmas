/*
Challenge
1. Your challenge is to build a Christmas take on the classic game "Hangman" where a player attempts to guess a word by selecting letters to save a snowman from melting.
- The snowman is made up of 6 parts: hat, arm, nose, scarf, head, and body. These are separate images and have been positioned with CSS.
- At the start of the game, a player can see a number of dashes, with a dash for each letter of the word. So if the word was TREE the player would see - - - -
- The player selects a letter.
- If that letter is in the word, that letter replaces the dash in the corresponding position. For the word "TREE", if the player has selected the letter E, they will see --EE.
- If the selected letter does not appear in the word, one part of the snowman gets removed.
- If the player guesses the entire word, they win!
    - any removed parts of the snowman are reinstated.
    - the snowman gets sunglasses
    - the message "You Win!" is displayed in the "guess-container" div.
-If the player guesses wrong 6 times:
    - only a puddle remains.
    - the message "You Lose!" is displayed in the "guess-container" div.

*** Stretch Goals ***

- Disable the letter button once a letter has been used.
- Add a "New Game" button that appears at the end of a game and resets the app. (You will need to create an array of words to guess)
*/

// The keyboard has been rendered for you
import { renderKeyboard } from "./keyboard.js";

// Some useful elements
const guessContainer = document.getElementById("guess-container");
const snowmanParts = document.getElementsByClassName("snowman-part");
const sunglasses = document.querySelector(".sunglasses");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const restartBtn = document.getElementById("restart-button");

// Set the word to guess
let dictionary = ["winter", "snow", "gift", "tree", "santa", "cookie"];

// choose word randomly from the dictionary
const randomWord = () => {
  const i = Math.floor(Math.random() * dictionary.length);
  return dictionary[i];
};
let word = "";

// 6 guesses for the 6 parts of the snowman
let totalGuesses = 6;
let missedGuesses = 0;

function createInputField() {
  // Create input fields dynamically based on the length of the word
  const inputField = [...word].map((letter, index) => {
    return `<div class="input-box" maxlength="1" aria-label="Character ${
      index + 1
    }" id=${index + 1}></div>`;
  });
  guessContainer.innerHTML = inputField.join("");
}

function takeInput() {
  const letters = document.getElementsByClassName("letter");

  // Add click event listener for each letter in the keyboard
  Array.from(letters).forEach((letter) =>
    letter.addEventListener("click", (event) => {
      const key = event.target.id; // Get the clicked key
      checkInput(key); // Pass the key to the processing function
    })
  );
}
function checkInput(key) {
  const inputBoxes = guessContainer.getElementsByClassName("input-box");
  let isCorrect = false;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === key) {
      const inputBox = inputBoxes[i];
      if (!inputBox.textContent) {
        inputBox.textContent = key;
        isCorrect = true;
      }
      disableKeyboardKey(key);
    }
  }
  if (!isCorrect) {
    missedGuesses++;
    hideSnowmanBodyPart(missedGuesses);
  }

  checkGameStatus(inputBoxes);
}
function hideSnowmanBodyPart(missedGuesses) {
  if (missedGuesses <= totalGuesses) {
    const part = snowmanParts[missedGuesses - 1];
    setTimeout(() => {
      part.classList.add("snowman-dissolveAndShrink");
    }, 100);
    setTimeout(() => {
      part.style.display = "none";
    }, 300);
  }
}
function resetSnowmanBodyPart() {
  Array.from(snowmanParts).forEach((part) => {
    part.classList.remove("snowman-dissolveAndShrink");
    part.style.display = "block";
  });
}
function disableKeyboardKey(letter) {
  const key = document.getElementById(letter);
  if (key) {
    key.style.fontStyle = "italic";
    key.style.textDecoration = "line-through";
    key.style.background = "#555";
    key.style.pointerEvents = "none";
    key.setAttribute("disabled", "true");
  }
}
function checkGameStatus(inputBoxes) {
  const allFilled = Array.from(inputBoxes).every(
    (box) => box.textContent !== ""
  );

  if (allFilled) {
    resetSnowmanBodyPart();

    sunglasses.style.visibility = "visible";
    showGameStats("It's a Win! You guessed the word.");
  } else if (missedGuesses >= totalGuesses) {
    showGameStats(`Oops! It's a Game Over! The word was: ${word}`);
  }
}

function showGameStats(message) {
  modalMessage.textContent = message;
  modal.style.display = "block";
}

function hideGameStats() {
  modal.style.display = "none";
}

function restartGame() {
  missedGuesses = 0;
  document.querySelector(".sunglasses");
  sunglasses.style.visibility = "hidden";
  Array.from(document.getElementsByClassName("letter")).forEach((button) => {
    button.removeAttribute("disabled");
  });
  resetSnowmanBodyPart();
  hideGameStats();
  init();
}

restartBtn.addEventListener("click", restartGame);

function init() {
  word = randomWord();
  console.log(word);
  createInputField();
  renderKeyboard();
  takeInput();
}

init();
