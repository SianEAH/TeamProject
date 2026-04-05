//Sian
document.addEventListener("DOMContentLoaded", showFeedback); //wait for the DOM to load

//show the feedback form
function showFeedback() {
  //get their details from their session
  const name = localStorage.getItem("employeeName") || "Employee";
  const module = localStorage.getItem("currentModuleName");
  const score = parseFloat(localStorage.getItem("finalScore")) || 0;
  const time = localStorage.getItem("timeTaken") || "0s";

  document.getElementById("fbEmployeeName").textContent = name;
  document.getElementById("fbModuleName").textContent = module;
  document.getElementById("fbScore").textContent = score + "%";
  document.getElementById("fbTime").textContent = time;

  const status = document.getElementById("fbStatus");

  if (score >= 90) {
    status.textContent = "PASS ✅"; //HTML Unicode Dingbats: https://www.w3schools.com/charsets/ref_utf_dingbats.asp
    status.style.color = "green";
  } else {
    status.textContent = "FAIL ❌"; //HTML Unicode Dingbats: https://www.w3schools.com/charsets/ref_utf_dingbats.asp
    status.style.color = "red";
  }
  //close button
  document.getElementById("closeFeedbackBTN").addEventListener("click", () => {
    window.location.href ="EmployeeDashboard.html";
});

  document.getElementById("feedbackModal").classList.remove("hidden");

  //showing the cert if passed
  const certBTN = document.getElementById("viewCertBTN");

  if (score >= 90) {
  //open certificate modal
    certBTN.style.display = "block";
    }
    //open the cert on click
    certBTN.addEventListener("click", () => {
        window.location.href = "certificate.html";
    });
}