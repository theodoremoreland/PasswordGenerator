import CharacterSet from "./classes/CharacterSet.js";
import Criteria from "./classes/Criteria.js";
import { generatePassword } from "./generatePassword.js";

const generateBtn = document.querySelector("#generate");
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
const numbers = new CharacterSet(
    "numbers",
    "0123456789",
    true
);
const specialCharacters = new CharacterSet(
    "special characters",
    [" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"],
);

const criteria = new Criteria(16, [lowercaseLetters, uppercaseLetters, numbers, specialCharacters]);
const audioElement = document.querySelector("audio");

const writePassword = () => {
    const passwordText = document.querySelector("#password");
    let password;

    criteria.promptUserForPasswordLength(8, 128);
    criteria.promptUserToApproveEachCharacterSet();

    const approvedCharacterSets = criteria.extractApprovedChracterSets();

    if (Object.keys(approvedCharacterSets).length === 0) {
        alert("Could not generate password because no character set was chosen.");
        password = "";
    } else {
        password = generatePassword(criteria.length, "", approvedCharacterSets, Object.keys(approvedCharacterSets));
        audioElement.src = "/assets/sounds/completed.mp3";
        audioElement.play();
    }

    passwordText.value = password;
}

generateBtn.addEventListener("click", writePassword);