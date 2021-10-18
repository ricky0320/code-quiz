
var timerEl = document.getElementById('countdown');
var buttonEl = document.getElementById("start-btn");
var submitButton = document.getElementById('submit');

var timeLeft = 10;
var highScore = 0;


var createQuiz = function() {
    
}

function showResults() {}





// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);














































var myQuestions = [
    {
      question: "Which of the following is not a loop used in coding?",
      answers: {
        a: "for loop",
        b: "while loop",
        c: "jiffy loop"
      },
      correctAnswer: "c"
    },
    {
      question: "which of the following is not a operator used in JavaScript?",
      answers: {
        a: "<",
        b: "||",
        c: "===="
      },
      correctAnswer: "c"
    },
    {
      question: "which of the following is not a HTML element tag?",
      answers: {
        a: "div",
        b: "section",
        c: "button",
        d: "addition"
      },
      correctAnswer: "d"
    }
  ];