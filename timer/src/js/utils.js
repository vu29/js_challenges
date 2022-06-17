
export const padNumber = (num) => {
    return (num < 10) ? '0' + num.toString() : num.toString();
}

export const getMinuteInput = () => document.querySelector('#minutes-input').value;

export const getSecondInput = () => document.querySelector('#seconds-input').value;

export const convertToSeconds = (min,second) => Number(min) * 60 + Number(second);

export const enableInputField = (inputField) => {
    if (Array.isArray(inputField)){
        inputField.forEach((field)=>{
            field.disabled = false;
        })
    }
    else{
        inputField.disabled = false;
    }
}

export const disableInputField = (inputField) => {
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
    else{
        inputField.value = padNumber(Number(inputField.value));
        //console.log(padNumber(Number(inputField.value)));
    }
        
};

export const isInputFieldDisable = (inputField) => inputField.disabled;

export const isInputTimeValid = (min,second) => {
    min = Number(min);
    second = Number(second);

    if(!Number.isInteger(min) || !Number.isInteger(second))
        return false;
    
    return min >= 0 && second >= 0 && second <60;
}

export const resetToDefault = (minInput,secondInput,startBtn,ring) => {
    minInput.value = padNumber(0);
    secondInput.value = padNumber(5);
    ring.classList.remove('ending');
    console.log(ring.classList);
    remainingTime = 0;
    timerOn = false;
    console.log(startBtn);
    startBtn.innerText = 'START';

}




