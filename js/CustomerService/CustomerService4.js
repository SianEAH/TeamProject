//Sian
//variables
let timeLeft = 10;
let timer;

//Starting my puzzle
function startRapidFirePuzzle(){
    window.location.href = "CustomerService4.html";
}

const questions = [
  {
    question: "What is the best response to an angry and irritated customer?",
    answers: [
      "Calmly listen and offer help",
      "Ignore them",
      "Tell them to relax & chill",
      "End the conversation and walk away"
    ],
    correct: 0
  },
  {
    question: "What should you do if you don't know the answer to a customer problem?",
    answers: [
      "Guess and risk giving them the wrong answer",
      "Ask someone else at work",
      "Ignore the customer because you feel awkward",
      "Say it's not your job and that you can't know everything"
    ],
    correct: 1
  },
  {
    question: "Which of these answers shows unprofessional conduct?",
    answers: [
      "Being polite",
      "Using rude language",
      "Offering help",
      "Apologising"
    ],
    correct: 1
  },
  {
    question: "What should you do if you spill something in front of a customer?",
    answers: [
      "Curse",
      "Clean it up and not say anything",
      "Apologise and clean it up",
      "Leave it for your friend because you're about to clock out"
    ],
    correct: 2
  },
  {
    question: "How should you handle a situation with another employee or manager?",
    answers: [
      "Get in their face",
      "Ask a friend for advice",
      "Quit your job because you don't get paid enough for this",
      "Go to human resources, or someone higher up or an ombudsman"
    ],
    correct: 3
  },
  {
    question: "Your manager is trying to make you come in for a shift on short notice",
    answers: [
      "Set your boundaries, if you can't make it",
      "Go in and work",
      "Report them",
      "Ask a friend to do it for you"
    ],
    correct: 0
  },
  {
    question: "How should you handle a situation where you believe a customer has stolen something?",
    answers: [
      "Chase after them",
      "Go to the local security in the shop",
      "Call the police right away",
      "Let them get away"
    ],
    correct: 1
  }
];

//more variables
let currentQuestion = 0;
let score = 0;

//Loading a question, similar to puzzle 1
function loadQuestion() {

  const q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;

  const buttons = document.querySelectorAll(".answerBTN");

  //get the index of the answer (looping)
  buttons.forEach((btn, index) => {
    btn.innerText = q.answers[index];
    btn.onclick = () => selectAnswer(index);
  });

  startTimer(); //call my timer function
}

//handling the answer the user selects
function selectAnswer(selectedIndex) {

  clearInterval(timer); //stop the timer when an answer is selected

  const correctIndex = questions[currentQuestion].correct;

  if (selectedIndex === correctIndex) {
    score++; //increase the score counter
  }

  setTimeout(() => {
    currentQuestion++; //increase the currentQuestion counter

    if (currentQuestion < questions.length) {
      loadQuestion(); //keeping loading questions until there is no more
    } else {
      endQuiz(); //call my endQuiz function
    }
  }, 300); //create a small delay so the feel is better
}

//Ending the module
async function endQuiz() {

    //handling the timer
    let startTime = parseInt(localStorage.getItem("moduleStartTime")); //getting the start time from local storage

    if (!startTime || isNaN(startTime)) {
        startTime = Date.now(); //fallback so it doesn't break
    }

    //timer variables
    let endTime = Date.now();
    let totalTime = Math.floor((endTime - startTime) / 1000);

    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    let formattedTime = `${minutes}m ${seconds}s`; //putting it in minutes/seconds

    localStorage.setItem("timeTaken", formattedTime); //put the time in local storage

    //save this puzzle's score in local storage
    localStorage.setItem("p4Score", score);
    localStorage.setItem("p4Total", questions.length);

    //combine all the puzzle scores from all the puzzles in local storage
    //0 added for fail-safe
    let totalScore =
        (parseInt(localStorage.getItem("p1Score")) || 0) +
        (parseInt(localStorage.getItem("p2Score")) || 0) +
        (parseInt(localStorage.getItem("p3Score")) || 0) +
        (parseInt(localStorage.getItem("p4Score")) || 0);

    let totalQuestions =
        (parseInt(localStorage.getItem("p1Total")) || 0) +
        (parseInt(localStorage.getItem("p2Total")) || 0) +
        (parseInt(localStorage.getItem("p3Total")) || 0) +
        (parseInt(localStorage.getItem("p4Total")) || 0);

    let percentage = Math.round((totalScore / totalQuestions) * 100);

    localStorage.setItem("finalScore", percentage); //putting it in local storage

    //must be greater than 90 to pass
    if (percentage >= 90) {

    //store the certificates in the certificates tab
    let certificates = JSON.parse(localStorage.getItem("certificates")) || [];

    certificates.push({
        module: localStorage.getItem("currentModuleName"),
        score: percentage,
        date: new Date().toLocaleDateString(),
        id: crypto.randomUUID() //Crypto: randomUUID() method - Web APIs | MDN
                                //https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
    });
    //store the cert in local storage as fail-safe
    localStorage.setItem("certificates", JSON.stringify(certificates));
    }

    //save to my feedback history
    let feedbackHistory = JSON.parse(localStorage.getItem("feedbackHistory")) || [];

    feedbackHistory.push({
        module: localStorage.getItem("currentModuleName"),
        score: percentage,
        time: totalTime + "s",
        passed: percentage >= 90,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("feedbackHistory", JSON.stringify(feedbackHistory));

try {
  const referenceID = localStorage.getItem("referenceID");

  if (referenceID) {

    await fetch("http://localhost:4000/api/user/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        moduleName: localStorage.getItem("currentModuleName"),
        referenceID: referenceID
      })
    });

  } else {
    console.log("User not logged in. Backend cannot be updated at this time.");
  }

} catch (err) { //error handling
  console.error("Error changing the module completion status: " + err);
}

    //go to feedback modal
    window.location.href = "../feedback.html";
}

//Start my timer for puzzle 
function startTimer() {

  timeLeft = 10; //10 seconds
  document.getElementById("timer").innerText = "Time: " + timeLeft; //display it

  timer = setInterval(() => { //JavaScript Timing Events
                              //https://www.w3schools.com/js/js_timing.asp

    timeLeft--; //decrease the timer
    document.getElementById("timer").innerText = "Time: " + timeLeft; //display it
    //if there's no time left, clear the timer and run my noTimeLeft function
    if (timeLeft === 0) {
      clearInterval(timer);
      noTimeLeft();
    }

  }, 1000);
}

//When a user runs out of time
function noTimeLeft() {
  currentQuestion++; //increase the currentQuestion

  if (currentQuestion < questions.length) {
    loadQuestion(); //load the next question if there's more
  } else {
    endQuiz(); //or end the quiz
  }
}

loadQuestion(); //call my function