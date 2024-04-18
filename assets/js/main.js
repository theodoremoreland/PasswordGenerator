import CharacterSet from "./classes/CharacterSet.js";
import Criteria from "./classes/Criteria.js";
import { generatePassword } from "./modules/generatePassword.js";
import copyToClipboard from "./modules/copyToClipboard.js";

const generateBtn = document.querySelector("#generate");
const audioElement = document.querySelector("audio#sfx");
const passwordText = document.querySelector("#password");
const lowercaseLetters = new CharacterSet(
  "lowercase letters",
  "abcdefghijklmnopqrstuvwxyz",
  true
);
const uppercaseLetters = new CharacterSet(
  "uppercase letters",
  lowercaseLetters.characters.toUpperCase(),
  true
);
const numbers = new CharacterSet("numbers", "0123456789", true);
const specialCharacters = new CharacterSet("special characters", [
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
  "|",
  "}",
  "~",
]);

const criteria = new Criteria([
  lowercaseLetters,
  uppercaseLetters,
  numbers,
  specialCharacters,
]);

const writePassword = () => {
  const passwordText = document.querySelector("#password");
  let password;

  criteria.promptUserForPasswordLength(8, 128, 16);
  criteria.promptUserToApproveEachCharacterSet();

  const approvedCharacterSets = criteria.extractApprovedCharacterSets();

  if (Object.keys(approvedCharacterSets).length === 0) {
    alert("Could not generate password because no character set was chosen.");
    password = "";
  } else {
    password = generatePassword(criteria.length, "", approvedCharacterSets);
    audioElement.src = "assets/sounds/completed.mp3";
    audioElement.play();
  }

  passwordText.value = password;
  passwordText.classList.add("copy-to-clipboard");
};

generateBtn.addEventListener("click", writePassword);
passwordText.addEventListener("click", copyToClipboard);
