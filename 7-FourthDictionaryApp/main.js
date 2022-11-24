const wrapper = document.querySelector('.wrapper'),
searchInput = wrapper.querySelector('input'),
synonyms = wrapper.querySelector('.synonyms .list'),
infoText = wrapper.querySelector('.info-text'),
volumeIcon = wrapper.querySelector('.word i'),
removeIcon = wrapper.querySelector('.search span');
let audio;


// data function 
function data(result, word){
    if (result.title) { // if api returns the message of can't find word
        infoText.innerHTML = `Can't find the meaning of <span>'${word}'</span>
        . Please, try to search again`;

    }else{
        wrapper.classList.add('active');
        let definitions = result[0].meanings[0].definitions[0],
        phonetics = `${result[0].meanings[0].partOfSpeech} ${result[0].phonetics[0].text}`;

        // let's pass the particular response data to a particular html element
        document.querySelector('.word p').innerText = result[0].word;
        document.querySelector('.word span').innerText = phonetics;
        document.querySelector('.meaning span').innerText = definitions.definition;
        document.querySelector('.example span').innerText = result[0].meanings[1].definitions[0].example;
        audio = new Audio(result[0].phonetics[2].audio); // creating new obj and passing audio src

        if (result[0].meanings[0].synonyms[0] == undefined) { // if there is no synonyms 
            synonyms.parentElement.style.display = 'none';
        }else{
            synonyms.parentElement.style.display = 'block';
            synonyms.innerHTML = '';

            for (let i = 0; i < 5; i++) { // getting only 5 synonyms out of many 
                let tag = `<span onclick=search('${result[0].meanings[0].synonyms[i]}')>${result[0].meanings[0].synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML('beforeend', tag); // passing all 5 synonyms inside synonyms div
            }
        }
    } 
}

// search synonyms function
async function search(word){
    searchInput.value = await word;
    fetchApi(word);
    wrapper.classList.remove('active');
}

// fetch api function
async function fetchApi(word){
    wrapper.classList.remove('active');
    infoText.style.color = '#000';
    infoText.innerHTML = await `Searching the meaning of <span>'${word}'</span>`;
    let url = await `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url)
    .then(res => res.json())
    .then(result => data(result, word));
}

searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter' && e.target.value) {
        fetchApi(e.target.value);
    }
});

volumeIcon.addEventListener('click', () => {
    audio.play();
});

removeIcon.addEventListener('click', ()=>{
    searchInput.value = '';
    searchInput.focus();
    wrapper.classList.remove('active');
    infoText.style.color = '#9a9a9a';
    infoText.innerHTML = 'Type a word and press enter to get meaning, example, pronunciation, and synonyms of that typed word.';
})