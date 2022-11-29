
const text = document.getElementById('text');

function getUse(e){
    if (e.keyCode == 13) {
        searchWord();
    }
}

text.addEventListener('click', () => {
    console.log('text clicked...');
})