//Sian
//variables
const hintBTN = document.getElementById("hintBTN");
const hintText = document.getElementById("hintText");

let hintLevel = 0;
let hintUsed = false;
let score = 0;

//Transition Video Variables
const overlay = document.getElementById("transitionOverlay");
const video = document.getElementById("transitionVideo");

//Starting my puzzle
function startMistakesPuzzle(){
    window.location.href = "CustomerService3.html";
}

//another variable
const lines = document.querySelectorAll(".line");
//looping through the lines
lines.forEach(line => {
    line.addEventListener("click", () => {
        line.classList.toggle("selected");
    });
});

//Submit button
document.getElementById("submitMistakesPuzzle").addEventListener("click", function () {

    score = 0; //reset the score
    //let totalBad = document.querySelectorAll(".line.employee.bad").length;

    //looping through the dialogue lines
    document.querySelectorAll(".line.employee").forEach(line => {
        //if it's a "bad" line & it's selected increase the score counter
        if (line.classList.contains("bad") && line.classList.contains("selected")) {
            score++;
        }

    });

    //prevent the scoring from breaking
    if (score < 0) score = 0;

    //Save score to local storage
    localStorage.setItem("p3Score", score);

    let totalBad = document.querySelectorAll(".line.employee.bad").length;
    localStorage.setItem("p3Total", totalBad);

    //Play transition video
    overlay.classList.remove("hidden");
    video.currentTime = 0;
    video.play();

});

//Hints
hintBTN.addEventListener("click", showHint);

function showHint() {

    if (hintLevel === 0) {
        hintText.textContent = "Look for responses where the employee is rude, dismissive, or unhelpful.";
    } 
    else if (hintLevel === 1) {
        hintText.textContent = "This dialogue contains both good and bad dialogue";
    } 
    else if (hintLevel === 2) {
        hintText.textContent = "There are 3 incorrect responses in this conversation.";
    } 

    if (!hintUsed) {
        hintUsed = true;
        score -= 0.5;
    }

    hintLevel++; //increase the hint level counter
}

//When my transition video ends
video.addEventListener("ended", () => {

  overlay.classList.add("hidden");

  //Move to final puzzle
  window.location.href = "CustomerService4Instructions.html";

});

//resetting the hint system
hintLevel = 0;
hintUsed = false;
hintText.textContent = "";