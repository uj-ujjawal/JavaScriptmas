import { addresses } from "./addresses.js";
/*
Writing out labels by hand is a real pain. Luckily, you are so organised that you have all of your contacts saved in an array.

But not all of your contacts are on your Christmas list. So your task is this:

** Task **
1. Render a label for each entry in the address book, but only if isOnChistmasList is set to true! The label should contain the recipient's name and address.
2. Decorate the label with two festive icons from the icons folder. Use whatever colour scheme and layout you think looks good!

** Stretch goals **
1. Ensure that the label does not get two of the same icon.
2. Create your own CSS Christmas logo to add a personal touch to each label.
*/

const icons = [
  "bauble.png",
  "bow.png",
  "candy-cane.png",
  "deer.png",
  "gifts.png",
  "gingerbread-man.png",
  "santa-hat.png",
  "santa.png",
  "snowflake.png",
  "snowglobe.png",
  "snowman.png",
  "star-bauble.png",
  "star.png",
  "stocking.png",
  "tree.png",
  "trees.png",
  "wreath.png",
];
const cardContainer = document.getElementById("card-container");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("close-btn");

addresses.forEach((address) => {
  if (address.isOnChristmasList) {
    const card = document.createElement("div");
    const randomIcon1 = `./icons/${
      icons[Math.floor(Math.random() * icons.length)]
    }`;
    const randomIcon2 = `./icons/${
      icons[Math.floor(Math.random() * icons.length)]
    }`;

    card.classList.add("card");
    const cardContent = `
      <div class="img-wrapper top">
			<img src="${randomIcon1}" alt="Icon" class="card-icon" />
			</div>
      <div class="garnish">&#9733;</div>
      <h2>${address.name}</h2>
      <p>${address["address line 1"]}, ${address.town}, ${address.state}, ${address.country}</p>
      <div class="img-wrapper bottom">
			<img src="${randomIcon2}" alt="Icon" class="card-icon" />
			</div>

    `;

    card.innerHTML = cardContent;
    card.addEventListener("click", () => {
      modal.style.display = "flex";
      modalBody.innerHTML = `
        <h3>${address.name}</h3>
        <p>Address: ${address["address line 1"]}, ${address.town}, ${address.state}, ${address.country}</p>
				<p class="santa-wishes">All the best for 2025 from everyone at Scrimba! Merry JavaScriptmas!</p>
      `;
    });

    cardContainer.appendChild(card);
  }
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
