
var timerEl = document.getElementById('countdown');
var buttonEl = document.getElementById("start-btn");
var submitButton = document.getElementById('submit');

// target buttons a,b,c for answer choices
var aButton = document.getElementById("a")
var bButton = document.getElementById("b")
var cButton = document.getElementById("c")
//hide button display on startup
aButton.style.display ="none"
bButton.style.display ="none"
cButton.style.display ="none"

var Qindex = 0


var createQuiz = function() {
  
  // when click start quiz button, hide quiz heading
  document.getElementById("quiz-heading").style.display = "none"
  // when user click start quiz button,// hide button
  buttonEl.style.display = "none"
  //display first question
  document.getElementById("question").textContent = quizQuestions[Qindex].Question
  //display button
  aButton.style.display ="block"
  bButton.style.display ="block"
  cButton.style.display ="block"
  // add answers to buttons
  aButton.textContent = quizQuestions[Qindex].a
  bButton.textContent = quizQuestions[Qindex].b
  cButton.textContent = quizQuestions[Qindex].c
  
  

}

// function checkAns() {}
var checkAns = function() {
  if (quizQuestions[Qindex].ans === this.textContent) {
    console.log("the answer is correct")
  }
  else{
    console.log("answer is wrong")
  }
}



// click button to check answer
aButton.addEventListener('click', checkAns)
bButton.addEventListener('click', checkAns)
cButton.addEventListener('click', checkAns)

buttonEl.addEventListener('click',createQuiz);


// on submit, show results
// submitButton.addEventListener('click', showResults);

var quizQuestions = [
  // quiz 1, index 0
  {Question: "Which of the following is NOT a loop used in coding?",
    a: "a. for loop",
    b: "b. while loop",
    c: "c. jiffy loop",

    // let c be answer
    ans: "c. jiffy loop"
  },
  // quiz 2, index 1
  {Question: "which of the following is not a operator used in JavaScript?",
    a: "a. <",
    b: "b. ||",
    c: "c. ====",
    // let c be answer
    ans: "c. ===="
  },
  // quiz 3, index 2
  {Question: "which of the following is not a HTML element tag?",
    a: "a. addition",
    b: "b. button",
    c: "c. div",
    // let a be answer
    ans: "a. addition"
  }
]
