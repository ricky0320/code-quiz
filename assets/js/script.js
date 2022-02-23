var quiz = [{
  question: "Which of the following is NOT a loop used in coding?",
  answers: [{
          correct: false,
          display: "if loop"
      },
      {
          correct: false,
          display: "while loop"
      },
      {
          correct: true,
          display: "jiffy loop"
      },
      {
          correct: false,
          display: "for loop"
      }
  ]
},
{
  question: "which of the following is NOT an operator used in JavaScript?",
  answers: [{
          correct: false,
          display: "<"
      },
      {
          correct: false,
          display: "||"
      },
      {
          correct: true,
          display: "===="
      },
      {
          correct: false,
          display: "=="
      }
  ]
},
{
  question: "which of the following is NOT a HTML element tag?",
  answers: [{
          correct: false,
          display: "aside"
      },
      {
          correct: false,
          display: "div"
      },
      {
          correct: false,
          display: "button"
      },
      {
          correct: true,
          display: "addition"
      }
  ]
},
{
  question: "Which of the follwing file type does javascript belong to?",
  answers: [{
          correct: false,
          display: "css"
      },
      {
          correct: false,
          display: "md"
      },
      {
          correct: true,
          display: "js"
      },
      {
          correct: false,
          display: "html"
      }
  ]
},
{
  question: "Commonly used data types do NOT include",
  answers: [{
          correct: false,
          display: "strings"
      },
      {
          correct: false,
          display: "booleans"
      },
      {
          correct: false,
          display: "numbers"
      },
      {
          correct: true,
          display: "alerts"
      }
  ]
}
];



var timeCounter = 0; // number of seconds remaining on the quiz
var countdownInterval = null;

var mainContainerEL = document.getElementById("main");
mainContainerEL.addEventListener("click", clickHandler);
mainContainerEL.addEventListener("keypress", keyPressHandler);

var contentContainerEl = document.getElementById("content-container");

var timerEl = document.getElementById("timer");

var highScores = [];
var inQuiz = false;

getSavedScores();

beginChallenge();

// Begin the challenge
function beginChallenge() {
    let contentHolderEl = createContentHolder();

    let headingEl = document.createElement("h2");
    headingEl.innerText = "Coding Quiz Challenge";
    headingEl.className = "center-text";

    let infoText1El = document.createElement("div");
    infoText1El.innerText = "Test your coding concepts.";
    infoText1El.className = "center-text";

    let infoText2El = document.createElement("div");
    infoText2El.innerText = "*Caution* Incorrect answer will take a penality of ten seconds deduction!";
    infoText2El.className = "center-text";

    let buttonContainerEl = document.createElement("div");
    buttonContainerEl.className = "center-text";

    let startQuizButtonEl = document.createElement("button");
    startQuizButtonEl.innerText = "Start";
    startQuizButtonEl.className = "start-quiz";

    buttonContainerEl.appendChild(startQuizButtonEl);

    contentHolderEl.appendChild(headingEl);
    contentHolderEl.appendChild(infoText1El);
    contentHolderEl.appendChild(infoText2El);
    contentHolderEl.appendChild(buttonContainerEl);

    contentContainerEl.appendChild(contentHolderEl);
}

// Clear the center section of the document
function clearCenter() {
    let contentHolderEl = document.getElementById("content-holder");
    if (contentHolderEl) {
        contentContainerEl.removeChild(contentHolderEl);
    }
}

// Handle a click in the body of the document
function clickHandler(event) {
    let target = event.target;

    switch (target.className) {
        case "answer-button":
            handleAnswer(target);
            break;

        case "clear-high-scores":
            highScores = [];
            clearCenter();
            saveHighScores();
            showHighScores();
            break;

        case "display-high-scores":
            // disable if user taking quiz
            if (!inQuiz) {
                clearCenter();
                showHighScores();
            } else {
                // This has the beneficial side-effect of pausing the counter
                alert("Display of high scores disabled during quiz.");
            }
            break;

        case "back":
            clearCenter();
            beginChallenge();
            break;

        case "start-quiz":
            clearCenter();
            startQuiz();
            break;

        case "submit-button":
            handleInput();
            break;

        default:
            // Explicitly ignore all other clicks
            break;
    }
}

// Countdown to 0 seconds
function countdown() {
    if (timeCounter > 0) {
        timeCounter--;
        displayTimer();
    } else {
        clearCenter();
        endQuiz();
    }
}

// Create the content holder for the center screen
function createContentHolder() {
    let contentHolderEl = document.createElement("div");
    contentHolderEl.id = "content-holder";
    contentHolderEl.className = "content-holder";

    return contentHolderEl;
}

// Create the quiz question for the index in quiz
function createQuizQuestion(index) {
    let contentHolderEl = createContentHolder();

    let contentEl = document.createElement("h2");
    contentEl.className = "content";

    contentHolderEl.appendChild(contentEl);

    let quizItem = quiz[index];
    contentEl.textContent = quizItem.question;

    for (let i = 0; i < quizItem.answers.length; i++) {
        const answer = quizItem.answers[i];
        let answerDivEl = document.createElement("div");
        answerDivEl.className = "button-holder";
        let answerEl = document.createElement("button");

        answerEl.className = "answer-button";
        answerEl.textContent = (i + 1) + ". " + answer.display;
        answerEl.setAttribute("data-index", index);

        if (answer.correct === true) {
            answerEl.setAttribute("data-correct", "true");
        }

        answerDivEl.appendChild(answerEl);

        contentEl.appendChild(answerDivEl);
    }

    contentContainerEl.appendChild(contentHolderEl);
}

// Display the timer
function displayTimer() {
    timerEl.textContent = " " + timeCounter;
}

