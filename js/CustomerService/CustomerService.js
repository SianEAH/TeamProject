//Sian
//Video Transition
const overlay = document.getElementById("transitionOverlay");
const video = document.getElementById("transitionVideo");

let pendingAction = null; //what should happen after video

//Start Puzzle
function startPuzzle(){

    window.location.href = "CustomerService.html"; //https://www.w3schools.com/js/js_window_location.asp
    localStorage.setItem("moduleStartTime", Date.now()); //store the global timer in local storage
    localStorage.removeItem("finalScore"); //get rid of any final score that remains in the system
}

//Puzzle 1 Content
const questions = [ //store questions & answers in an Array (+hints)

{
question: "A customer walks into the shop looking confused and unsure of where to go. How should you greet them?",
answers: [
"What do you need?",
"Hi there, welcome! Let me know if I can help you find anything.",
"Yeah? What do you want?",
"Hello. Yell if you need me."
],
correct: 1, //the correct answer number, index 1
hint: "Look for a correct greeting"
},

{
question: "A customer approaches the counter with a product in hand.",
answers: [
"Hello! How can I help you today?",
"What?",
"You're in the wrong queue.",
"Put it over there."
],
correct: 0,
hint: "Check for response length"
},

{
question: "A customer enters the store while you are organising shelves.",
answers: [
"Wait a minute. I'm busy!",
"Can't you see I'm busy?",
"Hi! Welcome, I'll be with you as soon as I can.",
"Go to the desk up front."
],
correct: 2,
hint: "Check for polite greeting"
},

{
question: "A customer walks into the shop you're working in and you are busy helping another customer.",
answers: [
"Wait your turn. Can't you see I'm busy?",
"I'm busy right now.",
"Go ask someone else in the shop, please.",
"Hello! I’ll be with you in just a moment. Let me just finish helping this gentleman and I'll be with you shortly."
],
correct: 3,
hint: "Check for response length"
},

{
question: "A customer enters the store looking around, looking a little confused but hasn’t approached staff yet.",
answers: [
"Do you need something, sir?",
"Hi there! Welcome to our store. Let me know if you need any help with anything.",
"Silence.",
"Everything is on the shelves."
],
correct: 1,
hint: "Check the employee greeting"
},

{
question: "A customer approaches you while you are restocking products and trying to get ahead on some work for tomorrow.",
answers: [
"What is it?",
"Can't you see I'm busy, sir?",
"Ask the front desk. I'm busy at the moment.",
"Hello! How can I help you today?"
],
correct: 3,
hint: "Check employee tone"
}

];

//variables
let currentQuestion = 0; //keeping track of the current question
let score = 0; //start the score at 0
let hintUsed = false; //no hints are used on start-up

const hintText = document.getElementById("hintText"); //where the hint is going
const hintBTN = document.getElementById("hintBTN");

const questionText = document.getElementById("questionText");
const answerButtons = document.querySelectorAll(".answerBTN");

//Load an individual question
function loadQuestion(){

let q = questions[currentQuestion]; //grabbing the currentQuestion object

questionText.textContent = q.question; //put the question in

answerButtons.forEach((btn, index) => { //looping through the answers
btn.textContent = q.answers[index]; //adds the answers to the buttons
btn.disabled = false; //make sure we can click the buttons again
hintText.textContent = ""; //clear the hint field (just in case it's clicked)
hintUsed = false; //set the hint used back to false
});

}

//Checking the answer
function checkAnswer(index){ //checking the user answer after a answer click

let correctIndex = questions[currentQuestion].correct; //finds the correct answer index

if(index === correctIndex){ //if it's correct, increase the score

    score++;

} 
answerButtons.forEach(btn => btn.disabled = true); //then disable the buttons

}

//Going to the next question
function nextQuestion(){

  currentQuestion++; //increase the currentQuestion counter

  //if there's more questions, go through the questions
  if(currentQuestion < questions.length){
    loadQuestion();
    return;
  }

  //on the last question, play transition video
  overlay.classList.remove("hidden");
  video.currentTime = 0;
  video.play();

}

//Hint Button
hintBTN.addEventListener("click", showHint);

function showHint() {

    if (!hintUsed) {
        hintText.textContent = questions[currentQuestion].hint;

        hintUsed = true;

        score -= 0.5; //decrease the score counter

    } 

}

//When the video ends
video.addEventListener("ended", () => {

  overlay.classList.add("hidden");

  //Save score to local storage
  localStorage.setItem("p1Score", score);
  localStorage.setItem("p1Total", questions.length);

  //Go to next puzzle instructions
  window.location.href = "CustomerService2Instructions.html";

});

loadQuestion();