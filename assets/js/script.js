// Data Objects
// quiz questions
var q1 = {
    question: "1. Commonly used data types DO NOT include:",
    choices: ['Strings', 'Booleans', 'Characters', 'Numbers'],
    answer: 'Characters',
};
var q2 = {
    question: "2. What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
    choices: ['Clone', 'Debugger', 'Repeater', 'Loop'],
    answer: 'Loop',
};
var q3 = {
    question: "3. What is the element used and hidden in code that explains things and makes the content more readable?",
    choices: ['Comments', 'Comparisons', 'Quotations', 'Notes'],
    answer: 'Comments',
};
var q4 = {
    question: "4. What is the name of the object that allows you to perform mathematical tasks with the interpreter?",
    choices: ['Math', 'Count', 'Number', 'Solve'],
    answer: 'Math',
};
var q5 = {
    question: "5. In JavaScript, what element is used to store and manipulate text, usually in multiples?",
    choices: ['Strings', 'Arrays', 'Recorders', 'Variables'],
    answer: 'Arrays'
};
var q6 = {
    question: "6. What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?",
    choices: ['Output Level', 'Restriction', 'Scope', 'Range'],
    answer: 'Scope'
};
var q7 = {
    question: "7. What are the identifiers called that cannot be used as variables or function names?",
    choices: ['Constants', 'Reserved Words', 'Favorites', 'Concrete Terms'],
    answer: 'Constants'
};
var q8 = {
    question: "8. JavaScript does NOT have this function built-in, which is commonly used to print or display data in other languages.",
    choices: ['Output', 'Speak', 'Display', 'Show'],
    answer: 'Output'
};
var q9 = {
    question: "9. In JavaScript, what is a block of code called that is used to perform a specific task?",
    choices: ['Declaration', 'Function', 'Variable', 'String'],
    answer: 'Function'
};
var q10 = {
    question: "10. What is a JavaScript element that represents either TRUE or FALSE values?",
    choices: ['Boolean', 'RegExp', 'Event', 'Condition'],
    answer: 'Boolean'
};
// load objects into array 
var quizQuestions = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10];

// Variavbles/Handlers
// time elements
var timeEl = document.querySelector(".time");
var secondsLeft = 0;
timeEl.textContent = "Time: " + secondsLeft;
var finalSecondsLeft = 0;
var stopTimer = false

// title
var title = document.querySelector("#title");

// quiz intro
var promptEl = document.querySelector("#prompt");

// start button
var startQuiz = document.querySelector("#start-quiz");

// hide choice container until start
var choicesEl = document.querySelector(".choices");
choicesEl.setAttribute("style", "display: none");

// hide completion form until end
var completionForm = document.querySelector(".completion-form");
completionForm.setAttribute("style", "display: none");
// completion text
var completionAlert = document.querySelector("#completion-alert");
var initialsLabel= document.querySelector("#intials-label");
//initialsLabel.setAttribute("hidden", "hidden");
var playerInitials = document.querySelector("#player-initials");
//playerInitials.setAttribute("type", "hidden");
var submitButton = document.querySelector("#submit-button");
//submitButton.setAttribute("type", "hidden");

// hide high score elements until end
var endChoices = document.querySelector(".end-choices")
endChoices.setAttribute("style", "display: none");
var goBack = document.querySelector("#go-back")
var clearScores = document.querySelector("#clear-scores");
var viewHighScores = document.querySelector("#view-highscores");
var scoreTitle = document.querySelector("#score-title");
scoreTitle.setAttribute("style", "display: none");

// choice button variables
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");

// correct/wrong text
var evalAlert = document.querySelector("#eval-alert");
evalAlert.setAttribute("style", "display: none");
var evalText = document.querySelector("#eval-text");

// score text
var playerStats = document.querySelector("#player-stats");
playerStats.setAttribute("style", "display: none");

