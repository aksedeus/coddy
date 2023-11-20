const startBtn = document.querySelector("#start-btn");
const startMenu = document.querySelector("#start-menu");
const question = document.querySelector("#question");
const questionText = document.querySelector("#question-text");
const variantBtns = document.querySelectorAll(".variant-btn");
const scoreMenu = document.querySelector("#score-menu");
const scoreText = document.querySelector("#score-text");
const restartBtn = document.querySelector("#restart-btn")

let currentQuestion;
let score;

function start() {
    currentQuestion = 0;
    score = 0;

    startMenu.classList.add("hide");
    scoreMenu.classList.add("hide");
    question.classList.remove("hide");

    showQuestion(questions[0]);
}

function finish() {
    question.classList.add("hide");
    scoreMenu.classList.remove("hide");

    scoreText.textContent = `${score}`;
}

function chooseVariant(event) {
    compareVariant(questions[currentQuestion].answer, event.target.textContent);

    currentQuestion += 1;
    if(currentQuestion < questions.length) {
        showQuestion(questions[currentQuestion]);
    } else {
        finish();
    }
}

function showQuestion(question) {
    questionText.textContent = question.question;

    for(let i = 0; i < variantBtns.length; i++) {
        variantBtns[i].textContent = question.variants[i];
    }
}

function compareVariant(answer, variant) {
    if(answer === variant) {
        score += 1;
    }
}

startBtn.addEventListener("click", start);
restartBtn.addEventListener("click", start);

for(let i = 0; i < variantBtns.length; i++) {
    variantBtns[i].addEventListener("click", chooseVariant)
}