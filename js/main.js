window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;

recognition.interimResults = true;


/* We are creating a paragraph tag and appending it in words div */
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    //console.log(e.results);
    
    //Converting into the array and mapping the first result from the set
    const transcript = Array.from(e.results)
        .map(result  => result[0])
        .map(result  => result.transcript)
        .join('')
    //Bcoz we want it as 1 string

    //This overrides the result in the p tag 
    p.textContent = transcript; 
    
    //So if its final then create p tag and append it in words
    if (e.results[0].isFinal) {     //It means if i stop talking means itsfinal it will add a new p
        
        p = document.createElement('p');
        words.appendChild(p);
    }
   
    if(transcript.includes('what is the time')){
        //console.log("GETTING THE TIME BOSS");
        speak(getTime);

    }

    if (transcript.includes('what is today\'s date')) {
        speak(getDate);
    };

    if (transcript.includes('what is the weather in')) {
        getTheWeather(transcript);
    };

    //console.log(transcript);    

});


//After listening once it unbinds itself so adding and EventListener at the end
recognition.addEventListener('end', recognition.start); //Remember it isnt () it just name of func


recognition.start();


const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action());
  synth.speak(utterThis);
};

const getTime = () => {
    const time = new Date(Date.now());
    console.log(time.toLocaleString());
    return `the time is ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
};

const getDate = () => {
    const time = new Date(Date.now())
    console.log(time.toLocaleDateString());
    return `today is ${time.toLocaleDateString()}`;
};


const getTheWeather = (speech) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=72d033c4b23f8966e8c72fae36a7c9e3&units=metric`)
        .then(function (response) {
            return response.json();
        })

        .then(function (weather) {
            
            if (weather.cod === '404') {
                utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
                synth.speak(utterThis);
                return;
            }
            
            utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
            
            synth.speak(utterThis);
        });
};


