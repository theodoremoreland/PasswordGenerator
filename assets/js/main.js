import { generatePassword } from "./modules/generatePassword.js";
import CharacterSet from "./classes/CharacterSet.js";
import copyToClipboard from "./modules/copyToClipboard.js";

const generateBtn = document.querySelector("#generate");
const audioElement = document.querySelector("audio#sfx");
const passwordText = document.querySelector("#password");
const lowercaseLetters = new CharacterSet(
  "lowercase",
  "abcdefghijklmnopqrstuvwxyz",
);
const uppercaseLetters = new CharacterSet(
  "uppercase",
  lowercaseLetters.characters.toUpperCase(),
);
const numbers = new CharacterSet("numbers", "0123456789");
const specialCharacters = new CharacterSet("symbols", [
  " ",
  "!",
  '"',
  "#",
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "\\",
  "]",
  "^",
  "_",
  "`",
  "{",
  "}",
  "~",
]);

const writePassword = () => {
  const passwordText = document.querySelector("#password");
  const countElement = document.querySelector("#count");
  const desiredPasswordLength = countElement.value;
  const shouldHaveLowercaseChars = document.querySelector("#lowercase").checked;
  const shouldHaveUppercaseChars = document.querySelector("#uppercase").checked;
  const shouldHaveNumbers = document.querySelector("#numbers").checked;
  const shouldHaveSpecialChars = document.querySelector("#symbols").checked;
  const approvedCharacterSets = {};
  let password;

  if (shouldHaveLowercaseChars) {
    approvedCharacterSets[lowercaseLetters.name] = lowercaseLetters.characters;
  }
  if (shouldHaveUppercaseChars) {
    approvedCharacterSets[uppercaseLetters.name] = uppercaseLetters.characters;
  }
  if (shouldHaveNumbers) {
    approvedCharacterSets[numbers.name] = numbers.characters;
  }
  if (shouldHaveSpecialChars) {
    approvedCharacterSets[specialCharacters.name] =
      specialCharacters.characters;
  }

  if (Object.keys(approvedCharacterSets).length === 0) {
    alert("Could not generate password because no character set was chosen.");
  } else {
    password = generatePassword(
      desiredPasswordLength,
      "",
      approvedCharacterSets,
    );
    passwordText.value = password;
    passwordText.classList.add("copy-to-clipboard");
    audioElement.src = "assets/sounds/completed.mp3";
    audioElement.play();
  }
};

generateBtn.addEventListener("click", writePassword);
passwordText.addEventListener("click", copyToClipboard);
