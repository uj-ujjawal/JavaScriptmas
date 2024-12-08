/*
You are going to build an app that challenges players to identify a Christmas Movie from some emoji 🍿 🎅 🎬. The players will have 3 guesses per movie.

For example, the emoji 🌇 💣 👮 ✈️ ️🔫  represent the film “Die Hard”, which everyone knows is the best Christmas movie of all time.

In data.js you have an array of Christmas movies with emoji and text for aria labels.

Your task is to build an app that meets these criteria:

- The app should present the player with a set of emoji selected at random from the array in data.js.

- The player will input their guess.

- If the player guesses correctly, the app should display a message saying "Correct!". Then, after a pause of 3 seconds, it should randomly select the next set of emoji clues and display them to the player.

- If the player’s guess is incorrect, the app should display a message saying “Incorrect! You have 2 more guesses remaining.”

- If the player fails to guess correctly on the next two attempts, the app should display a message saying, `The film was <Film Name Here>!`. After a pause of 3 seconds, it should randomly select a new set of emoji clues and display them to the player.

- When all films in the array have been used, the player should see a message saying "That's all folks!".

- Each film should only be used once. There should be no repetition.


Stretch Goals

- Use AI to decide if an answer is correct or incorrect. For example if the correct answer is "The Polar Express" but the player inputs "Polar Express" a straight comparison of the two strings will find that the player's answer was incorrect. AI could assess if there is sufficient similarity between the strings to judge it as correct.

- Improve the UX by disabling the form/button when the game is over and during the pause between questions.
*/

import { films } from "./data.js";

const guessForm = document.getElementById("guess-form");
const userInput = document.getElementById("user-input");
const messageContainer =
  document.getElementsByClassName("message-container")[0];
const emojiCluesContainer = document.getElementsByClassName(
  "emoji-clues-container"
)[0];
let totalCorrectGuess = 0;
let totalIncorrectGuess = 0;
let totalRemainingGuess = 3;
const askedFilms = [];

getNewQuiz();

function randomIndices() {
  return Math.floor(Math.random() * films.length);
}

function generateNextQuizIndex() {
  let nextQuizIndex;
  if (askedFilms.length >= films.length) {
    console.log("No more films to ask or reached the max guess limit");
    messageContainer.textContent = "That's all folks!, ~ You did well...🎅🏻";
    return;
  }
  do {
    nextQuizIndex = randomIndices();
  } while (askedFilms.includes(nextQuizIndex));
  console.log(askedFilms);
  console.log(nextQuizIndex);
  return nextQuizIndex;
}

function getNewQuiz() {
  totalRemainingGuess = 3;
  userInput.value = "";
  messageContainer.innerHTML = `You have ${totalRemainingGuess} guesses remaining`;
  const nextQuizIndex = generateNextQuizIndex();
  emojiCluesContainer.innerHTML = films[nextQuizIndex].emoji.join(" ");
  askedFilms.push(nextQuizIndex);
}

guessForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateUserInput();
});

function validateUserInput() {
  if (userInput.value.trim() !== "") {
    const userGuess = userInput.value.trim().toLowerCase();
    const correct_answer = correctGuess();
    processResult(userGuess, correct_answer);
  } else {
    alert("Don't forget to enter your answer before submitting.");
  }
}
function correctGuess() {
  const currentQuizIndex = askedFilms[askedFilms.length - 1];
  const currentQuizAnswer = films[currentQuizIndex].title.toLowerCase().trim();
  console.log("currentQuizAnswer: " + currentQuizAnswer);
  return currentQuizAnswer;
}

function processResult(userGuess, correct_answer) {
  disableForm();
  messageContainer.textContent = "";
  toggleSpinner();

  setTimeout(() => {
    toggleSpinner();
    if (userGuess === correct_answer) {
      handleSuccessAttempt();
    } else {
      handleFailedAttempt(correct_answer);
    }
  }, 2000);
}

function handleSuccessAttempt() {
  totalCorrectGuess++;
  messageContainer.textContent = `Congrats 🥳🎉 You got it correctly!`;
  toggleLoader();
  setTimeout(() => {
    enableForm();
    getNewQuiz();
    toggleLoader();
  }, 3000);
}

function handleFailedAttempt(correct_answer) {
  totalRemainingGuess--;
  enableForm();
  totalIncorrectGuess++;

  if (totalRemainingGuess > 0) {
    userInput.value = "";
    messageContainer.textContent = `Incorrect! You have ${totalRemainingGuess} more guesses remaining.`;
    if (totalRemainingGuess === 1) {
      messageContainer.textContent = "Incorrect!, This is your last chance.!";
    }
  } else {
    messageContainer.textContent = `The Film Was ${correct_answer}`;
    disableForm();
    toggleLoader();
    setTimeout(() => {
      enableForm();
      toggleLoader();
      getNewQuiz();
    }, 4000);
  }
}

function disableForm() {
  guessForm.classList.add("disabled");
  Array.from(guessForm.elements).forEach((element) => {
    element.disabled = true;
  });
  console.log("Form has been disabled.");
}
function enableForm() {
  guessForm.classList.remove("disabled");
  console.log("Form has been enabled.");
  Array.from(guessForm.elements).forEach((element) => {
    element.disabled = false;
  });
}

function toggleSpinner() {
  messageContainer.classList.toggle("spinner");
}

function toggleLoader() {
  document.getElementById("loader").classList.toggle("loader");
}


function showStats(){

}