function showCertificate(certData) {
  document.getElementById("employeeName").textContent = certData.employeeName; /*returns the text of this element*/
  document.getElementById("moduleName").textContent = certData.moduleName;
  document.getElementById("certDate").textContent = certData.issueDate;
  document.getElementById("certId").textContent = certData.certificateId;

  generateQRCode(certData.certificateId);

  document.getElementById("certificate").classList.remove("hidden");
}

/*when we click close, the cert will close*/
document.getElementById("closeCertificateBTN")
  .addEventListener("click", () => {
    document.getElementById("certificate").classList.add("hidden");
  });

/*Generating the QR code: NEEDS COMPLETING*/
function generateQRCode(certId) {
  const qrContainer = document.getElementById("qrCode");
  qrContainer.innerHTML = ""; /*make sure it's empty*/

  
  
}