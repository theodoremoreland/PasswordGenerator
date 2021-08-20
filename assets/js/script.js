const generateBtn = document.querySelector("#generate");

const promptUserForDesiredPasswordLength = (minLength = 8, maxLength = 128, defaultValue = 16) => {
    const responseIsValid = response => response >= minLength && response <= maxLength;
    const promptText = `Length of password (must be between ${minLength}-${maxLength})?\nDefault value = ${defaultValue}`;
    const errorText = `Password length must be a number between ${minLength}-${maxLength}`;
    const desiredPasswordLength = prompt(promptText, defaultValue).trim();

    if (responseIsValid(desiredPasswordLength)) {
        return +desiredPasswordLength;
    }

    alert(errorText);

    return promptUserForDesiredPasswordLength(minLength, maxLength, defaultValue);
};


const promptUserToApproveChracterSet = (characterSetMetadata) => {
    const responseIsValid = (response) => {
        const regex = /^(yes|y|1|no|n|0)$/i;
        return regex.test(response);
    };

    const defaultValue = characterSetMetadata.approved === true ? "yes" : "no";
    const promptText = `Include ${characterSetMetadata.name} (yes/no)?\nDefault value = ${defaultValue}`;
    const errorText = `Invalid response. Response must be "yes" or "no"`;
    const response = prompt(promptText, defaultValue).trim();
    
    if (!responseIsValid) {
        alert(errorText);

        return promptUserToApproveChracterSet(characterSetMetadata);
    }

    const userApproved = ["yes", "y", "1"].includes(response.toLowerCase());

    if (userApproved) {
        characterSetMetadata.approved = true;
    } else {
        characterSetMetadata.approved = false;
    }
};

const promptUserForCriteria = () => {
    const characterSets = {
        lowercaseLetters: {
            name: "lowercase letters",
            set: "abcdefghijklmnopqrstuvwxyz",
            approved: true
        },
        uppercaseLetters: {
            name: "uppercase letters",
            set: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            approved: true
        },
        numbers: {
            name: "numbers",
            set: "0123456789",
            approved: true
        },
        specialCharacters: {
            name: "special characters",
            set: [" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"],
            approved: true
        }
    };
    const desiredPasswordLength = promptUserForDesiredPasswordLength();

    for (const characterSetMetadata of Object.values(characterSets)) {
        promptUserToApproveChracterSet(characterSetMetadata);
    }

    return { desiredPasswordLength, characterSets };
}

const generatePassword = ({ desiredPasswordLength, characterSets }) => {
    let generatedPassword = "";
    const approvedCharacterSets = Object.values(characterSets).map(metadata => metadata.approved ? metadata.set : undefined).filter(e => e);

    if (approvedCharacterSets.length === 0) {
        alert("Failed to generate password because no character set was chosen.");
        return generatedPassword;
    }

    while (generatedPassword.length < desiredPasswordLength) {
        for (const approvedCharacterSet of approvedCharacterSets) {
            const randomIndex = Math.floor(Math.random() * approvedCharacterSet.length);
            generatedPassword += approvedCharacterSet[randomIndex];
            if (generatedPassword.length === desiredPasswordLength) break;
        }
    }

    return generatedPassword;
};

const writePassword = () => {
  const criteria = promptUserForCriteria();
  const password = generatePassword(criteria);
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
}

generateBtn.addEventListener("click", writePassword);