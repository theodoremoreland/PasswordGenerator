export const generatePassword = (desiredPasswordLength, password, approvedCharacterSets, characterSetsNotInPassword) => {
    if (password.length === desiredPasswordLength) {
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
        characterSetsNotInPassword.splice(randomCharacterSetIndex, 1);
    }

    return generatePassword(desiredPasswordLength, password, approvedCharacterSets, characterSetsNotInPassword);
};