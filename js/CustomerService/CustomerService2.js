function startComplaintPuzzle(){
window.location.href = "CustomerService2.html";
}

const complaints = document.querySelectorAll(".complaint");
const zones = document.querySelectorAll(".dropzone");

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

e.preventDefault();

}

function dropItem(e){ //drop regardless of if it's right

e.preventDefault();

this.appendChild(dragged);

}

//Shuffle the complaints, so they're not in order
function shuffleComplaints() {

const container = document.querySelector(".complaints");
const items = Array.from(container.children);

items.sort(() => Math.random() - 0.5); //https://www.w3schools.com/jsref/jsref_from.asp

items.forEach(item => container.appendChild(item));

}

//Move to the next puzzle function
function submitPuzzle() {
    const zones = document.querySelectorAll(".dropzone");
    let score = 0; //Reset score each time they submit

    zones.forEach(zone => {
        const complaint = zone.querySelector(".complaint");
        // Check if there is something in the zone AND if it matches the correct answer
        if (complaint && complaint.id === zone.dataset.answer) {
            score++;
        }
    });

    //Checking the final score after the loop finishes
    if (score === 8) {
        alert("Well done! You have completed the Customer Service module.");
        //connecting to feedback page 
        window.location.href = "../feedbackPage.html";
    } else {
        alert("You got " + score + " out of 8 correct. Keep trying to match all complaints!");
    }
}

shuffleComplaints();