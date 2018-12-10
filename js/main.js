window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

const recognition = new SpeechRecognition();

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
   
    if(transcript.includes('get the weather')){
        console.log("GETTING THE WETAHER BOSS");
    }

    //console.log(transcript);    

});


//After listening once it unbinds itself so adding and EventListener at the end
recognition.addEventListener('end', recognition.start); //Remember it isnt () it just name of func


recognition.start();