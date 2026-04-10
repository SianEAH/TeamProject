//Hamza
//Station 404 Breach - puzzle logic for the 3 layers

//Numbers we capture as the player goes, used by the Layer 3 maths
let stationNumber = null;
let emailCount    = null;
const roomNumber  = 101; //painted on the door

//Layer 1 - The Desk
const stationName     = "BRoom"; //from the phone sticker
const maintenanceDate = 27;      //from the calendar
const expectedLogin   = stationName + maintenanceDate;

//Show a clue card when the matching desk item is clicked.
//Cards stay pinned once revealed so the player can re-read them.
function showClue(item) {
    if (item === "phone")    document.getElementById("cluePhone").classList.remove("hidden");
    if (item === "calendar") document.getElementById("clueCalendar").classList.remove("hidden");
    if (item === "laptop")   document.getElementById("clueLaptop").classList.remove("hidden");
}

//Try the login - this is what unlocks Layer 2
function tryUnlock() {
    const input  = document.getElementById("layer1Input").value.trim();
    const result = document.getElementById("layer1Result");

    //case-insensitive so capital letters don't matter
    if (input.toLowerCase() === expectedLogin.toLowerCase()) {
        result.textContent = "Access granted.";
        result.style.color = "green";

        //Capture the station number into the clues sidebar
        stationNumber = maintenanceDate;
        markClueCaptured("clueStation", stationNumber);

        //small pause so the player sees the success text before we swap views
        setTimeout(() => showLayer(2), 700);
    } else {
        result.textContent = "Wrong ID. Re-read the phone and calendar clues.";
        result.style.color = "red";
    }
}

//Layer 2 - The Inbox
//3 emails - 1 legit memo, 2 phishing
const emails = [
    {
        from: "it-security@bank-secure-verify.co",
        subject: "URGENT: Suspicious activity on your account",
        body:
"Dear Valued Customer,\n\n" +
"We have detected SUSPICIOUS LOGIN ACTIVITY on your bank account from an " +
"unrecognised device located in another country. To prevent your account " +
"from being permanently SUSPENDED within the next 24 hours, you must " +
"immediately verify your full card details, PIN, and online banking " +
"password by clicking the secure link below.\n\n" +
"http://bank-secure-verify.co/login-now\n\n" +
"Failure to act now will result in IRREVERSIBLE account closure.\n\n" +
"Regards,\nThe Security Team",
        isPhishing: true
    },
    {
        from: "h.morgan@yourcompany.com",
        subject: "Memo: Door override procedure for the audit",
        body:
"Hi team,\n\n" +
"Quick reminder for tomorrow's compliance audit. The auditors will need " +
"to access Station 404 in person, so I've left a procedure here for the " +
"door override:\n\n" +
"  Door Code = (Station Number) + (Number of emails in this inbox) + (Room Number on the door)\n\n" +
"All three numbers should be visible to anyone actually sitting at the " +
"workstation. Please don't write the final number down anywhere - work it " +
"out on the spot when you need it.\n\n" +
"Thanks,\nHelen Morgan\nFacilities & Security",
        isPhishing: false //THIS is the safe one with the hint
    },
    {
        from: "prizes@mega-rewards-club.biz",
        subject: "🎉 Congratulations! You've been selected!",
        body:
"CONGRATULATIONS LUCKY WINNER!!!\n\n" +
"You have been randomly selected from over 10 million users to receive " +
"a brand new iPhone 15 Pro Max ABSOLUTELY FREE. This offer is only " +
"valid for the next 60 minutes.\n\n" +
"To claim your prize simply click the link below and enter your home " +
"address, date of birth, and a small £1.99 delivery fee using any " +
"credit card:\n\n" +
"http://mega-rewards-club.biz/claim-now\n\n" +
"Don't miss out! Thousands of others have already claimed their prizes!",
        isPhishing: true
    }
];

let openEmailIndex = null; //which email the player is currently reading
let triagedCount   = 0;     //how many they've handled correctly so far

//Fisher-Yates shuffle so the safe email isn't always in the same slot
//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; //swap
    }
}

//Render the inbox list - called once when Layer 2 first appears
function renderInbox() {
    const list = document.getElementById("emailList");
    list.innerHTML = ""; //clear it just in case

    emails.forEach((email, index) => {
        const li = document.createElement("li");
        //subject + sender preview, like a real email client
        li.innerHTML = email.subject +
                       "<span class='emailFromPreview'>" + email.from + "</span>";
        li.onclick = () => openEmail(index);
        list.appendChild(li);
    });
}

//Show the body of the email the player just clicked
function openEmail(index) {
    openEmailIndex = index;
    const email = emails[index];

    document.getElementById("emailSubject").textContent = email.subject;
    document.getElementById("emailFrom").textContent    = "From: " + email.from;
    document.getElementById("emailContent").textContent = email.body;
    document.getElementById("emailButtons").classList.remove("hidden");
}

//Player clicks Report Phish or Mark Safe
function triageEmail(reportedAsPhish) {
    if (openEmailIndex === null) return; //nothing selected, ignore

    const email  = emails[openEmailIndex];
    const status = document.getElementById("layer2Status");

    //Was the player right? They were right if their answer matches isPhishing
    if (reportedAsPhish === email.isPhishing) {
        //mark this li as triaged so they can't double-count it
        const items = document.querySelectorAll("#emailList li");
        items[openEmailIndex].classList.add("triaged");
        items[openEmailIndex].onclick = null; //disable further clicks

        triagedCount++;
        status.textContent = "Correct (" + triagedCount + "/3)";
        status.style.color = "green";

        //hide the body panel buttons until they pick another email
        document.getElementById("emailButtons").classList.add("hidden");
        openEmailIndex = null;

        //all 3 sorted? unlock Layer 3
        if (triagedCount === emails.length) {
            emailCount = emails.length; //captured for the maths
            markClueCaptured("clueEmails", emailCount);

            status.textContent = "Inbox cleared. Door override unlocked.";
            setTimeout(() => showLayer(3), 900);
        }

    } else {
        //wrong call - tell them but don't progress, makes them re-read
        status.textContent = "That call was wrong. Re-read the email carefully.";
        status.style.color = "red";
    }
}

