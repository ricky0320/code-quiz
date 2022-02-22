var timerEl = document.getElementById('countdown');
var buttonEl = document.getElementById("start-btn");
var submitButton = document.getElementById('submit');
var showAns = document.getElementById('showAns');


// target buttons a,b,c for answer choices
var aButton = document.getElementById("a")
var bButton = document.getElementById("b")
var cButton = document.getElementById("c")
//hide button display on startup
aButton.style.display ="none"
bButton.style.display ="none"
cButton.style.display ="none"

var Qindex = 0
var timer = quizQuestions.length * 20;



var StartQuiz = function() {
  
  // when click start quiz button, hide quiz heading
  document.getElementById("quiz-heading").style.display = "none";

  // when user click start quiz button,// hide button
  buttonEl.style.display = "none";

  // hide showAns
  showAns.style.display = "none";

  // start timer
  timerEl = timer;

  // pull up quiz questions
  getQuizQuestion();
}



function getQuizQuestion() {
  //display question
  document.getElementById("question").textContent = quizQuestions[Qindex].Question

  //display button
  aButton.style.display ="block"
  bButton.style.display ="block"
  cButton.style.display ="block"

  // add answers to buttons
  aButton.textContent = quizQuestions[Qindex].a
  bButton.textContent = quizQuestions[Qindex].b
  cButton.textContent = quizQuestions[Qindex].c


};




// function checkAns() {}
var checkAns = function() {
  if (quizQuestions[Qindex].ans === this.textContent) {
    showAns.textContent = "Correct."
  }
  else{
    showAns.textContent = "Wrong."
  }
  // next question
  Qindex++;

  // check if there is a next question
  if (Qindex === quizQuestions.length) {
    EndQuiz();
  } else {
    getQuizQuestion();
  }
};

function EndQuiz() {
  // stop timer
  clearInterval(timer);

  
}

// click button to check answer
aButton.addEventListener('click', checkAns)
bButton.addEventListener('click', checkAns)
cButton.addEventListener('click', checkAns)

// start quiz when clicking this button
buttonEl.addEventListener('click',createQuiz);


// on submit, show results
// submitButton.addEventListener('click', showResults);


