//Loading the certs in the Employer dashboard
//Sian
//Wait for the DOM to load
document.addEventListener("DOMContentLoaded", loadAllCertificates);
//load all the certs
async function loadAllCertificates() {
  try {
    const res = await fetch("http://localhost:4000/api/user/all-certificates"); //get all the certs
    const certs = await res.json();

    displayCertificates(certs); //calling my function, taking in certs

  } catch (err) { //error handling
    console.error("Error loading certificates:", err);
  }
}

//display the certs
function displayCertificates(certs) {
  const container = document.getElementById("employeeProgressList");
  container.innerHTML = ""; //make sure there's nothing in the inner html

  //Validation: checking for no certs
  if (certs.length === 0) {
    container.innerHTML = "<p>No employee certificates yet.</p>";
    return;
  }
  //loop through the certs and append the details
  certs.forEach(cert => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card p-3 mb-3">
        <h5>${cert.employeeName}</h5>
        <p><strong>Module:</strong> ${cert.moduleName}</p>
        <p><strong>Score:</strong> ${cert.score}%</p>
        <p><strong>Date:</strong> ${cert.date}</p>
        <p><strong>ID:</strong> ${cert.certificateId}</p>
      </div>
    `;

    container.appendChild(div);
  });
}