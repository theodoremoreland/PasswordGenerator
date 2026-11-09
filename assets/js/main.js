// Third party
import zxcvbn from "zxcvbn";

// Custom
import { generatePassword } from "./modules/generatePassword.js";
import CharacterSet from "./classes/CharacterSet.js";
import copyToClipboard from "./modules/copyToClipboard.js";

// Elements
const generateBtn = document.querySelector("#generate");
const audioElement = document.querySelector("audio#sfx");
const passwordText = document.querySelector("#password");
const copyButtonElement = document.querySelector("#copy-to-clipboard");
const passwordStrengthElement = document.querySelector("#password-strength");
const timeToCrackElement = document.querySelector("#time-to-crack");
const warningsElement = document.querySelector("#warnings");

// Character sets
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

    window.KATAKANA = password;

    /**
  0 # too guessable: risky password. (guesses < 10^3)

  1 # very guessable: protection from throttled online attacks. (guesses < 10^6)

  2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)

  3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)

  4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)
  */
    const meta = zxcvbn(password);
    passwordStrengthElement.textContent = meta.score;
    timeToCrackElement.textContent =
      meta.crack_times_display.online_no_throttling_10_per_second;
    warningsElement.textContent = meta.feedback.warning;
    audioElement.src = "assets/sounds/completed.mp3";
    audioElement.play();
  }
};

generateBtn.addEventListener("click", writePassword);
copyButtonElement.addEventListener("click", copyToClipboard);
