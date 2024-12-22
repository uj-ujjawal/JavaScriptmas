import shoppingList from "./shoppingList.js";
/*
    You're shopping for holiday gifts, but money is tight
    so we need to consider the cheapest items first.
    Use JavaScript's built-in array sort() (or toSorted()) method to
    write a function that returns an array of products sorted
    by price, cheapest to most expensive.

    Log the sorted array to the console to double-check you
    solved it correctly.
*/

// function sortProducts(list) {
//   list.sort((acc, next) => acc.price - next.price);
//   return list;
// }

// const listByCheapest = sortProducts(shoppingList);

// function display(listByCheapest) {
//   listByCheapest.forEach((item) => {
//     return `${item["product"]}: ${item["price"]}`;
//   });
// }

// console.log(display(listByCheapest));

/**
 * Stretch goals:
 *
 * 1. Log the items to the console in a more formatted way,
 *    like this (one item per line):
 *
 *    💕: $0
 *    🍬: $0.49
 *    🍫: $0.99
 *    🍭: $1.99
 *    🧁: $2.99
 *    ...etc.
 *
 * 2. Create a UI for this by displaying the unsorted items first, then
 *    having a button that will sort the items on the page by price.
 */

// Function to display all product and price with table

// Get references to the table and dropdown

const tableBody = document.getElementById("product-list");
const sortByPrice = document.getElementById("sortByPrice");

// Function to display all product and price with table
function populateTable(data) {
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.product}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><button class="add-to-cart" data-product="${
        item.product
      }">Add to Cart</button></td>
    `;
    tableBody.appendChild(row);
  });

  setTimeout(() => {
    tableBody.classList.remove("sorted");
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row) => {
      row.classList.remove("hidden");
      row.classList.add("visible");
    });
  }, 500);
}

// initially, display all data with default order
populateTable(shoppingList);

// add Event listener for sorting
sortByPrice.addEventListener("change", () => {
  let sortedItems;

  // Sort the items based on the selected option
  if (sortByPrice.value === "asc") {
    sortedItems = [...shoppingList].sort((a, b) => a.price - b.price);
  } else if (sortByPrice.value === "desc") {
    sortedItems = [...shoppingList].sort((a, b) => b.price - a.price);
  } else {
    sortedItems = shoppingList; // Default order
  }
  //   log sorted data into console
  sortedItems.forEach((item) => {
    console.log(`${item.product} : ${item.price}`);
  });

  // Apply fade-out animation
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row) => row.classList.add("hidden"));

  setTimeout(() => {
    populateTable(sortedItems);
  }, 500); // Wait for fade-out animation to complete before updating table
});

// for add to cart
tableBody.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("add-to-cart")) {
    if (event.target.textContent === "Add to Cart") {
      event.target.textContent = "Added";
    } else {
      event.target.textContent = "Add to Cart"; // Change back to "Add to Cart"
    }
  }
});
