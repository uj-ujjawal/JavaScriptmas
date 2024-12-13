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
const gameTitle = document.getElementById("game-title");
const firstText = document.querySelector(".white-title");
const lastText = document.querySelector(".red-title");
const loader = document.querySelector(".loader");
const start = document.querySelector(".start");
const startBtn = document.getElementById("start-button");

let totalMatchFound = 0;
let count = 0;
let pair = [];
let cards = [];

function initGame() {
  console.log("Game Initialized");
  const shuffledEmojis = shuffleEmojis([...emojis, ...emojis]);
  createCards(shuffledEmojis);
}

function shuffleEmojis(emojis) {
  return emojis.sort(() => Math.random() - 0.5);
}

// Create cards on the game board
function createCards(shuffledEmojis) {
  gameBoard.innerHTML = "";
  shuffledEmojis.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-front">?</div>
      <div class="card-back">${emoji}</div>
    `;
    gameBoard.appendChild(card);
    cards.push(card);
  });
  console.log("Cards created and emojis allotted");
}

function showCard(card) {
  card.classList.add("open", "disable");
}

// Check if the selected pair matches
function matchPair(pair) {
  if (pair[0] === pair[1]) {
    totalMatchFound++;
    console.log(totalMatchFound);
    return true;
  }
  return false;
}

function hideCard() {
  console.log("Hiding unmatched cards");
  setTimeout(() => {
    cards.forEach((card) => {
      if (
        card.classList.contains("open") &&
        !card.classList.contains("keepItOpen")
      ) {
        card.classList.remove("open", "disable");
        console.log("Card Closed");
      }
    });
  }, 500);
}

function keepMatchedCardsOpen() {
  cards.forEach((card) => {
    if (card.classList.contains("open")) {
      card.classList.add("keepItOpen");
      console.log("Matched card kept open");
    }
  });
}

function isGameOver() {
  if (totalMatchFound === cards.length / 2) {
    setTimeout(() => {
      start.classList.add("restart-button");
      start.style.display = "block";
      startBtn.textContent = "Restart";
    }, 1000);
  }
}

// Type text animation for the title
function typeText() {
  let i = 0;
  const first = firstText.textContent;
  const last = lastText.textContent;
  firstText.textContent = "";
  lastText.textContent = "";

  function type() {
    if (i < first.length) {
      firstText.textContent += first.charAt(i);
      i++;
      setTimeout(type, 100);
    } else if (i - first.length < last.length) {
      lastText.textContent += last.charAt(i - firstText.textContent.length);
      i++;
      setTimeout(type, 100);
    } else {
      setTimeout(() => {
        loader.style.display = "none";
        start.style.display = "block";
      }, 1000);
    }
  }
  type();
}

// Start the typing animation
typeText();

// Start the game on button click
startBtn.addEventListener("click", () => {
  initGame();
  count = 0;
  pair = [];
  start.style.display = "none";
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      if (
        this.classList.contains("open") ||
        this.classList.contains("keepItOpen") ||
        count > 2
      ) {
        return;
      }

      count++;
      console.log("Card opened:", count);
      showCard(this);
      const emoji = this.querySelector(".card-back").textContent;
      pair.push(emoji);

      if (count === 2) {
        if (matchPair(pair)) {
          keepMatchedCardsOpen();
        } else {
          hideCard();
        }
        pair = [];
        count = 0;
      }
      isGameOver();
    });
  });
});
