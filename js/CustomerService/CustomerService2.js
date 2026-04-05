//Sian
//variables (similar to last puzzle)
const hintBTN = document.getElementById("hintBTN");
const hintText = document.getElementById("hintText");
let score = 0; 
let hintUsed = false;

//Starting this puzzle
function startComplaintPuzzle(){
    window.location.href = "CustomerService2.html";
}

//more variables
const complaints = document.querySelectorAll(".complaint");
const zones = document.querySelectorAll(".dropzone");
//looping through the complaints
complaints.forEach(item => {

item.addEventListener("dragstart", dragStart); //for dragging

});

zones.forEach(zone => {

zone.addEventListener("dragover", dragOver); //for dropping
zone.addEventListener("drop", dropItem);

});

let dragged; //variable for the dragged item

function dragStart(){

dragged = this; //what is being dragged

}

function dragOver(e){

e.preventDefault(); //otherwise the browser won't understand what's happening

}

function dropItem(e){ //drop regardless of if it's right

e.preventDefault();

this.appendChild(dragged);

}

//Shuffle the complaints, so they're not in order each time
function shuffleComplaints() {

//variables
const container = document.querySelector(".complaints");
const items = Array.from(container.children);

items.sort(() => Math.random() - 0.5); //https://www.w3schools.com/jsref/jsref_from.asp
//looping
items.forEach(item => container.appendChild(item));

}

//Move to the next puzzle function
function submitPuzzle() {
    const zones = document.querySelectorAll(".dropzone");
    score = 0; //reset the score
    //looping
    zones.forEach(zone => {
        const complaint = zone.querySelector(".complaint");
        //Check if there is something in the zone & if it matches the correct answer
        if (complaint && complaint.id === zone.dataset.answer) {
            score++; //increase the score counter
        }
    });

        //storing the score locally as fail-safe
        localStorage.setItem("p2Score", score);
        localStorage.setItem("p2Total", zones.length);
    
        //go to the next puzzle
        window.location.href = "CustomerService3Instructions.html";

    //Checking the final score after the loop finishes
    /*if (score === 8) {
        alert("Well done! You have completed the Customer Service module.");
        //connecting to feedback page 
        window.location.href = "../feedbackPage.html";
    } else {
        alert("You got " + score + " out of 8 correct. Keep trying to match all complaints!");
    }*/
}

//handling hints
hintBTN.addEventListener("click", showHint);

function showHint() {

    let incorrectFound = false;

    //looping
    zones.forEach(zone => {
        const complaint = zone.querySelector(".complaint");

        if (complaint && complaint.id !== zone.dataset.answer && !incorrectFound) {

            hintText.textContent = "One of your matches is incorrect. Think about how to respond professionally to: " + complaint.textContent;

            incorrectFound = true;

            if (!hintUsed) {
                score -= 0.5; //decrease the score counter
                hintUsed = true;
            }
        }
    });

    if (!incorrectFound) {
        hintText.textContent = "Some situations are similar. Check the tone and the professionalism, in regards to the situation.";
    }

}

shuffleComplaints();

//reset the hints
hintUsed = false;
hintText.textContent = "";