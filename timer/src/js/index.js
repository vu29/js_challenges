import {enableInputField,disableInputField, padInputField, isInputTimeValid, convertToSeconds, padNumber, resetToDefault, getMinuteInput, getSecondInput} from './utils.js'

const GENERIC_INVALID_INPUT_MSG = 'Invalid Input : Please check your input and try again';
const TIME_UP_MSG = 'Time is Up!!';
const SECONDS_IN_A_MINUTE = 60;
const DEFAULT_REMAINING_TIME = 5;


let startBtn = document.getElementById('start-btn');
let configBtn = document.getElementById('settings-btn');
let minInput = document.getElementById('minutes-input');
let secondInput = document.getElementById('seconds-input');
let ring = document.querySelector('.ring');

let timerInterval;

window.remainingTime = DEFAULT_REMAINING_TIME;
window.timerOn = false;

function showTimeUp() {
    alert(TIME_UP_MSG);
    resetToDefault(minInput,secondInput,startBtn,ring);
}

configBtn.onclick = () => {
    if(!timerOn){
        enableInputField([minInput,secondInput]);
    }
}

startBtn.onclick = () => {
    if(!timerOn){

        if(!isInputTimeValid(getMinuteInput(),getSecondInput())){
            alert(GENERIC_INVALID_INPUT_MSG);
            return;
        }


        padInputField([minInput,secondInput]);

        timerOn = true;
        remainingTime = convertToSeconds(getMinuteInput(),getSecondInput());

        if(remainingTime === 0){
            setTimeout(() => {
                showTimeUp();
            }, 0);
            clearInterval(timerInterval);
            ring.classList.add('ending');
            return;
        }


        timerInterval = setInterval(() => {
                remainingTime--;


            let remainingMin = padNumber(Math.floor(remainingTime/SECONDS_IN_A_MINUTE));
            let remainingSecond = padNumber(remainingTime%60);
            
            
            console.log(remainingMin,remainingSecond);

            minInput.value = remainingMin;
            secondInput.value = remainingSecond;

            if(remainingTime <= 0){ 
                setTimeout(() => {
                    showTimeUp();
                }, 0);
                clearInterval(timerInterval);
                ring.classList.add('ending');
                console.log(remainingTime);
                return;
            }
            
            

            

        }, 1000);
        disableInputField([minInput,secondInput]);
        startBtn.innerText = 'STOP';
    }
    else{
        //enableInputField([minInput,secondInput])
        timerOn = false;
        clearInterval(timerInterval);
        startBtn.innerText = 'START';
    }
}