// End the quiz
function endQuiz() {
    clearInterval(countdownInterval);

    // Prompt the user for their initials
    let contentHolderEl = createContentHolder();

    let inputHeaderTextEl = document.createElement("h2");
    inputHeaderTextEl.innerText = "All done!";
    contentHolderEl.appendChild(inputHeaderTextEl);

    let inputNormalTextEl = document.createElement("div");
    inputNormalTextEl.innerText = "Your score is " + timeCounter + ".";
    contentHolderEl.appendChild(inputNormalTextEl);
    inputNormalTextEl.className = "end-page"

    let inputHolderEl = document.createElement("div");
    inputNormalTextEl.appendChild(inputHolderEl);

    let labelEl = document.createElement("label");
    labelEl.innerText = "Enter Your Initials:";
    labelEl.setAttribute("for", "input-field");
    inputHolderEl.appendChild(labelEl);
    labelEl.className = "end-page"

    let initialInputEl = document.createElement("input");
    initialInputEl.className = "input-field";
    initialInputEl.name = "input-field";
    initialInputEl.id = "input-field";
    inputHolderEl.appendChild(initialInputEl);

    let submitButtonEl = document.createElement("button");
    submitButtonEl.className = "submit-button";
    submitButtonEl.id = "submit-button";
    submitButtonEl.innerText = "Submit";
    inputHolderEl.appendChild(submitButtonEl);

    contentContainerEl.appendChild(contentHolderEl);

    initialInputEl.focus();
}

// Get the saved scores
function getSavedScores() {
    let savedScores = window.localStorage.getItem("high-scores");
    if (savedScores) {
        highScores = JSON.parse(savedScores);
    }
}

// Handle a key press in the body of the document
function keyPressHandler(event) {
    // If we are on the input field
    if (event.target.className === "input-field") {
        // If enter key was pressed...
        if (event.keyCode == 13 || event.which == 13) {
            handleInput();
        }
    }
}

// Handle an answer button
function handleAnswer(buttonEl) {
    let index = buttonEl.getAttribute("data-index");
    let answerStsEl = document.createElement("div");
    answerStsEl.className = "answer";

    if (buttonEl.hasAttribute("data-correct")) {
        answerStsEl.textContent = "Correct";
    } else {
        answerStsEl.textContent = "Incorrect";
        timeCounter -= 10; // User loses 10 seconds for incorrect answer.
        if (timeCounter <= 0) {
            timeCounter = 0;
        }

        displayTimer();
    }

    let contentHolderEl = document.getElementById("content-holder");
    contentHolderEl.appendChild(answerStsEl);

    setTimeout(function () {
        clearCenter();

        let currIndex = parseInt(index) + 1;
        if (currIndex < quiz.length && timeCounter) {
            createQuizQuestion(currIndex);
        } else {
            endQuiz();
        }
    }, 0.5 * 1000);

    // DON'T do anything here!
}

// Handle input of initials for high score
function handleInput() {
    let contentHolderEl = document.getElementById("content-holder")
    if (contentHolderEl) {
        let inputFieldEl = document.getElementById("input-field");
        if (inputFieldEl) {
            let input = inputFieldEl.value;
            if (input) {
                clearCenter();
                let tempScores = [];

                let currScore = {
                    initials: input,
                    score: timeCounter
                }

                let inserted = false;
                if (!highScores.length) {
                    tempScores.push(currScore);
                } else {
                    // Insert in order of highest score (most recent first if duplicates)
                    for (let i = 0; i < highScores.length; i++) {
                        if (!inserted && currScore.score >= highScores[i].score) {
                            inserted = true;
                            tempScores.push(currScore);
                        }
                        tempScores.push(highScores[i]);
                    }

                    if (!inserted) {
                        // If less than all other scores, add it.
                        tempScores.push(currScore);
                    }
                }

                highScores = tempScores;

                inQuiz = false;

                saveHighScores();
                showHighScores();
            } else {
                alert("Please input your initials");
                inputFieldEl.focus();
            }
        }
    }
}

// Save high scores
function saveHighScores() {
    let saveScores = JSON.stringify(highScores);
    window.localStorage.setItem("high-scores", saveScores);
}

// Show high scores
function showHighScores() {
    let contentHolderEl = createContentHolder();

    let highScoresTitleEl = document.createElement("h2");
    highScoresTitleEl.textContent = "High scores";

    contentHolderEl.appendChild(highScoresTitleEl);

    for (let i = 0; i < highScores.length; i++) {
        let currScoreEl = document.createElement("div");
        currScoreEl.className = "high-score";
        currScoreEl.textContent = (i + 1) + ":" + highScores[i].initials.trim() + " - " + highScores[i].score;

        contentHolderEl.appendChild(currScoreEl);
    }

    let buttonHolderEl = document.createElement("div");

    let goBackButtonEl = document.createElement("button");
    goBackButtonEl.className = "back";
    goBackButtonEl.innerText = "Back"

    let clearHighScoresEl = document.createElement("button");
    clearHighScoresEl.className = "clear-high-scores";
    clearHighScoresEl.innerText = "Clear high scores";

    buttonHolderEl.appendChild(goBackButtonEl);
    buttonHolderEl.appendChild(clearHighScoresEl);

    contentHolderEl.appendChild(buttonHolderEl);

    contentContainerEl.appendChild(contentHolderEl);
}

// Start the quiz
function startQuiz() {
    inQuiz = true;
    timeCounter = quiz.length * 15; // 15 seconds per question on the quiz
    displayTimer();

    countdownInterval = setInterval(countdown, 1000);
    createQuizQuestion(0);
}