/*
The cool people of Lapland are bored of traditional social media and have decided to build their own app called Northagram...and they need your help!

This is how the app should work:
- It displays circular avatars of the friends who have uploaded pictures lately. These avatars have a white border. ✅
- Underneath, it cycles through the friends' pictures displaying each for 1.5 seconds. (There's an animated snowman loading state before pictures load.) ✅
- While a friend's pictures are being displayed, that friend's avatar gets a red border. ✅
- This red border reverts to white when their pictures have finished being displayed. ✅
- When all of the images have been displayed, the user should see a message "Refresh to load latest images". All avatars should have a white border at this point. ✅

Stretch Goals for dedicated Social Media Engineers

- Add captions to the images. ✅
- Refactor your code to use generators!
- Grey out the avatar after that friend's pictures have been displayed. ✅
- Make it so clicking on an image pauses the timer.
- Add left and right arrow overlays to the image so users can scroll back and forth. ✅
*/
import { feedData } from "./data.js";

const feedAvatars = document.querySelector(".feed-avatars");
const feedImages = document.querySelector(".feed-images");
const DELAY_TIMER = 1500;

let avatars = [];
let slideshowTimer = null;
let currentAvatarIndex = 0;
let currentImageIndex = 0;

setTimeout(() => {
  feedData.forEach((data, index) => {
    const imgElement = document.createElement("img");
    imgElement.classList.add("avatar");
    imgElement.src = `images/${data.avatarUrl}`;
    imgElement.alt = data.handle;
    imgElement.addEventListener("click", () => {
      startSlideshowFromAvatar(index);
    });
    avatars.push(imgElement);
    feedAvatars.append(imgElement);
  });
}, 800);

const renderImages = () => {
  function processNextImage() {
    if (currentAvatarIndex >= feedData.length) {
      displayEndMessage();
      return true;
    }

    const feedItem = feedData[currentAvatarIndex];

    if (currentImageIndex >= feedItem.features.length) {
      updateAvatar(currentAvatarIndex, "gray");
      currentAvatarIndex++;
      currentImageIndex = 0;

      if (currentAvatarIndex < feedData.length) {
        updateAvatar(currentAvatarIndex, "highlight");
      }

      processNextImage();
      return false;
    }

    updateAvatar(currentAvatarIndex, "highlight");
    displayFeatureImage(feedItem.features[currentImageIndex]);
    currentImageIndex++;

    return false;
  }

  function displayFeatureImage(img) {
    feedImages.innerHTML = `
      <div class="feature-image">
        <img alt="${img.alt}" src="images/${img.imageUrl}">
        <button class="arrow left-arrow">&#8249;</button>
        <button class="arrow right-arrow">&#8250;</button>
      </div>
      <p class="img-caption">${img.alt}</p>
    `;

    const image = document.querySelector(".feature-image img");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    // When the image loads, add the 'loaded' class to trigger the fade-in effect
    image.onload = function () {
      image.classList.add("show");
    };

    leftArrow.addEventListener("click", showPreviousImage);
    rightArrow.addEventListener("click", showNextImage);
  }
  function displayEndMessage() {
    feedImages.innerHTML = `
      <div class="last-message">
        <p>All Caught Up</p>
        <p>Refresh to load the latest images</p>
      </div>
    `;
  }

  function showPreviousImage() {
    if (currentImageIndex > 1) {
      currentImageIndex -= 2;
      processNextImage();
    } else if (currentAvatarIndex > 0) {
      currentAvatarIndex--;
      currentImageIndex = feedData[currentAvatarIndex].features.length - 1;
      processNextImage();
    }
  }

  function showNextImage() {
    processNextImage();
  }

  return {
    next: processNextImage,
  };
};

function updateAvatar(index, className) {
  avatars[index].classList.remove("highlight", "gray");
  avatars[index].classList.add(className);
}

function resetAllAvatars() {
  avatars.forEach((avatar) => {
    avatar.classList.remove("highlight", "gray");
  });
}

const imageRenderer = renderImages();

function startSlideshow() {
  clearInterval(slideshowTimer);
  slideshowTimer = setInterval(() => {
    const completed = imageRenderer.next();
    if (completed) {
      clearInterval(slideshowTimer);
    }
  }, DELAY_TIMER);
  // console.log(slideshowTimer);
}

function startSlideshowFromAvatar(avatarIndex) {
  clearInterval(slideshowTimer);
  resetAllAvatars();
  currentAvatarIndex = avatarIndex;
  currentImageIndex = 0;
  updateAvatar(currentAvatarIndex, "highlight");
  startSlideshow();
}

startSlideshow();

// Hamburger menu functionality
const navList = document.getElementById("nav__list");
const hamburgerMenu = document.getElementById("hamburger__menu");

hamburgerMenu.addEventListener("click", toggleMenu);

function toggleMenu() {
  const isVisible = navList.style.display === "block";
  navList.style.display = isVisible ? "none" : "block";
  console.log(isVisible ? "none" : "block");
}
