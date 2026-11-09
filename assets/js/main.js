// Third party
import zxcvbn from "zxcvbn";
import debounce from "lodash.debounce";

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
const guessesElement = document.querySelector("#guesses");
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

const scorePassword = (password) => {
  const meta = zxcvbn(password);
  /**
  0 # too guessable: risky password. (guesses < 10^3)

  1 # very guessable: protection from throttled online attacks. (guesses < 10^6)

  2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)

  3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)

  4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)
  */
  let score = meta.score;
  const crackTime = meta.crack_times_display.online_no_throttling_10_per_second;
  const guessesCount = meta.guesses;
  const warning = meta.feedback.warning;

  switch (score) {
    case 1:
      score = "Weak";
      break;
    case 2:
      score = "Medium";
      break;
    case 3:
      score = "Strong";
      break;
    case 4:
      score = "Very strong";
      break;
    default:
      score = "Terrible";
  }

  passwordStrengthElement.textContent = score;
  timeToCrackElement.textContent = crackTime;
  guessesElement.textContent = guessesCount;
  warningsElement.textContent = warning;

  if (warning) {
    warningsElement.style.display = "inline";
  } else {
    warningsElement.style.display = "none";
  }
};

const handleTextAreaChange = debounce((event) => {
  const value = event.target.value;

  if (!value) {
    return;
  }

  scorePassword(value);
  window.KATAKANA = value;
}, 450);

const writePassword = () => {
  const countElement = document.querySelector("#count");
  const desiredPasswordLength = countElement.value;
  const countDisplayElement = document.querySelector("#count-display");
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
    scorePassword(password);

    countDisplayElement.textContent = `${desiredPasswordLength} characters`; // Fallback in case password was generated on page load and count display was not updated manually
    audioElement.src = "assets/sounds/completed.mp3";
    audioElement.play();
  }
};

writePassword();

generateBtn.addEventListener("click", writePassword);
copyButtonElement.addEventListener("click", copyToClipboard);
passwordText.addEventListener("input", handleTextAreaChange);