// Functions
// timer
function setTimer() {
    secondsLeft = 180;
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        timeEl.textContent = "Time: " + secondsLeft;
        if(secondsLeft <= 0 | secondsLeft == finalSecondsLeft | stopTimer) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
        }
        secondsLeft--;
    }, 1000);
}
// display quiz questions
let j = 0;
function quizFunction(i) {
    j = i;
    choicesEl.setAttribute("style", "display: block");
    promptEl.textContent = quizQuestions[i].question;
    choice1.textContent = quizQuestions[i].choices[0];
    choice2.textContent = quizQuestions[i].choices[1];
    choice3.textContent = quizQuestions[i].choices[2];
    choice4.textContent = quizQuestions[i].choices[3];
}
// end or iterate over quiz questions
function endIterateFunction() {
    if (j == quizQuestions.length - 1) {
        finalSecondsLeft = secondsLeft;
        promptEl.setAttribute("style", "display: none");
        choicesEl.setAttribute("style", "display: none");
        evalAlert.setAttribute("style", "display: none");
        completionForm.setAttribute("style", "display: block");
        completionAlert.textContent = "All done! Your final score is: " + finalSecondsLeft;
        //initialsLabel.removeAttribute("hidden");
        //playerInitials.setAttribute("type", "text");
        //submitButton.setAttribute("type", "submit");
    } else if (j < quizQuestions.length - 1) {
        j++;
        quizFunction(j);
    }};
// add high score
function addHighScore() {
    var existingScores = JSON.parse(localStorage.getItem("playerScores"));
    if (existingScores == null) existingScores = [];
    var highScore = {
        "initials":  playerInitials.value,
        "score": finalSecondsLeft, 
    };
    localStorage.setItem("highScore", JSON.stringify(highScore));
    existingScores.push(highScore);
    localStorage.setItem("playerScores", JSON.stringify(existingScores));
};
// render score table
function highScoreTable() {
    var allScores = JSON.parse(localStorage.getItem("playerScores"));
    if (allScores == null) {
        allScores = [];
    };
    allScores.sort(function(a, b) {
        return parseFloat(b.score) - parseFloat(a.score);
    });
    
    playerStats.setAttribute("style", "display: block");

    var tHead = document.createElement('thead');
    var tRow = document.createElement('tr');
    var initialHeader = document.createElement('th');
    initialHeader.appendChild(document.createTextNode("Player"));
    var scoreHeader = document.createElement('th');
    scoreHeader.appendChild(document.createTextNode("Score"));
    
    tRow.appendChild(initialHeader);
    tRow.appendChild(scoreHeader);
    tHead.appendChild(tRow);

    playerStats.appendChild(tHead);

    var tBody = document.createElement('tbody');

    for (let i = 0; i < allScores.length; i++) {
        var tableEntry = document.createElement('tr');
        var initialData = document.createElement('td');
        initialData.appendChild(document.createTextNode(allScores[i].initials));
        var scoreData = document.createElement('td');
        scoreData.appendChild(document.createTextNode(allScores[i].score));
        tableEntry.appendChild(initialData);
        tableEntry.appendChild(scoreData);
        tBody.appendChild(tableEntry);
    }

    playerStats.appendChild(tBody);
}
// Listeners
// start timer
startQuiz.addEventListener("click", function() {
    title.setAttribute("style", "display: none");
    startQuiz.setAttribute("style", "display: none");
    setTimer();
});
// start quiz
startQuiz.addEventListener("click", function() {
    let i = 0;
    quizFunction(i);
})
// evaluate responses
choicesEl.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
        if (element.textContent ==  quizQuestions[j].answer) {
            evalAlert.setAttribute("style", "display: block");
            evalText.textContent = "Correct!";
            endIterateFunction();
        } else if (element.textContent !=  quizQuestions[j].answer) {
            evalAlert.setAttribute("style", "display: block");
            evalText.textContent = "Wrong.";
            secondsLeft = secondsLeft - 10;
            endIterateFunction();
        }
    }
})
// submit initials and score
submitButton.addEventListener("click", function() {
    completionForm.setAttribute("style", "display: none");
    scoreTitle.setAttribute("style", "display: block");
    addHighScore();
    highScoreTable();
    endChoices.setAttribute("style", "display: block");
})
// go back to beginning of page
goBack.addEventListener("click", function() {
    location.reload();
})
// clear scores from view and local storage
clearScores.addEventListener("click", function() {
    localStorage.clear();
    playerStats.setAttribute("style", "display: none");
})
// view high scores
viewHighScores.addEventListener("click", function() {
    stopTimer = true;
    title.setAttribute("style", "display: none");
    promptEl.setAttribute("style", "display: none");
    startQuiz.setAttribute("style", "display: none");
    choicesEl.setAttribute("style", "display: none");
    evalAlert.setAttribute("style", "display: none");
    scoreTitle.setAttribute("style", "display: block");
    playerStats.textContent = "";
    highScoreTable();
    endChoices.setAttribute("style", "display: block");
});
