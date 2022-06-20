import { toggleJiggle, isKeyJiggling, getRandomKey } from './utils.js';

document.addEventListener('keypress', (event) => {
  let pressedKeyVal = event.key.toUpperCase();

  if (pressedKeyVal === '\\') pressedKeyVal = 'BACKSLASH';

  console.log(pressedKeyVal);
  if (isKeyJiggling(pressedKeyVal)) {
    // stop jiggling the pressedKey
    toggleJiggle(pressedKeyVal);

    let randomKey = getRandomKey();

    currentJiggleKey = randomKey.keyVal;
    toggleJiggle(randomKey.keyVal);
  }
});

window.addEventListener('load', () => {
  let randomKey = getRandomKey();

  currentJiggleKey = randomKey.keyVal;
  toggleJiggle(randomKey.keyVal);
});
