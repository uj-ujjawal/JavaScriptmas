// Santa needs your help to figure out if he has enough money to give everyone change!
// Your goal will be to return true if everyone gets their correct change, and false if at least one person does not receive their correct change! Use the function below to get started!

// Good luck and happy coding!!

/*
Steps:
- fee for each delivery: 5$
- santa can accept only currency of 5, 10 and 20
- Track $5 and $10 payments:
  - let five = 0 and ten = 0.

- If it's a $5 payment,
  - no change required, -> five++

- If it's a $10 payment,
  -> need to check if we have at least one $5 cash to return as change
  If yes,then -> five--, and ten++

  - If it's a $20 payment, we need to return $15 in term of either 3 fives or one tens and one five.
  - case 1 -> if have->give $10 and $5 change to return complete change 15$,
    -> five-- & ten--
  - case 2: If not, then we have to give three $5.
    - five-=3;
  - case 3: If neither is possible, return false.
*/

function correctChangeFromSanta(bills) {
  let five = 0;
  let ten = 0;
  for (let payment of bills) {
    if (payment === 5) {
      five++;
    } else if (payment === 10) {
      if (five > 0) {
        five--;
        ten++;
      } else {
        return false;
      }
    } else if (payment === 20) {
      if (ten > 0 && five > 0) {
        ten--;
        five--;
      } else if (five >= 3) {
        five -= 3;
      } else {
        return false;
      }
    }
  }

  return true;
}

// You can leave this code as is, this will simply console.log() different text depending on if the test case returns true or false. Feel free to add additional test cases if you would like!

// Should return true
if (correctChangeFromSanta([5, 5, 5, 10, 20])) {
  console.log("Nice job Santa, everyone got their correct change!");
} else {
  console.log(
    "Looks like you have some work to do Santa, and bring some money next time!"
  );
}

// Should return false
if (correctChangeFromSanta([5, 5, 10, 10, 20])) {
  console.log("Nice job Santa, everyone got their correct change!");
} else {
  console.log(
    "Looks like you have some work to do Santa, and bring some money next time!"
  );
}