//Layer 3 - The Keypad
let typedCode = ""; //what the player has typed so far

function pressKey(digit) {
    //don't let them type a stupid number of digits
    if (typedCode.length >= 4) return;
    typedCode += digit;
    document.getElementById("codeDisplay").textContent = typedCode;
}

function clearCode() {
    typedCode = "";
    document.getElementById("codeDisplay").textContent = "";
}

//The win check - does the local maths AND asks the backend to confirm
async function verifyCode() {
    const display = document.getElementById("codeDisplay");
    const result  = document.getElementById("layer3Result");

    //local sanity check first - the maths should match
    const expected = stationNumber + emailCount + roomNumber; //27 + 3 + 101 = 131
    if (Number(typedCode) !== expected) {
        //flash red and let them try again
        display.classList.add("flashRed");
        result.textContent = "Wrong code. Check the Clues Collected sidebar and try again.";
        result.style.color = "red";
        setTimeout(() => {
            display.classList.remove("flashRed");
            clearCode();
        }, 700);
        return;
    }

    //local check passed, now ask the backend to confirm
    try {
        const referenceID = localStorage.getItem("referenceID");
        const verifyRes = await fetch("http://localhost:4000/api/puzzles/networkBreach/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: Number(typedCode), referenceID: referenceID })
        });

        if (!verifyRes.ok) {
            //backend disagreed somehow, treat as a failure
            display.classList.add("flashRed");
            result.textContent = "Server rejected the code.";
            result.style.color = "red";
            return;
        }

        //win path - flash green and mark the module complete in the locker
        display.classList.add("flashGreen");
        result.textContent = "Door unlocked! Module complete.";
        result.style.color = "green";

        //Same finalScore / timeTaken pattern Customer Service uses, so the
        //feedback page and the certificate page can populate themselves.
        const startTime = parseInt(localStorage.getItem("moduleStartTime"), 10) || Date.now();
        const totalSeconds = Math.round((Date.now() - startTime) / 1000);
        localStorage.setItem("finalScore", "100"); //pass/fail puzzle - any win is 100
        localStorage.setItem("timeTaken", totalSeconds + "s");

        //Same /api/user/complete call the other puzzles use,
        //so the locker reflects the win on the dashboard.
        if (referenceID) {
            await fetch("http://localhost:4000/api/user/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    moduleName: localStorage.getItem("currentModuleName"),
                    referenceID: referenceID
                })
            });
        } else {
            console.log("No referenceID in localStorage - not updating backend.");
        }

        //small pause then send them to the feedback page
        setTimeout(() => {
            window.location.href = "feedback.html";
        }, 1500);

    } catch (err) {
        console.error("Network breach verify error:", err);
        result.textContent = "Could not reach the server. Is the backend running on port 4000?";
        result.style.color = "red";
    }
}

//Swap which layer is visible
function showLayer(n) {
    //hide all three, then show the one we want
    document.getElementById("layer1Desk").classList.add("hidden");
    document.getElementById("layer2Inbox").classList.add("hidden");
    document.getElementById("layer3Keypad").classList.add("hidden");

    if (n === 1) document.getElementById("layer1Desk").classList.remove("hidden");
    if (n === 2) document.getElementById("layer2Inbox").classList.remove("hidden");
    if (n === 3) {
        document.getElementById("layer3Keypad").classList.remove("hidden");
        //Layer 3 also needs the room number captured + a hint strip filled in
        markClueCaptured("clueRoom", roomNumber);
        renderHintStrip();
    }
}

//Mark a clue as captured in the left sidebar so the player can see progress
function markClueCaptured(elementID, value) {
    const li = document.getElementById(elementID);
    if (!li) return;
    li.classList.add("captured");
    li.querySelector("b").textContent = value;

    //if all three are captured, nudge the player toward the operation
    //without spelling the actual numbers out
    if (stationNumber !== null && emailCount !== null) {
        const box = document.getElementById("formulaBox");
        box.classList.remove("hidden");
        document.getElementById("formulaText").textContent = "";
    }
}

//Tiny nudge under the keypad screen - reminds the player to add the clues
//but stops short of doing the maths for them.
function renderHintStrip() {
    const strip = document.getElementById("hintStrip");
    strip.textContent = "";
}

//Init - runs once on page load
document.addEventListener("DOMContentLoaded", async () => {

    //tell the locker which module we're in, same convention as the other puzzles
    localStorage.setItem("currentModuleName", "Network Breach");
    //start the puzzle timer (Customer Service uses the same key)
    localStorage.setItem("moduleStartTime", Date.now());
    //wipe any old final score lying around
    localStorage.removeItem("finalScore");

    //shuffle and render the inbox up-front so it's ready when Layer 2 opens
    shuffle(emails);
    renderInbox();

    //Same /api/user/start round-trip the dashboard does for the other puzzles -
    //this creates the "Network Breach" entry in the user's completedModules
    //array so /complete works at the end.
    const referenceID = localStorage.getItem("referenceID");
    if (referenceID) {
        try {
            await fetch("http://localhost:4000/api/user/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    moduleName: "Network Breach",
                    referenceID: referenceID
                })
            });
        } catch (err) {
            console.error("Could not mark module as in-progress:", err);
        }
    }

    showLayer(1); //start at the desk
});
