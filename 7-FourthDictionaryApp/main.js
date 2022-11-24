const wrapper = document.querySelector('.wrapper'),
searchInput = wrapper.querySelector('input'),
infoText = wrapper.querySelector('.info-text');

// fetch api function
function fetchApi(word){
    infoText.style.color = '#000';
    infoText.innerHTML = `Searching the meaning of <span>'${word}'</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => console.log(result));
}


searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter' && e.target.value) {
        fetchApi(e.target.value);
    }
    
});