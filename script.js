// var page1 = document.querySelector("#page1");
// var page2 = document.querySelector("#page2");
// var page3 = document.querySelector("#page3");
// var page4 = document.querySelector("#page4");
// var page5 = document.querySelector("#page5");
// var page6 = document.querySelector("#page6");
// var page7 = document.querySelector("#page7");
// var btnn1 = document.querySelector(".button1");
// var btnn2 = document.querySelector(".button2");
// var btnn2a = document.getElementsByClassName(".button2a");
// var btnn3 = document.querySelectorAll(".button2");
// var btnn3a = document.querySelectorAll(".button3a");
// var btnn4 = document.querySelectorAll(".button4");
// var btnn4a = document.querySelectorAll(".button4a");
// var btnn5= document.querySelectorAll(".button5");
// var btnn5a = document.querySelectorAll(".button5a");
// var peopleList = document.querySelector("#people-list");
// const startingtime = 2;
// let time = startingtime * 60;
// const timer = document.querySelector("time");
// var score = 0;
// var x = 0;



// //for(var i = 0; i < btnn2a.length; i++){
//   // btnn2a[i].addEventListener("click", penalty);
// //}

// function next(){ //--------------page functions

// }



// function countdown(){ //------------timer
//     //setup
//     const minutes = Math.floor(time/60);
//     let seconds = time % 60;
//     console.log(seconds);
//     if(seconds<10){
//         seconds = '0' + seconds;
//     }

//     //print
//     if(time < 0){
//         //clearInterval(countdown);
//         //minutes = 0;
//         //seconds = 0;
//         seconds = '0' + seconds;
//         score = time;
//     }
//     else{
//         document.getElementById('time').innerHTML=`${minutes}:${seconds}`;
//     }
//     time--;

// }
// setInterval(countdown,1000);

// //penalty
// function penalty(btn){
//     time = time - 20;
//     clrchange(0,btn)
//     if(time < 20){
//         time = 0;
//         clearInterval(countdown, 0);
//         console.log("yo");
//     }
//     console.log("yo");
// }; 

// // btnn2.addEventListener("click", penalty(".button2"));
// // btnn3.addEventListener("click", penalty(".button3"));
// // btnn4.addEventListener("click", penalty(".button4"));
// // btnn5.addEventListener("click", penalty(".button5"));


// //color change
// function clrchange(x,btn){
//     if(x == 1){

//        return document.querySelector(btn).style.background = "green";
//     }
//     if(x == 0){
//         document.querySelectorall(btn).forEach(function(el){
//             el.classList.style.background = "red"
//         })
//         // return document.querySelectorall(btn).style.background = "red";
//     }
// }

//varS
var startButton = document.getElementById("start-btn");
var timeEl = document.querySelector(".timer");
var container = document.querySelector(".container");
var lastUserContainer = document.querySelector("#lastUser-Container");
var saveDiv = document.querySelector(".save-div");
var saveBtn = document.querySelector("#save");
var seconds = 60;
var questionIndex = 0;
var wrong = false;
var correct = 0;
var quizContainer = document.querySelector("#quizContainer");
var myQuestions = [
  {
    question: "What is the correct way to print hello world in html",
    answerIndex: 2,
    choices: [
      "system.out.printn('Hello World');",
      "01101000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100",
      "<p>Hello World</p>",
      "print('Hello World')",
    ],
  },
  {
    question: "Which is the correct way to declare a var in js?",
    answerIndex: 1,
    choices: ["declare a var. please.", "var num = 0;", "Post it on your insta profile", "cheesy pizza"],
  },
  {
    question: "What is this: <Div>",
    answerIndex: 3,
    choices: [
      "A fancy URL",
      "Its short for derivative",
      "Its a dividend ETF ticker symbol",
      "An Html tag",
    ],
  },
  {
    question: "Coding is ___",
    answerIndex: 2,
    choices: [
      "Boring",
      "Hard",
      "Fun",
      "Soul Eating",
    ],
  },
  {
    question: "What is Git?",
    answerIndex: 0,
    choices: [
      "A version control tool",
      "Something your grandpa tells a racoon eating his trash, 'GO GIT'",
      "Gender Integrated Training",
      "Never gona Git you up, never gona Git you down, Never gona turn around and Git you",
    ],
  },
  {
    question:
      "Complete the order: git add, git commit, ____",
    answerIndex: 1,
    choices: [
      "Drop",
      "git push",
      "npm install",
      "shutdown /s",
    ],
  },
];

