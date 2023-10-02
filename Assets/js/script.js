// Define the questions and answers
var questions = [
  {
    question: "What is JavaScript primarily used for?",
    answers: ["Styling web pages", "Creating web server applications", "Adding interactivity to web pages", "Defining page structure"],
    correctAnswer: "Adding interactivity to web pages",
    userAnswer: null,
  },
  {
    question: "Which of the following is a correct way to declare a variable in JavaScript",
    answers: ["var myVariable = 10;", "variable myVariable = 10;", "let myVariable = 10;", "const myVariable = 10;"],
    correctAnswer: "var myVariable = 10;",
    userAnswer: null,
  },
  {
    question: "Which JavaScript method is used to add an element to the end of an array?",
    answers: ["append()", "push()", "addToEnd()", "addElement()"],
    correctAnswer: "push()",
    userAnswer: null,
  },
  {
    question: "Which function is used to print content to the console in JavaScript?",
    answers: ["console.write()", "print()", "console.log()", "write()"],
    correctAnswer: "console.log()",
    userAnswer: null,
  },
  {
    question: "Which of the following is not a valid JavaScript data type?",
    answers: ["string", "boolean", "object", "character"],
    correctAnswer: "character",
    userAnswer: null,
  },
];
var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("form input[type='submit']")


// Keep track of the current question index
var currentQuestionIndex = 0;

var score = 0;

// Initialize the timer
var timerElement = document.getElementById("timer");
var remainingTime = 120; 
var timerInterval;
timerElement.textContent = remainingTime;

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    if (remainingTime > 0) {
      remainingTime--;
      timerElement.textContent = remainingTime;
    } else {
      clearInterval(timerInterval);
      showResultsPage();
      
    }
  }, 1000); 
}

// Event listener for the "Start Quiz" button
var startButton = document.querySelector(".start-button");
startButton.addEventListener("click", function () {
  startButton.style.display = "none"; // Hide the start button
  startTimer(); // Start the timer
  displayQuestion(); // Display the first question
});

// Display the current question and answer choices
function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  // Display the question
  var questionElement = document.querySelector(".question");
  questionElement.textContent = currentQuestion.question;

  // Display the answer choices with buttons
  var answerContainer = document.querySelector(".answers-container");
  answerContainer.innerHTML = ""; 

  for (var i = 0; i < currentQuestion.answers.length; i++) { 
    var answerButton = document.createElement("button");
    answerButton.textContent = currentQuestion.answers[i]; 
    answerButton.value = currentQuestion.answers[i]; 
    answerButton.addEventListener("click", submitAnswer);

    answerContainer.appendChild(answerButton);
  }
}

// Handle the user's answer submission
function submitAnswer(event) {

  var selectedAnswer = event.target.value;


  questions[currentQuestionIndex].userAnswer = selectedAnswer;

  // Check if the answer is correct
  var isCorrectAnswer = selectedAnswer === questions[currentQuestionIndex].correctAnswer;


  var feedbackElement = document.querySelector(".feedback");
  if (isCorrectAnswer) {
    feedbackElement.textContent = "Correct!";
    score++;
  } else {
    feedbackElement.textContent =
      "Incorrect. The correct answer is " + questions[currentQuestionIndex].correctAnswer;

    remainingTime -= 10;
  
  }

  // Move to the next question
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    clearInterval(timerInterval); // Stop the timer
    showResultsPage();
  }
}

// Display the results page
function showResultsPage() {
   
   var questionContainer = document.querySelector(".question");
   var answerContainer = document.querySelector(".answers-container");
   questionContainer.style.display = "none";
   answerContainer.style.display = "none";
 
   
   var totalScoreElement = document.querySelector(".total-score");
   totalScoreElement.style.display = "block";
   var finalScoreElement = document.getElementById("final-score");
   finalScoreElement.textContent = "Total Score: " + score;
   var changeTitle = document.querySelector("h1");
   changeTitle.textContent = "Thank you for taking the quiz.";

   var form = document.querySelector("form");
  form.style.display = "block";

  renderLocalStorageItems();
  
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  var userInitials = initialsInput.value;
  localStorage.setItem(userInitials, score);

  alert("Score saved successfully");
});

function renderLocalStorageItems(){

  
  var localStorageKeys = Object.keys(localStorage);
  var scoreList = document.querySelector(".score-lists");
  
  
  scoreList.innerHTML = "";
  
  
  for (var i = 0; i < localStorageKeys.length; i++) {
    var key = localStorageKeys[i];
    var value = localStorage.getItem(key);
    
  
    var itemElement = document.createElement("div");
    itemElement.textContent = key + ": " + value;
    
   
    scoreList.appendChild(itemElement);
  }
  
}


// var resetButton = document.querySelector(".reset-button");
// resetButton.addEventListener("click", resetQuiz);
// function resetQuiz() {
   
 
//   startButton.style.display = "block";


//   var feedbackElement = document.querySelector(".feedback");
//   feedbackElement.textContent = "";


//   var totalScoreElement = document.querySelector(".total-score");
//   totalScoreElement.style.display = "none";

 
//   var changeTitle = document.querySelector("h1");
//   changeTitle.textContent = "Let's get ready to start.";

//   remainingTime = 120;

//   currentQuestionIndex = 0;
//   score = 0;
//   timerElement.textContent = remainingTime;
//   startButton.addEventListener("click", function () {
//     startButton.style.display = "none"; 
//     startTimer(); 
//     displayQuestion(); 
//   });

// }
