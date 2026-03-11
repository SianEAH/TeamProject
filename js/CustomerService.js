function startPuzzle(){

window.location.href = "CustomerService.html"; //https://www.w3schools.com/js/js_window_location.asp

}

//Puzzle 1 Content
const questions = [ //store questions & answers in an Array

{
question: "A customer walks into the shop looking confused and unsure of where to go. How should you greet them?",
answers: [
"What do you need?",
"Hi there, welcome! Let me know if I can help you find anything.",
"Yeah? What do you want?",
"Hello. Yell if you need me."
],
correct: 1 //the correct answer number, index 1
},

{
question: "A customer approaches the counter with a product in hand.",
answers: [
"Hello! How can I help you today?",
"What?",
"You're in the wrong queue.",
"Put it over there."
],
correct: 0
},

{
question: "A customer enters the store while you are organising shelves.",
answers: [
"Wait a minute. I'm busy!",
"Can't you see I'm busy?",
"Hi! Welcome, I'll be with you as soon as I can.",
"Go to the desk up front."
],
correct: 2
},

{
question: "A customer walks into the shop you're working in and you are busy helping another customer.",
answers: [
"Wait your turn. Can't you see I'm busy?",
"I'm busy right now.",
"Go ask someone else in the shop, please.",
"Hello! I’ll be with you in just a moment. Let me just finish helping this gentleman and I'll be with you shortly."
],
correct: 3
},

{
question: "A customer enters the store looking around, looking a little confused but hasn’t approached staff yet.",
answers: [
"Do you need something, sir?",
"Hi there! Welcome to our store. Let me know if you need any help with anything.",
"Silence.",
"Everything is on the shelves."
],
correct: 1
},

{
question: "A customer approaches you while you are restocking products and trying to get ahead on some work for tomorrow.",
answers: [
"What is it?",
"Can't you see I'm busy, sir?",
"Ask the front desk. I'm busy at the moment.",
"Hello! How can I help you today?"
],
correct: 3
}

];

let currentQuestion = 0; //keeping track of the current question
let score = 0;

const questionText = document.getElementById("questionText");
const answerButtons = document.querySelectorAll(".answerBTN");

function loadQuestion(){

let q = questions[currentQuestion]; //grabbing the currentQuestion object

questionText.textContent = q.question;

answerButtons.forEach((btn, index) => { //looping through the answers
btn.textContent = q.answers[index]; //adds the answers to the buttons
btn.disabled = false; //make sure we can click the buttons again
});

}

function checkAnswer(index){ //checking the user answer after a answer click

let correctIndex = questions[currentQuestion].correct; //finds the correct answer index

if(index === correctIndex){ //if it's correct, increase the score

score++;

} 
answerButtons.forEach(btn => btn.disabled = true);

}

function nextQuestion(){

currentQuestion++; //increase our question counter

if(currentQuestion < questions.length){ //if there's more questions, load the questions

loadQuestion();

} else {

window.location.href = "#"; //go to the next puzzle

}

}

loadQuestion();