/*
This Christmas, you’ve been tasked with running an anagram quiz at
the family gathering.

You have been given a list of anagrams, but you suspect that some
of the anagram pairs might be incorrect.

Your job is to write a JavaScript function to loop through the array
and filter out any pairs that aren’t actually anagrams.

For this challenge, spaces will be ignored, so "Be The Helm" would
be considered a valid anagram of "Bethlehem".
*/

let anagrams = [
  ["Can Assault", "Santa Claus"],
  ["Refreshed Erudite Londoner", "Rudolf the Red Nose Reindeer"],
  ["Frosty The Snowman", "Honesty Warms Front"],
  ["Drastic Charms", "Christmas Cards"],
  ["Congress Liar", "Carol Singers"],
  ["The Tin Glints", "Silent Night"],
  ["Be The Helm", "Betlehem"],
  ["Is Car Thieves", "Christmas Eve"],
];

function findAnagrams(anagrams) {
  const filteredValidAnagrams = anagrams.filter(([string1, string2]) => {
    string1 = normalizedString(string1);
    string2 = normalizedString(string2);
    return string1 === string2;
  });
  return filteredValidAnagrams;
}

//remove white spaces
function normalizedString(string) {
  const newString = string.toLowerCase().replace(/\s/g, "");
  // console.log("newString: "+newStr)
  const sortedString = newString.split("").sort().join("");
  // console.log("sortedString:"+reformStr);
  return sortedString;
}

let validAnagrams = findAnagrams(anagrams);
// console.log(validAnagrams)
// print it to the console.
console.log("List Of Valid Anagrams Are:");
console.log("----------------------------");
validAnagrams.forEach((validAnagram, index) => {
  console.log(`${index + 1}: ${validAnagram}`);
});