function startQuiz() {
  startButton.classList.add("hide");
  setTime();
  showNextQuestion();
}

function setTime() {
  var timerInterval = setInterval(function () {
    seconds--;
    timeEl.textContent = "You have " + seconds + " seconds left";

    if (wrong === true) {
      seconds = seconds - 10;
      wrong = false;
      return seconds;
    }
    if (seconds <= 0 || questionIndex > 5) {
      clearInterval(timerInterval);
      highScores();
    }
  }, 1000);
}

function showNextQuestion() {
  if (questionIndex <= 5) {
    quizContainer.textContent = "";

    var questionTag = document.createElement("h1");
    quizContainer.appendChild(questionTag);
    questionTag.textContent = myQuestions[questionIndex].question; 


    var choiceListTag = document.createElement("ul");
    quizContainer.appendChild(choiceListTag);

    for (var i = 0; i < myQuestions[questionIndex].choices.length; i++) {
      var choiceTag = document.createElement("li");
      choiceListTag.appendChild(choiceTag);

      var button = document.createElement("button");
      choiceTag.appendChild(button);
      choiceTag.style.width = "fit-content";
      button.textContent = myQuestions[questionIndex].choices[i]; 


      button.setAttribute("data-index", i);
      var index = parseInt(button.getAttribute("data-index"));

      if (index === myQuestions[questionIndex].answerIndex) {
        choiceListTag.addEventListener("click", function (event) {
          document.getElementById("alert-msg").textContent = "WRONG!!!";
          event.stopPropagation();
          wrong = true;
          questionIndex++;
          showNextQuestion();
        });

        button.addEventListener("click", function (event) {
          document.getElementById("alert-msg").textContent = "CORRECT!!!";
          event.stopPropagation();
          correct++;
          questionIndex++;
          showNextQuestion();
        });
      }
    }
  }
}

function displayMessage(type, message) {
  saveDiv.textContent = message;
  saveDiv.setAttribute("class", type);
}

function highScores() {
  container.classList.add("hide");
  lastUserContainer.classList.remove("hide");
  renderLastUser();
  document.getElementById("yourScore").textContent =
    "Your Score is " + correct + "/6";
}


function renderLastUser() {
  var storage = JSON.parse(localStorage.getItem("last-user-score"));
  for (var i = 0; i < storage.length; i++) {
    console.log(storage[i]);
    document.getElementById("lastUserScore").textContent = storage[i];
  }
}

saveBtn.addEventListener("click", function (event) {
  event.preventDefault();

  var userInitials = document.querySelector(".initials").value;

  if (userInitials === "") {
    displayMessage("error", "Please, enter your initials");
  } else {
    displayMessage("success", "Score saved!");

    var userScore = userInitials + " " + correct + "/6";
    var storage = JSON.parse(localStorage.getItem("last-user-score"));
    storage.push(userScore);
    localStorage.setItem("last-user-score", JSON.stringify(storage));

    renderLastUser();
  }
});

startButton.addEventListener("click", startQuiz);
document
  .getElementById("play-again")
  .addEventListener("click", function (event) {
    console.log(event.target);
    location.reload();
  });

if (localStorage.getItem("last-user-score") === null) {
  localStorage.setItem("last-user-score", JSON.stringify([]));
}