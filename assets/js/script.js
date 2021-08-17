import Criterion from "./classes/Criterion.js";
import { criterionPrompt } from "./criterionPrompt.js";

const desiredPasswordLength = new Criterion("Length of password (must be between 8-128)?", "128", "range");
const shouldHaveLowercaseLetters = new Criterion("Include lowercase letters (yes/no)?", "yes", "binary");
const shouldHaveUppercaseLetters = new Criterion("Include UPPERCASE letters (yes/no)?", "yes", "binary");
const shouldHaveNumbers = new Criterion("Include numbers (yes/no)?", "yes", "binary");
const shouldHaveSpecialCharacters = new Criterion("Include special characters (yes/no)?", "yes", "binary");
const generateBtn = document.querySelector("#generate");

const getUserSelectedCriteria = () => {
    const length = criterionPrompt(desiredPasswordLength);
    const useLowercaseLetters = criterionPrompt(shouldHaveLowercaseLetters);
    const useUppercaseLetters = criterionPrompt(shouldHaveUppercaseLetters);
    const useNumbers = criterionPrompt(shouldHaveNumbers);
    const useSpecialCharacters = criterionPrompt(shouldHaveSpecialCharacters);

    return {
        length,
        useLowercaseLetters,
        useUppercaseLetters,
        useNumbers,
        useSpecialCharacters
    }
}

const generatePassword = (criteria) => {
    const { 
        length,
        useLowercaseLetters,
        useUppercaseLetters,
        useNumbers,
        useSpecialCharacters
    } = criteria; 
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = lowercaseLetters.toUpperCase();
    const numbers = "0123456789";
    const specialCharacters = [" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];
    let generatedPassword = "";
    let characterSets = {};

    if (["yes", "1", "y"].includes(useLowercaseLetters)) characterSets[lowercaseLetters] = lowercaseLetters;
    if (["yes", "1", "y"].includes(useUppercaseLetters)) characterSets[uppercaseLetters] = uppercaseLetters;
    if (["yes", "1", "y"].includes(useNumbers)) characterSets[numbers] = numbers;
    if (["yes", "1", "y"].includes(useSpecialCharacters)) characterSets[specialCharacters] = specialCharacters;
    
    const keySetCount = Object.keys(characterSets).length;
    let currentKeyIndex = 0;

    if (keySetCount === 0) alert("Could not generate password because no character set was chosen.");

    for (let i = 0; i < length; i++) {
        const currentKey = Object.keys(characterSets)[currentKeyIndex];
        const currentSet = characterSets[currentKey];
        generatedPassword += currentSet[Math.floor(Math.random() * currentSet.length)];
        currentKeyIndex = currentKeyIndex === (keySetCount - 1) ? 0 : currentKeyIndex + 1;
    }

    return generatedPassword;
};

const writePassword = () => {
  const criteria = getUserSelectedCriteria();
  const password = generatePassword(criteria);
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
}

generateBtn.addEventListener("click", writePassword);