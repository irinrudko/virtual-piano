const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const btns = document.querySelectorAll('.btn');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

//play sound by using mouse
function playSound(event) {
    const audio = document.getElementById(event.target.dataset.note);
    if (event.target.classList.contains('piano-key')) {
        event.target.classList.add('active', 'piano-key-pressed');
        audio.currentTime = 0;
        audio.play();
    }
}
const stopSound = (event) => {
    event.target.classList.remove('active', 'piano-key-pressed');
};

// event delegation
piano.addEventListener('click', (event) => {
    if (event.target.classList.contains('piano-key')) {
        const note = event.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playSound(src);
    }
});

const startCorrespondOver = (event) => {
    pianoKeys.forEach((elem) => {
        elem.addEventListener('mouseover', playSound);
        elem.addEventListener('mouseout', stopSound);
    });
};

const stopCorrespondOver = (event) => {
    pianoKeys.forEach((elem) => {
        elem.classList.remove('active', 'piano-key-pressed');
        elem.removeEventListener('mouseover', playSound);
        elem.removeEventListener('mouseout', stopSound);
    });
};

piano.addEventListener('mousedown', playSound);
piano.addEventListener('mousedown', startCorrespondOver);
piano.addEventListener('mouseup', stopCorrespondOver);
window.addEventListener('mouseup', stopCorrespondOver);

//play sound by using keyboard
const playSoundForKeyboard = (event) => {
    if (event.repeat) return;
    const audio = document.querySelector(`audio[data-key="${event.code}"]`);
    const key = document.querySelector(`.piano-key[data-key="${event.code}"]`);
    audio.currentTime = 0;
    audio.play();
    key.classList.add('active');
    key.classList.add('piano-key-pressed');
};

const removeStyle = (event) => {
    const key = document.querySelector(`.piano-key[data-key="${event.code}"]`);
    key.classList.remove('active');
    key.classList.remove('piano-key-pressed');
};

window.addEventListener('keydown', playSoundForKeyboard);
window.addEventListener('keyup', removeStyle);

//Fullscreen view
const elem = document.documentElement;

const fullscreenBtn = document.querySelector('.fullscreen');
fullscreenBtn.addEventListener('click', openFullscreen);
fullscreenBtn.addEventListener('click', closeFullscreen);

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();     // Firefox
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
    }
}

// Notes and Letters
btns.forEach(el => el.addEventListener('click', () => {
    if (!el.classList.contains('btn-active')) {
        btns.forEach((element) => {
            changeClass.call(element, 'btn-active');
        });
        changeClass.call(piano, 'toggle-letters')
    }
})
);

function changeClass(cls) {
    this.classList.toggle(cls);
}