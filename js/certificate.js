

//function to get data from Backend
async function getRealCertData() {
    //getting the module name from the URL (e.g., certificate.html?module=FireSafety)
    const urlParams = new URLSearchParams(window.location.search);
    // Check the "Locker" first. If empty, default to General Training.
    const moduleName = localStorage.getItem('currentModuleName') || "General Training";

    //getting the User ID we saved during login
    const refID = localStorage.getItem('referenceID');

    if (!refID) {
        alert("Please log in first!");
        window.location.href = "/html/login.html";
        return;
    }

    try {
        // fetch certificate data using the relative Vercel /api route
        const response = await fetch(`/api/user/certificate/${moduleName}?referenceID=${refID}`);
        
        if (!response.ok) throw new Error("Failed to fetch certificate");

        const realData = await response.json();

        //sending this data to the function
        showCertificate(realData);

    } catch (err) {
        console.error("Error loading certificate:", err);
        alert("Could not load certificate. Please try again later.");
    }
}

function showCertificate(certData) {
  document.getElementById("employeeName").textContent = certData.employeeName; /*returns the text of this element*/
  document.getElementById("moduleName").textContent = certData.moduleName;
  document.getElementById("certDate").textContent = certData.issueDate;
  document.getElementById("certId").textContent = certData.certificateId;

  generateQRCode(certData.certificateId);

  document.getElementById("certificate").classList.remove("hidden");
}

/*when we click close, the cert will close*/
document.addEventListener("DOMContentLoaded", () => { //wait until the DOM has loaded

  //triggering the data fetch fucntion 
  getRealCertData();

  document
    .getElementById("closeCertificateBTN")
    .addEventListener("click", () => {
      document.getElementById("certificate").classList.add("hidden");
  });

  document
    .getElementById("downloadCertificateBTN")
    .addEventListener("click", downloadCertificate);

});

//https://www.npmjs.com/package/qrcode
function generateQRCode(certificateID) {
  const qrContainer = document.getElementById("qrCode");
  qrContainer.innerHTML = ""; /*make sure it's empty*/

  const canvas = document.createElement("canvas"); //create a canvas for the QR Code

  QRCode.toCanvas(canvas, certificateID, { width: 120 }, function (error) {
    if (error) console.error(error); //error message
  });

  qrContainer.appendChild(canvas); //append the QR code to the canvas QR container
  
}

//Download button
document
  .getElementById("downloadCertificateBTN")
  .addEventListener("click", downloadCertificate);

function downloadCertificate() {
  window.print(); //https://www.w3schools.com/jsref/met_win_print.asp
}