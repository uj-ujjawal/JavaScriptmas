const elfFirstNames = [
  "Aurora",
  "Blitzen",
  "Crispin",
  "Dazzle",
  "Evergreen",
  "Frost",
  "Glimmer",
  "Holly",
  "Icicle",
  "Joyful",
  "Kringle",
  "Luna",
  "Merry",
  "Nutmeg",
  "Olwen",
  "Pine",
  "Quill",
  "Razzle",
  "Sparkle",
  "Tinsel",
  "Umbra",
  "Vixen",
  "Whisk",
  "Xylo",
  "Yule",
  "Zippy",
];

const elfLastNames = [
  "Applecheeks",
  "Bells",
  "Candycane",
  "Dazzlebright",
  "Everbright",
  "Frostwhisk",
  "Gingersnap",
  "Hollyberry",
  "Icestorm",
  "Jovial",
  "Kindleflame",
  "Lightwhisper",
  "Merrysprout",
  "Nutcracker",
  "Oakenleaf",
  "Peppermint",
  "Quicksilver",
  "Raindrop",
  "Snowdust",
  "Twinkletoes",
  "Underwood",
  "Velvet",
  "Winterberry",
  "Xylospark",
  "Yuletide",
  "Zestwind",
];

/*
 * 🎅 Task:
 * - Generate an elf first and last name that matches the user’s first and last name initials, then display it on the screen.
 * - Example: if the user’s name is "John Doe," the elf name could be "Joyful Dazzle."
 * - Display the generated elf names in the "Registered Employees" list.
 */

/*
 * 🌟 Stretch Goals:
 * - Generate the elf names using an LLM API (like HuggingFace).
 * - Don't save the same name twice. (not necessary for the normal task)
 * - Make sure to use Scrimba's environment variables feature so you don't expose your API key
 */

const firstNameInput = document.querySelector('input[name="first-name"]');
const lastNameInput = document.querySelector('input[name="last-name"]');
const display = document.getElementById("elf-name-display");
const registerEmpList = document.getElementById("elf-names-list");
const generateNameBtn = document.getElementById("generate-btn");

const registeredElfNames = [];

const generate = () => {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();

  if (!firstName || !lastName) {
    alert("🎅🏻:Kindly Input both first and last names!!");
    return;
  }

  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  const elfName = getElfName(firstInitial, lastInitial);

  if (!elfName) {
    alert("🎅🏻:No name for these initials, Try again!");
    return;
  }

  if (registeredElfNames.includes(elfName)) {
    alert("🎅🏻: This 🧝🏻 ELF 🧝🏻‍♂️ is already on the list!");
    return;
  }

  registeredElfNames.push(elfName);
  display.textContent = elfName;
  registerElfName(elfName);
};

const getElfName = (firstInitial, lastInitial) => {
  const firstElfName = elfFirstNames.find(
    (name) => name.charAt(0).toUpperCase() === firstInitial
  );
  const lastElfName = elfLastNames.find(
    (name) => name.charAt(0).toUpperCase() === lastInitial
  );
  return firstElfName && lastElfName ? `${firstElfName} ${lastElfName}` : null;
};

const registerElfName = (elfName) => {
  const emptyList = registerEmpList.querySelector("li");
  if (emptyList && emptyList.textContent === "Seems empty...") {
    registerEmpList.removeChild(emptyList);
  }
  const listItem = document.createElement("li");
  listItem.textContent = elfName;
  registerEmpList.appendChild(listItem);
};

generateNameBtn.addEventListener("click", generate);
