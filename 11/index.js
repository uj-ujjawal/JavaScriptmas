/**
 *🎄 Requirements:
 * - This is a classic "Find the Pair" game with a christmas theme.
 * - The player should be able to reveal cards by clicking on them.
 * - When the player reveals one card, it should stay revealed until a second card is revealed.
 * - When the player reveals two cards:
 *   - If they are the same, they should remain revealed for the rest of the game.
 *   - If they are different, they should be flipped back to hidden.
 * - The cards should be shuffled at the start of each game.
 */

/**
 * 🎅 Stretch Goals:
 * - Add a point system where points are awarded for each correctly revealed pair
 *   and deducted for each incorrect pair (you decide the exact points for each action).
 * - Implement a high-score system using the browser's local storage.
 * - Add a "Restart Game" button that appears when the game ends so the user can start over.
 */

const emojis = ["🎄", "🎁", "🎅", "☃️"];
const gameBoard = document.getElementById("game-board");
function initGame() {
  console.log("Game Initialized");
  const emojisDoubled = [...emojis, ...emojis];
  const shuffledEmojis = emojisDoubled.sort(() => Math.random() - 0.5);
  createCards(shuffledEmojis);
}

initGame();

function createCards(shuffledEmojis) {
  for (let i = 0; i < emojis.length * 2; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.innerHTML = shuffledEmojis[i];
    card.appendChild(cardFront);
    cardFront.innerHTML = "?";
    card.appendChild(cardBack);
    gameBoard.appendChild(card);
  }
  console.log("card created and emoji alloted");
}

let count = 0;
let pair = [];
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", function () {
    if (
      !(
        this.classList.contains("open") || this.classList.contains("keepItOpen")
      )
    ) {
      count++;
      console.log("count:", count + " card opened");
      showCard(this);
      const emoji = card.querySelector(".card-back").textContent;
      pair.push(emoji);
    } else {
      setTimeout(() => {
        alert(
          "This card is already open. Please choose a different one to continue."
        );
      }, 100);
      return;
    }
    if (count === 2) {
      console.log(pair);
      if (matchPair(pair)) {
        keepItOpen();
      } else {
        hideCard();
      }
      pair = [];
      count = 0;
    }
  });
});
function showCard(card) {
  card.classList.add("open");
  card.classList.add("disable");
}

function matchPair(pair) {
  if (pair[0] === pair[1]) {
    console.log("pair found");
    return true;
  } else {
    console.log("pair not found");
    return false;
  }
}

function hideCard() {
  console.log("hide card");
  setTimeout(() => {
    cards.forEach((card) => {
      if (card.classList.contains("open")) {
        card.classList.remove("open");
        card.classList.remove("disable");
        console.log("Card Closed");
      }
    });
  }, 1000);
}

function keepItOpen() {
  cards.forEach((card) => {
    if (card.classList.contains("open")) {
      card.classList.remove("open");
      card.classList.add("keepItOpen");
      console.log("KeepItOpen");
      ("keepItOpen");
    }
  });
}
