
        // ===== QUIZ QUESTIONS DATABASE =====
        // Array of objects - each object is one question
        const questions = [
            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Tech Modern Language",
                    "Home Tool Markup Language",
                    "Hyperlinks and Text Markup Language"
                ],
                correct: 0  // Index of correct answer (first option)
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

        // ===== GLOBAL VARIABLES =====
        let currentQuestionIndex = 0;  // Tracks which question we're on
        let score = 0;  // Tracks the user's score
        let selectedAnswer = null;  // Stores the currently selected answer

        // ===== GET ALL DOM ELEMENTS =====
        const homeScreen = document.getElementById('home-screen');
        const quizScreen = document.getElementById('quiz-screen');
        const resultScreen = document.getElementById('result-screen');

        const startBtn = document.getElementById('start-btn');
        const nextBtn = document.getElementById('next-btn');
        const restartBtn = document.getElementById('restart-btn');

        const questionCounter = document.getElementById('question-counter');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');

        const scoreNumber = document.getElementById('score-number');
        const totalQuestionsEl = document.getElementById('total-questions');
        const correctAnswersEl = document.getElementById('correct-answers');
        const wrongAnswersEl = document.getElementById('wrong-answers');
        const percentageEl = document.getElementById('percentage');

        // ===== EVENT LISTENERS =====
        startBtn.addEventListener('click', startQuiz);
        nextBtn.addEventListener('click', nextQuestion);
        restartBtn.addEventListener('click', restartQuiz);

        // ===== FUNCTION: START QUIZ =====
        function startQuiz() {
            // Hide home screen, show quiz screen
            homeScreen.classList.remove('active');
            quizScreen.classList.add('active');
            
            // Reset variables
            currentQuestionIndex = 0;
            score = 0;
            
            // Show first question
            showQuestion();
        }

        // ===== FUNCTION: SHOW QUESTION =====
        function showQuestion() {
            // Reset selected answer
            selectedAnswer = null;
            nextBtn.disabled = true;
            
            // Get current question object
            const currentQuestion = questions[currentQuestionIndex];
            
            // Update question counter (add 1 because index starts at 0)
            questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
            
            // Update question text
            questionText.textContent = currentQuestion.question;
            
            // Clear previous options
            optionsContainer.innerHTML = '';
            
            // Create option buttons
            for (let i = 0; i < currentQuestion.options.length; i++) {
                const option = document.createElement('div');
                option.className = 'option';
                option.textContent = currentQuestion.options[i];
                
                // Add click event to each option
                option.addEventListener('click', function() {
                    selectAnswer(i, option);
                });
                
                optionsContainer.appendChild(option);
            }
        }

        // ===== FUNCTION: SELECT ANSWER =====
        function selectAnswer(answerIndex, optionElement) {
            // Remove 'selected' class from all options
            const allOptions = document.querySelectorAll('.option');
            for (let i = 0; i < allOptions.length; i++) {
                allOptions[i].classList.remove('selected');
            }
            
            // Add 'selected' class to clicked option
            optionElement.classList.add('selected');
            
            // Store the selected answer
            selectedAnswer = answerIndex;
            
            // Enable next button
            nextBtn.disabled = false;
        }

        // ===== FUNCTION: NEXT QUESTION =====
        function nextQuestion() {
            // Check if answer is correct
            if (selectedAnswer === questions[currentQuestionIndex].correct) {
                score++;  // Increase score
            }
            
            // Move to next question
            currentQuestionIndex++;
            
            // Check if quiz is finished
            if (currentQuestionIndex < questions.length) {
                showQuestion();  // Show next question
            } else {
                showResult();  // Show result screen
            }
        }

        // ===== FUNCTION: SHOW RESULT =====
        function showResult() {
            // Hide quiz screen, show result screen
            quizScreen.classList.remove('active');
            resultScreen.classList.add('active');
            
            // Calculate results
            const totalQuestions = questions.length;
            const correctAnswers = score;
            const wrongAnswers = totalQuestions - correctAnswers;
            const percentage = Math.round((correctAnswers / totalQuestions) * 100);
            
            // Update result display
            scoreNumber.textContent = score;
            totalQuestionsEl.textContent = totalQuestions;
            correctAnswersEl.textContent = correctAnswers;
            wrongAnswersEl.textContent = wrongAnswers;
            percentageEl.textContent = percentage + '%';
        }

        // ===== FUNCTION: RESTART QUIZ =====
        function restartQuiz() {
            // Hide result screen, show home screen
            resultScreen.classList.remove('active');
            homeScreen.classList.add('active');
            
            // Reset everything
            currentQuestionIndex = 0;
            score = 0;
            selectedAnswer = null;
        }
   
