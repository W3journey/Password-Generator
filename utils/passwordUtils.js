import { characterList, animals, colors, size, activity } from "../constants";

export const pickRandom = (item) => {
  const randomValue = item[Math.floor(Math.random() * item.length)];
  return randomValue;
};

export const generateEasyPassword = () => {
  // Pick a random number
  const numArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const randomNumber = pickRandom(numArr);
  // Pick a random size
  const randomSize = pickRandom(size);
  // Pick a random color
  const randomColor = pickRandom(colors);
  // Pick a random activity
  const randomActivity = pickRandom(activity);
  // Pick a random animal
  let randomAnimal = pickRandom(animals);
  if (randomNumber > 1) {
    randomAnimal = randomAnimal + "s";
  }
  // Pick a random symbol
  const symArr = ["!", "@", "#", "$", "%", "&", "*", "/", "?"];
  const randomSymbol = pickRandom(symArr);
  const easyPass = `${randomNumber}${randomSize}${randomColor}${randomActivity}${randomAnimal}${randomSymbol}`;

  return easyPass;
};

export const generateRandomPassword = (passLength = 16) => {
  let tempPassword = "";
  for (let i = 0; i < passLength; i++) {
    const characterIndex = Math.floor(Math.random() * characterList.length);
    tempPassword += characterList.charAt(characterIndex);
  }
  return tempPassword;
};
