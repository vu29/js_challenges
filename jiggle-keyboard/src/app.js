let currentJiggleKey = '';

// KeyValue of keys to jiggle
let keys = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    ',',
    '[',
    'BACKSLASH',
    ']',
    '\'',
    '`',
    '-',
    '=',
    ';',
    '/',
    '.',
    'DELETE'
]

function getRandomIntInclusive(min = 0, max = 1) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function getRandomKey() {
    let randomVal = getRandomIntInclusive(0, 47);
    return {keyIndex: randomVal, keyVal: keys[randomVal]}
}


function isKeyJiggling(keyValue) {
    return keyValue == currentJiggleKey;
}


function toggleJiggle(keyValue) {
    keyValue = keyValue.toUpperCase();
    let keyElement = document.querySelector(`[data-key="${keyValue}"]`);
    keyElement.classList.toggle('jiggle');
}

document.addEventListener('keypress', (event) => {
    let pressedKeyVal = event.key.toUpperCase();

    if (pressedKeyVal === '\\') 
        pressedKeyVal = 'BACKSLASH';
    
    console.log(pressedKeyVal);
    if (pressedKeyVal === currentJiggleKey) { // stop jiggling the pressedKey
        toggleJiggle(pressedKeyVal);

        let randomKey = getRandomKey();

        currentJiggleKey = randomKey.keyVal
        toggleJiggle(randomKey.keyVal);
    }
});

window.addEventListener('load', () => {
    let randomKey = getRandomKey();

    currentJiggleKey = randomKey.keyVal
    toggleJiggle(randomKey.keyVal);
})
