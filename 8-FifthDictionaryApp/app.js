// input field
let text = document.querySelector('#text');
// search button 
let search = document.querySelector('#search');
// content section => main container
let data = document.querySelector('#data');

let loadData = () =>{
    // api for dictionary 
    const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${text.value}`;
   
    fetch(api)
    .then(response => response.json())
    .then(result => {
        data.innerHTML = `
        <div class="detail">
            <h3 class="meaning">Word</h3>
            <p>${result[0].word}</p>                
        </div>

        <div class="detail">
            <h3 class="meaning">Definition</h3>
            <p>${result[0].meanings[0].definitions[0].definition}</p>                
        </div>

        <div class="detail">
            <h3 class="meaning">Example</h3>
            <p>${result[0].meanings[0].definitions[0].example}</p>                
        </div>

        <div class="detail">
            <h3 class="meaning">Part of Speech</h3>
            <p>${result[0].meanings[0].partOfSpeech}</p>                
        </div>

        <div class="detail">
            <h3 class="meaning">Origin</h3>
            <p>${result[0].origin}</p>                
        </div>
        `;
    }).catch(() =>{
        data.innerHTML = `<div class="error">Can't Find THE Meaning of <span>${text.value}</span>.Please Search Another Word.</div>
        `;
    });
    
}

search.addEventListener('click', () => {
    if (text.value != '') {
        // run the function
        loadData();
    }else{
        data.innerHTML = `<div class="impo">Type Any Word & Press Enter To Get Meaning.</div>`;
    }
});