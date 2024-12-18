import shoppingCartData from "./data.js";

/*
😱 Christmas can get expensive!

You've been on a shopping trip and spent too much money.
But how much of that can you blame on Christmas?

**Task**

- Calculate and return the total cost of only the gifts in the shopping cart.
- Each gift has the isGift boolean set to true.
- The total cost of gifts should be given to two decimal places.

Expected output: 559.93

**Stretch Goal**

- Use the reduce() method to complete this challenge.
*/

/*********  With classic for loop **********/

// function calculateCost(arr) {
//   let totalCost = 0;
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i]["isGift"]) totalCost += arr[i]["price"];
//   }
//   return parseFloat(totalCost.toFixed(2));
// }

/*********  With for-of loop **********/

// function calculateCost(arr) {
//   let totalCost = 0;
//   for (const item of arr) {
//     if (item["isGift"]) {
//       totalCost += item["price"];
//     }
//   }
//   return parseFloat(totalCost.toFixed(2));
// }

/*********  With forEach Loop **********/
function calculateCost(arr) {
  let totalCost = 0;
  arr.forEach((item) => {
    if (item["isGift"]) {
      totalCost += item["price"];
    }
  });
  return parseFloat(totalCost.toFixed(2));
}

console.log(calculateCost(shoppingCartData)); //559.93

/******************* stretch goal : using reduce method ********************/

let totalCost = 0;

/********* reduce method with filter **********/
// totalCost = parseFloat(
//   shoppingCartData
//     .filter((item) => item["isGift"])
//     .reduce((acc, item) => {
//       return acc + item["price"];
//     }, 0)
//     .toFixed(2)
// );

/********* reduce method without filter **********/
totalCost = parseFloat(
  shoppingCartData
    .reduce((acc, item) => {
      return item["isGift"] ? acc + item["price"] : acc;
    }, 0)
    .toFixed(2)
);

console.log(`Stretch Goal: ${totalCost}`);
