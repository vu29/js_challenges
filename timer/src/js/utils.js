const SECONDS_IN_A_MINUTE = 60;
const TIME_UP_MSG = 'Time is Up!!';

let startBtn = document.getElementById('start-btn');
let minInput = document.getElementById('minutes-input');
let secondInput = document.getElementById('seconds-input');
let ring = document.querySelector('.ring');

const padNumber = (num) => {
    return (num < 10) ? '0' + num.toString() : num.toString();
}

const resetToDefault = () => {
    minInput.value = padNumber(0);
    secondInput.value = padNumber(10);
    ring.classList.remove('ending');
    endTime = undefined;
    remainingTime = undefined;
    stopTime = undefined;
    timerOn = false;
    startBtn.innerText = 'START';
    console.log(startBtn.innerText);
}

const showTimeUp = () => {
    alert(TIME_UP_MSG);
    resetToDefault();
}

const convertToMilliSeconds = (min,second) => (Number(min) * 60 + Number(second)) * 1000;

const enableInputField = (inputField) => {
    if (Array.isArray(inputField)){
        inputField.forEach((field)=>{
            field.disabled = false;
        })
    }
    else{
        inputField.disabled = false;
    }
}

const disableInputField = (inputField) => {
    if (Array.isArray(inputField)){
        inputField.forEach((field)=>{
            field.disabled = true;
        })
    }
    else{
        inputField.disabled = true;
    }
}

export const padInputField = (inputField) => {
    if (Array.isArray(inputField)){
        inputField.forEach((field)=>{
            field.value = padNumber(Number(field.value));
        })
    }
    else
        inputField.value = padNumber(Number(inputField.value));
        
};

export const isInputTimeValid = (min,second) => {
    min = Number(min);
    second = Number(second);

    if(!Number.isInteger(min) || !Number.isInteger(second))
        return false;
    
    return min >= 0 && second >= 0 && second <60;
}

export const getMinuteInput = () => document.querySelector('#minutes-input').value;

export const getSecondInput = () => document.querySelector('#seconds-input').value;

export const getUpdatedEndTime = (endTime,stopTime) => {
    return ((endTime === undefined) ? Date.now() + convertToMilliSeconds(getMinuteInput(),getSecondInput()) : endTime) 
            + (stopTime === undefined ? 0 : Date.now() - stopTime);
}

export const startTimer = () => {
    disableInputField([minInput,secondInput]);
    startBtn.innerText = 'STOP';
    let timerInterval = setInterval(() => {
        remainingTime = endTime - Date.now(); 
        console.log('si',remainingTime);


        let remainingMin = padNumber(Math.floor(Math.ceil(remainingTime/1000)/SECONDS_IN_A_MINUTE));
        let remainingSecond = padNumber((Math.ceil(remainingTime/1000))%60);

        minInput.value = remainingMin;
        secondInput.value = remainingSecond;

        if(remainingTime <= 0){ 
            setTimeout(() => {
                showTimeUp();
            }, 0);
            clearInterval(timerInterval);
            ring.classList.add('ending');
        }

    }, 100);

    return timerInterval;
    
}

export const stopTimer = (timerInterval) => {
    stopTime = Date.now();
    timerOn = false;
    clearInterval(timerInterval);
    startBtn.innerText = 'START';
}

export const endTimer = (timerInterval) => {
    setTimeout(() => {
        showTimeUp();
    }, 0);
    clearInterval(timerInterval);
    ring.classList.add('ending');
    resetToDefault();
}

export const allowSetTime = () => {
    enableInputField([minInput,secondInput]);
    endTime = undefined;
    stopTime = undefined;
}









