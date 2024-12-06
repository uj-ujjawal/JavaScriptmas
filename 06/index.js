/*
Challenge:
1. Write JavaScript to create a snowflake and make it fall inside the snow globe. The snowflake should have a random starting position, animation duration, and size.
2. See index.css
*/

/* Stretch goals:
- Give some variety to your snowflakes, so they are not all the same. Perhaps every 25th one could be a snowman ☃️?
- Remove each snowflake after a set time - this will stop the scene from being lost in a blizzard!
- Add a button that makes the snow start falling, it could trigger a CSS-animated shake of the snow globe. Then make the snow become less frequent until it slowly stops - until the button is pressed again.
- Change the direction of the snowflakes so they don’t all fall vertically.
- Make the style your own!
*/

// Let's create a snowflake every 100 milliseconds!

const snowGlobe = document.querySelector(".snow-globe");

// Maximum number of falling emojis (to avoid overcrowding)
const maxItems = 50; // Limit the total number of falling emojis
let items = [];

// Emoji options (snowflakes)
const emojis = ["❄️", "☃️", "⛄"]; // All three emojis to choose from

// Counter for the number of random emojis used (between 2 and 5 times)
let randomEmojiCount = 0;

// Function to create a new snowflake emoji
function createEmoji() {
  if (items.length >= maxItems) return; // Limit the number of snowflakes

  // Create a snowflake element
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");

  let emojiChoice;
  if (items.length <= 20) {
    emojiChoice = "❄️";
  } else {
    if (randomEmojiCount < 8 && Math.random() < 0.25) {
      emojiChoice = emojis[Math.floor(Math.random() * emojis.length)];
      randomEmojiCount++;
    } else {
      emojiChoice = "❄️";
    }
  }

  emoji.textContent = emojiChoice;

  // Random size for each emoji
  const size = Math.random() * 10 + 8;
  emoji.style.fontSize = `${size}px`;

  emoji.style.left = `${Math.random() * 100}%`;

  emoji.style.top = `${-size}px`;

  const speed = Math.random() * 1 + 2;
  //dataset.speed -> create attribute like data-speed and assign value to it, <div class="emoji" data-set="--random value set by the math.random"></div>
  emoji.dataset.speed = speed;

  // Random drift(horizontal movement) value
  const drift = Math.random() * 2 - 1;
  emoji.dataset.drift = drift;

  snowGlobe.appendChild(emoji);
  items.push(emoji);
}

function animateEmojiFall() {
  items.forEach((emoji) => {
    const speed = parseFloat(emoji.dataset.speed);
    let drift = parseFloat(emoji.dataset.drift);

    // Move the emoji downward
    let top = parseFloat(emoji.style.top) || 0;
    top += speed;

    let left = parseFloat(emoji.style.left) || 0;
    left += drift;

    if (Math.random() < 0.01) {
      drift = Math.random() * 2 - 1;
      emoji.dataset.drift = drift;
    }

    emoji.style.top = `${top}px`;
    emoji.style.left = `${left}%`;

    // Reset the emoji to the top once it goes off screen
    if (top > window.innerHeight) {
      emoji.style.top = `${-parseFloat(emoji.style.fontSize)}px`;
      emoji.style.left = `${Math.random() * 100}%`;

      const speed = Math.random() * 1 + 2;
      emoji.dataset.speed = speed;

      const newDrift = Math.random() * 2 - 1;
      emoji.dataset.drift = newDrift;
    }
  });

  // Request the next animation frame to keep the falling effect going
  //requestAnimationFrame: is a built-in method that tells the browser to call a specified function before the next repaint of the browser window
  requestAnimationFrame(animateEmojiFall);
}

function startSnowflakeEffect() {
  setInterval(createEmoji, 100);
  animateEmojiFall();
}

startSnowflakeEffect();
