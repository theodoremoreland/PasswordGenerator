import zxcvbn from "zxcvbn";

export const selectRandomCharacterSet = (characterSets) => {
  const keys = Object.keys(characterSets);
  const randomKeyIndex = Math.round(Math.random() * (keys.length - 1));
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
  characterSets,
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

  const scrambledPassword = scramblePassword(password);

  window.KATAKANA = scrambledPassword;

  /**
  0 # too guessable: risky password. (guesses < 10^3)

  1 # very guessable: protection from throttled online attacks. (guesses < 10^6)

  2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)

  3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)

  4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)
  */
  window.SCORE = zxcvbn(scrambledPassword).score;

  return scrambledPassword;
};
