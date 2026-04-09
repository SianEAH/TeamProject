//Original code by Sian, modified by Roberto for Fire Safety module
//Start Puzzle
function startPuzzle(){

    window.location.href = "FireSafety.html"; //https://www.w3schools.com/js/js_window_location.asp
    localStorage.setItem("moduleStartTime", Date.now()); //store the global timer in local storage
    localStorage.removeItem("finalScore"); //get rid of any final score that remains in the system
}

//Puzzle 1 Content
const questions = [ //store questions & answers in an Array (+hints)

{
question: "You notice flames coming from a nearby paper waste bin.",
answers: [
"Immediately douse the bin with a bottle of water.",
"Raise the alarm, evacute people from the room and use the appropriate fire extinguisher if it is safe to do so.",
"Ignore it if it doesn't seem serious and assume someone else will deal with it.",
"Open the windows to let the smoke out."
],
correct: 1, //the correct answer number, index 1
hint: "Everyone's safety is your top priority, above all else."
},

{
question: "A fire alarm goes off in your building.",
answers: [
"Assume its a drill and keep working.",
"Finish whatever you're up to before evacuating.",
"Immediately evacuate using the nearest safe exit.",
"Make sure you gather up all your things before leaving, in case it gets damaged by the fire."
],
correct: 2,
hint: "Every second could count in the event of a serious fire."
},

{
question: "You open a door and notice thick smoke in the hallway ahead of you.",
answers: [
"Try to rush through while holding your breath.",
"Try to find the lift for a faster escape.",
"Get low and crawl through the smoke to the exit.",
"Close the door and try to find an alternate escape route."
],
correct: 3,
hint: "You should always try to find the safest possible escape route."
},

{
question: "You're at a campsite and notice someone's clothes have ignited from the fire.",
answers: [
"Tell them to run and get help.",
"Run to your tent and use the fire extinguisher inside directly on them.",
"Tell them to immediately stop, drop and roll.",
"Rummage in your bag for your bottle of water to douse the flames."
],
correct: 2,
hint: "Every second wasted risks your friend getting burned!"
},

{
question: "You notice that fire exit has been obstructed with some heavy objects during an evacuation.",
answers: [
"Try to find an alternative, clear fire exit.",
"Stand by the exit and wait for assistance.",
"Spend time trying to clear the obsctruction.",
"Yell for others to come help you move the objects out of the way."
],
correct: 0,
hint: "Remember, in an emergency, every second could count."
},

{
question: "You are about to use a fire extinguisher on a safe to put out fire.",
answers: [
"Stand as close to the fire as possible to avoid missing.",
"Aim towards the base of the fire from a safe distance and spray continuously.",
"Aim directly at the flames from a safe distance and spray continuously.",
"Spray in short bursts to avoid wasting the extinguisher."
],
correct: 1,
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

currentQuestion++; //increase our question counter

if(currentQuestion < questions.length){ //if there's more questions, load the questions

loadQuestion();

} else {
    //set the score for puzzle 1 in local storage as fail-safe
    localStorage.setItem("p1Score", score);
    localStorage.setItem("p1Total", questions.length);

    window.location.href = "FireSafety2Instructions.html"; //go to the next puzzle

}

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

loadQuestion();