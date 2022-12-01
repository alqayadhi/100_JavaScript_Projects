
const text = document.querySelector('#text'),
searchBtn = document.querySelector('#search'),
notFound = document.querySelector('.not__found'),
apiKey = '0c5a6843-1c09-4215-ad57-fcfc378b2f65';

function getUse(e){
    if (e.keyCode == 13) {
        getData();
    }
}


searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Get input data
    const word =  text.value;
    // call API get data

    if (word === '') {
        alert('Word is required');
        return;
    }

    getData(word);
})

async function getData(word){
    // Ajax call 
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);

    const data = await response.json();

    // if empty result 
    if (!data.length) {
        notFound.innerHTML = 'No Result Found';
        return;
    }

    // if result is suggestions
    if (typeof data[0] === 'string') {
        const heading = document.createElement('h3');
        heading.innerHTML = 'Did you mean?'
        notFound.appendChild(heading);

        data.forEach(element => {
            const suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerHTML = element;
            notFound.appendChild(suggested);
        })
        return;
    }
}