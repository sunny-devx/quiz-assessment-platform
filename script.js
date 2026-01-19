const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which CSS property is used to change text color?",
        options: [
            "text-color",
            "font-color",
            "color",
            "text-style"
        ],
        correct: 2
    },
    {
        question: "What is the correct way to declare a JavaScript variable?",
        options: [
            "variable x = 5;",
            "let x = 5;",
            "v x = 5;",
            "dim x = 5;"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "<!-- -->",
            "/* */",
            "//",
            "Both B and C"
        ],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 1
    }
];

let timeLeft = 20;
let quizTimer = null;

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

let participantData = {
    name: '',
    email: '',
    phone: '',
    age: ''
};

const landingScreen = document.getElementById('landing-screen');
const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const registrationForm = document.getElementById('registration-form');
const startBtn = document.getElementById('start-btn');
const changeDetailsBtn = document.getElementById('change-details-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const nameInput = document.getElementById('participant-name');
const emailInput = document.getElementById('participant-email');
const phoneInput = document.getElementById('participant-phone');
const ageInput = document.getElementById('participant-age');

const nameGroup = document.getElementById('name-group');
const emailGroup = document.getElementById('email-group');
const phoneGroup = document.getElementById('phone-group');
const ageGroup = document.getElementById('age-group');

const questionCounter = document.getElementById('question-counter');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const scoreNumber = document.getElementById('score-number');
const totalQuestionsEl = document.getElementById('total-questions');
const correctAnswersEl = document.getElementById('correct-answers');
const wrongAnswersEl = document.getElementById('wrong-answers');
const percentageEl = document.getElementById('percentage');

registrationForm.addEventListener('submit', handleRegistration);
startBtn.addEventListener('click', startQuiz);
changeDetailsBtn.addEventListener('click', changeDetails);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

function handleRegistration(e) {
    e.preventDefault();

    nameGroup.classList.remove('error');
    emailGroup.classList.remove('error');
    phoneGroup.classList.remove('error');
    ageGroup.classList.remove('error');

    let isValid = true;

    if (nameInput.value.trim() === '') {
        nameGroup.classList.add('error');
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        emailGroup.classList.add('error');
        isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
        phoneGroup.classList.add('error');
        isValid = false;
    }

    if (ageInput.value.trim() === '') {
        ageGroup.classList.add('error');
        isValid = false;
    }

    if (isValid) {
        participantData.name = nameInput.value.trim();
        participantData.email = emailInput.value.trim();
        participantData.phone = phoneInput.value.trim();
        participantData.age = ageInput.value.trim();

        document.getElementById('display-name').textContent = participantData.name;
        document.getElementById('info-name').textContent = participantData.name;
        document.getElementById('info-email').textContent = participantData.email;
        document.getElementById('info-phone').textContent = participantData.phone;
        document.getElementById('info-age').textContent = participantData.age;

        landingScreen.classList.remove('active');
        homeScreen.classList.add('active');
    }
}

function changeDetails() {
    homeScreen.classList.remove('active');
    landingScreen.classList.add('active');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    homeScreen.classList.remove('active');
    quizScreen.classList.add('active');

    document.getElementById('quiz-participant-name').textContent = participantData.name;

    currentQuestionIndex = 0;
    score = 0;
    shuffleArray(questions);

    showQuestion();
}

function showQuestion() {
    selectedAnswer = null;
    nextBtn.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];

    questionCounter.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    for (let i = 0; i < currentQuestion.options.length; i++) {
        const option = document.createElement('div');
        option.className = 'option';
        option.textContent = currentQuestion.options[i];

        option.addEventListener('click', function () {
            selectAnswer(i, option);
        });

        optionsContainer.appendChild(option);
    }
    startTimer();
}

function selectAnswer(answerIndex, optionElement) {
    clearInterval(quizTimer);
    quizTimer = null;
    const allOptions = document.querySelectorAll('.option');
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.remove('selected');
    }

    optionElement.classList.add('selected');
    selectedAnswer = answerIndex;
    nextBtn.disabled = false;
}

function nextQuestion() {
    if (selectedAnswer === questions[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function startTimer() {
    if (quizTimer !== null) {
        clearInterval(quizTimer);
    }

    timeLeft = 20;
    const timerEl = document.getElementById("timer");
    timerEl.textContent = "⏱️ 20s";

    quizTimer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = "⏱️ " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            quizTimer = null;
            nextQuestion();
        }
    }, 1000);
}

function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    document.getElementById('result-name').textContent = participantData.name;
    document.getElementById('result-email').textContent = participantData.email;
    document.getElementById('result-phone').textContent = participantData.phone;
    document.getElementById('result-age').textContent = participantData.age;

    const totalQuestions = questions.length;
    const correctAnswers = score;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    scoreNumber.textContent = score;
    totalQuestionsEl.textContent = totalQuestions;
    correctAnswersEl.textContent = correctAnswers;
    wrongAnswersEl.textContent = wrongAnswers;
    percentageEl.textContent = percentage + '%';
}

function restartQuiz() {
    resultScreen.classList.remove('active');
    homeScreen.classList.add('active');

    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
}

