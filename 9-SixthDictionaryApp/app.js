const speaker = document.querySelector('.fa-volume-up'),
audio = new Audio;

async function findWord(){
    const searchText = document.getElementById('text'),
    mainWord = document.getElementById('mainWord'),
    meaning = document.getElementById('meaning'),
    example = document.getElementById('example'),
    wrapper = document.querySelector('.wrapper'),
    main_word = document.querySelector('.main_word');

    const api = await `https://api.dictionaryapi.dev/api/v2/entries/en/${searchText.value}`;
   fetch(api).then(res => res.json()).then(data => {
        mainWord.innerText = data[0].word;
        meaning.innerText = data[0].meanings[0].definitions[0].definition;
        example.innerText = data[0].meanings[0].definitions[0].example;
        audio.src = data[0].phonetics[0].audio;
        
        main_word.style.display = 'flex';
        wrapper.classList.remove('smopen');
        wrapper.classList.add("open");
        speaker.style.display = 'block';
        example.style.display = 'block';

        if (example.innerHTML == "undefined") {
            example.innerText = 'Sorry we Have No Example of this Word';
        }

    }).catch(() => {
        mainWord.innerText = '';
        meaning.innerText = 'Sorry We Did Not Find Anything For Your Search Word Please Check Spelling';
        example.innerText = '';
        main_word.style.display = 'none';
        main_word.style.display = 'none';
        wrapper.classList.remove('open');
        wrapper.classList.add("smopen");
        speaker.style.display = 'none';
        example.style.display = 'none';
    })
}

function getans(e){
    if(e.keyCode == 13){
        findWord();
    }
}

speaker.addEventListener("click", () =>{
    audio.play();
})