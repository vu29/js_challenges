import {KEYS} from './keys.js'

export const getRandomIntInclusive = (min = 0, max = 1) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export const getRandomKey = () => {
    let randomVal = getRandomIntInclusive(0, 47);
    return {keyIndex: randomVal, keyVal: KEYS[randomVal]}
}


export const isKeyJiggling = (keyValue) => keyValue == currentJiggleKey;

export const toggleJiggle = (keyValue) => {
    keyValue = keyValue.toUpperCase();
    let keyElement = document.querySelector(`[data-key="${keyValue}"]`);
    keyElement.classList.toggle('jiggle');
}
