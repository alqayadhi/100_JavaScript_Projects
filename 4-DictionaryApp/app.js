
const form = document.getElementById("form");
const search_btn = document.getElementById('search_btn');
const not_found = document.querySelector('.not_found');
const definition_box = document.querySelector('.def');
const audio_box = document.querySelector('.audio')

const apiKey = '0c5a6843-1c09-4215-ad57-fcfc378b2f65';

search_btn.addEventListener("click", e =>{
    e.preventDefault();

    const word = input.value;
    if(word === ''){
        alert('Please type a word');
        return;
    }

    dataGet(word);

    audio_box.innerHTML = '';
    not_found.innerHTML = '';
    definition_box.innerHTML = '';
});

async function dataGet(word){
    //const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    

    const data = await response.json();
    console.log(data);

    if(!data.length){
        not_found.innerHTML = 'No result found';
        return;
    }

    if(typeof data[0] === 'string'){
        const heading = document.createElement('h3');
        heading.innerText = 'Did you mean?';
        not_found.appendChild(heading);

        data.forEach(element => {
            const suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            not_found.appendChild(suggestion);
        })
        return;
    }

    const definition = data[0].shortdef[0]; 
    definition_box.innerText = definition;

    const sound_name = data[0].hwi.prs[0].sound.audio;

    if (sound_name) { // if sound is available 
        soundRender(sound_name);
    }
}

async function soundRender(sound_name){
    const sub_folder = await sound_name.charAt(0);
    const sound_src = await `https://media.merriam-webster.com/soundc11/${sub_folder}/${sound_name}.wav?key=${apiKey}`;

    const aud = document.createElement('audio');
    aud.src = sound_src;
    aud.controls = true;
    audio_box.appendChild(aud);
}