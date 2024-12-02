const calendarContainer = document.getElementById("calendar");

for (let i = 1; i <= 24; i++) {
  const box = document.createElement("li");
  box.classList.add("calendar-box");

  const boxInner = document.createElement("div");
  boxInner.classList.add("calendar-box-inner");

  const boxFront = document.createElement("div");
  boxFront.classList.add("calendar-box-front");
  const number = document.createElement("h2");
  number.innerHTML = String(i).padStart(2, "0");

  const frontImage = document.createElement("img");
  frontImage.src = `https://raw.githubusercontent.com/uj-ujjawal/hosted-assets/refs/heads/main/imgs/giftbox.png`;
  frontImage.alt = `Front of Day ${i}`;

  boxFront.appendChild(number);
  boxFront.appendChild(frontImage);

  const boxBack = document.createElement("div");
  boxBack.classList.add("calendar-box-back");

  const dayOfWeek = new Date(2024, 11, i).toLocaleString("en-US", {
    weekday: "long",
  });
  const dayText = document.createElement("p");
  dayText.textContent = dayOfWeek;

  const backImage = document.createElement("img");
  backImage.src = `https://raw.githubusercontent.com/uj-ujjawal/hosted-assets/refs/heads/main/imgs/santa.png`;
  backImage.alt = `Back of Day ${i}`;

  boxBack.appendChild(backImage);
  boxBack.appendChild(dayText);

  boxInner.appendChild(boxFront);
  boxInner.appendChild(boxBack);

  box.appendChild(boxInner);
  calendarContainer.appendChild(box);
}
