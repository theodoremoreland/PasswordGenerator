import CharacterSet from "./classes/CharacterSet.js";
import Criteria from "./classes/Criteria.js";

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

const generatePassword = (password, approvedCharacterSets, characterSetsNotInPassword) => {
    if (password.length === criteria.length) {
        return password;
    }

    if (characterSetsNotInPassword.length === 0) {
        const randomCharacterSetIndex = Math.floor(Math.random() * Object.keys(approvedCharacterSets).length);
        const randomCharacterSetKey = Object.keys(approvedCharacterSets)[randomCharacterSetIndex];
        const randomCharacterSet = approvedCharacterSets[randomCharacterSetKey];
        const randomCharacterIndex = Math.floor(Math.random() * randomCharacterSet.length);
        const randomCharacter = randomCharacterSet[randomCharacterIndex];

        password += randomCharacter;
    } else {
        const randomCharacterSetIndex = Math.floor(Math.random() * characterSetsNotInPassword.length);
        const randomCharacterSetKey = characterSetsNotInPassword[randomCharacterSetIndex];
        const randomCharacterSet = approvedCharacterSets[randomCharacterSetKey];
        const randomCharacterIndex = Math.floor(Math.random() * randomCharacterSet.length);
        const randomCharacter = randomCharacterSet[randomCharacterIndex];

        password += randomCharacter;
        characterSetsNotInPassword.splice(randomCharacterIndex, 1);
    }

    return generatePassword(password, approvedCharacterSets, characterSetsNotInPassword);
};

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
        password = generatePassword("", approvedCharacterSets, Object.keys(approvedCharacterSets));
    }

    passwordText.value = password;
}

generateBtn.addEventListener("click", writePassword);