export const generatePassword = (desiredPasswordLength, password, approvedCharacterSets, characterSetsNotInPassword) => {
    if (password.length === desiredPasswordLength) {
        return password;
    }

    const generateRandomCharacter = (characterSetKeys) => {
        const randomCharacterSetKeyIndex = Math.floor(Math.random() * characterSetKeys.length);
        const randomCharacterSetKey = characterSetKeys[randomCharacterSetKeyIndex];
        const randomCharacterSet = approvedCharacterSets[randomCharacterSetKey];
        const randomCharacterIndex = Math.floor(Math.random() * randomCharacterSet.length);
        const randomCharacter = randomCharacterSet[randomCharacterIndex];

        return randomCharacter;
    }

    if (characterSetsNotInPassword.length === 0) {
        const characterSetKeys = Object.keys(approvedCharacterSets);
        const randomCharacter = generateRandomCharacter(characterSetKeys);

        password += randomCharacter;
    } else {
        const randomCharacter = generateRandomCharacter(characterSetsNotInPassword);

        password += randomCharacter;
        characterSetsNotInPassword.splice(characterSetsNotInPassword.indexOf(randomCharacter), 1);
    }

    return generatePassword(desiredPasswordLength, password, approvedCharacterSets, characterSetsNotInPassword);
};