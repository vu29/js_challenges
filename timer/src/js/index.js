import {
    padInputField,
    isInputTimeValid,
    getMinuteInput,
    getSecondInput,
    getUpdatedEndTime,
    stopTimer,
    startTimer,
    allowSetTime,
    endTimer
} from './utils.js'

const GENERIC_INVALID_INPUT_MSG = 'Invalid Input : Please check your input and try again';
const DEFAULT_REMAINING_TIME = 10;

let startBtn = document.getElementById('start-btn');
let configBtn = document.getElementById('settings-btn');
let minInput = document.getElementById('minutes-input');
let secondInput = document.getElementById('seconds-input');
let ring = document.querySelector('.ring');

let timerInterval;

window.remainingTime = DEFAULT_REMAINING_TIME;
window.timerOn = false;
window.stopTime = undefined;
window.endTime = undefined;

configBtn.onclick = () => {
    if (!timerOn) 
        allowSetTime();
    


};
startBtn.onclick = () => {
    if (!timerOn) {

        if (!isInputTimeValid(getMinuteInput(), getSecondInput())) {
            alert(GENERIC_INVALID_INPUT_MSG);
            return;
        }

        padInputField([minInput, secondInput]);
        timerOn = true;
        endTime = getUpdatedEndTime(endTime, stopTime);

        remainingTime = endTime - Date.now();

        if (remainingTime === 0) 
            endTimer();
         else 
            timerInterval = startTimer(minInput, secondInput, startBtn, ring);
        


    } else 
        stopTimer(timerInterval);
};
