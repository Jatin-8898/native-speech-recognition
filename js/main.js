window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

const recognition = new SpeechRecognition();

recognition.interimResults = true;


/* We are creating a paragraph tag and appending it in words div */
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    console.log(e);
    
});

recognition.start();