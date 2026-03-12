//Resources used:
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event

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
function submitPuzzle(){

const zones = document.querySelectorAll(".dropzone");

zones.forEach(zone => {

const complaint = zone.querySelector(".complaint");

if(complaint && complaint.id === zone.dataset.answer){ //check for correct matches

score++; //increase the score counter

}

});

window.location.href = "CustomerService3Instructions.html";

}

shuffleComplaints();