function playAudioFile(filePath){
    let audio = new Audio(filePath);
    audio.play();
}

// Mapping keys to their respective audio files
(()=>{
    document.querySelectorAll('a').forEach((ele,index)=>{
        ele.addEventListener('click',()=>{
            playAudioFile(`./audio/key-${index+1}.mp3`);
        })
    });
})();

