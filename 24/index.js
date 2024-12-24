import { codedMessage } from "./codedMessage.js";

/*
codedMessage.js holds a coded message (well, the name makes it obvious, huh?).

**Task**
- Decode the message!

key.md will help!

**Stretch Goal**
No stretch goal for the final day. Just stretch your legs!
*/

/*
pattern:

abc = klm =>
---------------
a(1 | 97)+10  = k(11 | 107)
b(2 | 98)+10 = l(12 | 108)
c(3 | 99)+10 = m(13 | 109)
---------------
xyz:
*/

// const decodedDecimal = codedMessage.map((binary) => parseInt(binary, 2));
// console.log(decodedDecimal);

const decodedDecimalValues = codedMessage.map(
  (binary) => parseInt(binary, 2) - 10
);
// console.log(decodedDecimalValues);

const textMessage = decodedDecimalValues
  .map((ascii) => {
    // Ensure ASCII stays within printable range (32 to 127)
    return ascii < 32 ? 128 - (32 - ascii) : ascii;
  })
  .map((char) => String.fromCharCode(char))
  .join("");

console.log(textMessage);
