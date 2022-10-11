
// the first element in the document with the class ".question-number" is returned:
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// push the questions into availableQuestions Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i = 0; i < totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

// set question number and question and options
function getNewQuestion(){
    // set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    // set question text
    // get random question 
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    // get the position of 'questionIndex' from the availableQuestion array 
    const index1 = availableQuestions.indexOf(questionIndex); 
    // remove the 'questionIndex' from the availableQuestion array, so the question  won't be repeated again 
    availableQuestions.splice(index1, 1);

    // set options
    // get the length of options
    const optionLen = currentQuestion.options.length
    // push options into availableOptions array
    for(let i = 0; i < optionLen; i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    // create options in html
    for(let i = 0; i < optionLen; i++){
        // random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of 'optionIndex' from the availableOptions
        const index2 =  availableOptions.indexOf(optonIndex);
        // remove the 'optionIndex' from the availableOptions Array, so the options won't be repeated again 
        availableOptions.splice(index2, 1);
        //console.log(availableOptions)
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter++
}

function getResult(element){
    const id = parseInt(element.id);
    // get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer){
       // set the green color to the correct option
       element.classList.add("correct");
       // add the indicator to correct mark
       updateAnswerIndicator("correct");
       correctAnswers++;
    }
    else{
        // set the green color to the correct option
        element.classList.add("wrong");
        // add the indicator to correct mark
        updateAnswerIndicator("wrong");

        // if the answer is incorrect then show the correct one 
        const optionLen = optionContainer.children.length;
        for(let i = 0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unClickableOptions();
}

// make all the options unclickableOptions once the user select a option (restrict the user to change the option again)
function unClickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i = 0; i < optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i = 0; i < totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    // hide quiz quizBox
    quizBox.classList.add("hide");
    // show result box
    resultBox.classList.remove("hide");
    quizResult();
}

// get the quiz result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    // hide the resultBox
    resultBox.classList.add("hide");
    // show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    // hide resultBox
    resultBox.classList.add("hide");
    // show homebox
    homeBox.classList.remove("hide");
    resetQuiz();
}
// starting point 
function startQuiz(){
    // hide home box
    homeBox.classList.add("hide");
    // show quiz box
    quizBox.classList.remove("hide");
    // first we will set all question in  availableQuestions array  
    setAvailableQuestions();
    // second we wll call getNewQuestion(); function 
    getNewQuestion();
    // to create indicator of answers 
    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}