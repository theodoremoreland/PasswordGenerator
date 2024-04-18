export const selectRandomCharacterSet = (characterSets) => {
  const keys = Object.keys(characterSets);
  const randomKeyIndex = Math.floor(Math.random() * (keys.length - 1));
  const randomKey = keys[randomKeyIndex];
  const randomCharacterSet = characterSets[randomKey];

  return randomCharacterSet;
};

export const selectRandomCharacter = (characterSet) => {
  const randomIndex = Math.floor(Math.random() * (characterSet.length - 1));
  const randomCharacter = characterSet[randomIndex];

  return randomCharacter;
};

export const scramblePassword = (password) => {
  let scrambledPassword = "";
  const characterArray = password.split("");

  while (characterArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * (characterArray.length - 1));
    const randomCharacter = characterArray.splice(randomIndex, 1);

    scrambledPassword += randomCharacter;
  }

  return scrambledPassword;
};

export const generatePassword = (
  desiredPasswordLength,
  password,
  characterSets
) => {
  for (const key of Object.keys(characterSets)) {
    const randomCharacter = selectRandomCharacter(characterSets[key]);
    password += randomCharacter;
  }

  while (password.length < desiredPasswordLength) {
    const randomCharacterSet = selectRandomCharacterSet(characterSets);
    const randomCharacter = selectRandomCharacter(randomCharacterSet);

    password += randomCharacter;
  }

  return scramblePassword(password);
};
