const AUDIO_FILE_PATH = './audio';

const playAudioFile = function (id) {
  let audio = new Audio(AUDIO_FILE_PATH + `/key-${id}.mp3`);
  audio.play();
};

const pianoDiv = document.querySelector('.piano');
pianoDiv.addEventListener('click', (event) => {
  if (event.target.tagName === 'path') {
    const keyId = event.target.parentElement.id;
    playAudioFile(keyId);
  }
});
