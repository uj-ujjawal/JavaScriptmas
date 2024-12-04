/*  Santas Emoji Hack!

During Christmas, Santa wants to ban negative emojis, so when people
use negative emoji shortcodes, he wants positive emojis to appear instead.

In other words, :angry: should result in 🎁 instead of 😠.


*/

const hackedEmojis = {
  angry: "🎁", // 😠
  thumbsdown: "👏", // 👎
  man_facepalming: "🎅", // 🤦‍♂️
  cry: "‍😄", // 😭
  puke: "🤩", // 🤮
};

/* 1. Write a function that checks if a lowercase word starts and
ends with a colon. If it does, check if it exists in the hackedEmojis object,
and replace it with the corresponding emoji. If not, return the original word.


Example input: ":cry:"
Example output: ‍😄

*/
function emojifyWord(word) {
  const regex = /^:(.*):$/;
  const match = word.match(regex);
  // console.log(match);
  if (match) {
    return hackedEmojis[match[1]] || word;
  }
  return word;
}

// console.log(emojifyWord(":angry:"));

/* 2. Write a function to find any emoji shortcodes in a phrase.
Use your emojify function from the previous exercise!

Example input: "Just read your article :thumbsdown:"
Example output: "Just read your article 👏"
*/
function emojifyPhrase(phrase) {
  const regex = /:([a-zA-Z_]+):/;
  const newPhrase = phrase.replace(regex, (match) => emojifyWord(match));

  // console.log(newPhrase);
  return newPhrase;
}
// console.log(emojifyPhrase("Those shoes :puke:"));

// Stretch goal: don't just replace the shortcodes, but also
// any emojis are added directly to the text.

const myForm = document.querySelector(".myForm");
const userInput = document.querySelector("#userInput");
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = userInput.value;
  const output = emojifyPhrase(inputText);
  createOverlay(output);
});

function createOverlay(message) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const dialogBox = document.createElement("div");
  dialogBox.classList.add("dialogBox");

  const dialogBoxMessage = document.createElement("p");
  dialogBoxMessage.textContent = message;
  dialogBox.appendChild(dialogBoxMessage);

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = `<i class="fa-solid fa-close"></i>`;

  dialogBox.appendChild(closeBtn);
  overlay.appendChild(dialogBox);
  document.body.appendChild(overlay);

  closeBtn.addEventListener("click", function () {
    document.body.removeChild(overlay);
  });
}
