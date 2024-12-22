import { toysRequested } from "./data.js";

/*
The run up to Christmas is quite a data-intensive time for Santa. In order to understand market trends, Santa's Data Elves have collated sample children’s wish list data from 4 locations and now need to know which was the most popular toy requested overall. This will help with procurement for next year.

**Task**
- Your task is to find the most requested toy from the array of objects “toysRequested”. But remember: some toys appear in more than one location!

Expected output: "The most popular toy is 🎲 board games with 9000 requests.""

**Stretch Goal**
- Complete this challenge using the .flatMap() method to work with the various "toys" arrays.

*/

/* const requestedToy = toysRequested.flatMap((entry)=> entry.toys);
console.log(requestedToy); */

/* const mostReqToy=requestedToy.reduce((acc,toy)=>{
const[toyName,toyReq] = Object.entries(toy)[0];
console.log(`${toyName} ${toyReq}`)

acc[toyName] = (acc[toyName]||0)+toyReq;

return acc;

},{});

console.log(mostReqToy); */

const mostRequestedToy = toysRequested
  .flatMap((ele) => ele.toys)
  .reduce((acc, toy) => {
    const [toyName, toyReq] = Object.entries(toy)[0];
    acc[toyName] = (acc[toyName] || 0) + toyReq;
    return acc;
  }, {});

// console.log(mostRequestedToy)

const winner = Object.entries(mostRequestedToy).reduce((max, toy) => {
  return toy[1] > max[1] ? toy : max;
});

console.log(`The most popular toy is ${winner[0]} with ${winner[1]} requests.`);
