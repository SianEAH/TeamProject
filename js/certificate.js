import QRCode from "qrcode";

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