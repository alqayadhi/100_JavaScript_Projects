var dictionary = 
[
    {
        word:"apple",
        def:"A round fruit with seeds at its center",
        rel:["mango","pear","guava"]
    },
    {
        word:"baby",
        def:"the young one of a human",
        rel:["child","toddler","teen"]
    },
    {
        word:"car",
        def:"transports people from place to place",
        rel:["mango","pear","guava"]
    },
    {
        word:"computer",
        def:"An electronic device",
        rel:["laptop","tablet","palmtop"]
    },
    {
        word:"mosquito",
        def:"An insect",
        rel:["ant","beetle","butterfly"]
    }
];

// fill the dictionary with words
function init() {
    for (var i = 0; i < dictionary.length; i++) {
       document.getElementById("word_list").innerHTML += "<li onclick = 'show(' + i + ')'>" +
       dictionary[i].word + '</li>';
    }
}

// call the init function when page loads
init();

// display a word, its definition and related words
function show(i) {
    document.getElementById('word_text').innerHTML = dictionary[i].word;
    document.getElementById('definition').innerHTML = dictionary[i].def;

    var list = '';

    for (var j = 0; j< dictionary[i].rel.length; j++) {
        list += '<li>' + dictionary[i].rel[j] + '</li>';
        document.getElementById('related').innerHTML = list;
    }
}

// show first word in the dictionary when page loads 
show(0);

// search functionality 
search = function(){
    query = document.getElementById('search');

    if (query === '') {
        return;
    }

    found = -1; // initial
}