//Sian
document.addEventListener("DOMContentLoaded", () => { //wait for the DOM to load

  const list = document.getElementById("certList");
  if (!list) return;

  const certs = JSON.parse(localStorage.getItem("certificates")) || [];
  //if there's no certs to display yet
  if (certs.length === 0) {
    list.innerHTML = "<p>No certificates yet.</p>";
    return;
  }
  //loop through the certs and add them to the page
  certs.forEach(cert => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${cert.module}</h3>
      <p>Score: ${cert.score}%</p>
      <p>Date: ${cert.date}</p>
      <p>ID: ${cert.id}</p>
      <hr>
    `;

    list.appendChild(div);
  });

});