//Sian
document.addEventListener("DOMContentLoaded", () => { //wait for the DOM to load

  const container = document.getElementById("feedbackList");
  if (!container) return; //prevents breakage

  const history = JSON.parse(localStorage.getItem("feedbackHistory")) || [];

  //if there are no feedback forms
  if (history.length === 0) {
    container.innerHTML = "<p>No modules completed yet.</p>";
    return;
  }

  //loop through each
  history.forEach(item => {
    const div = document.createElement("div");

    //add to the innerHTML the feedback page entries
    //HTML Unicode Dingbats: https://www.w3schools.com/charsets/ref_utf_dingbats.asp
    //inner styling is fine, no need for seperate CSS
    div.innerHTML = `
      <div style="border:1px solid #ccc; padding:15px; margin-bottom:10px; border-radius:8px;">
        <h3>${item.module}</h3>
        <p><strong>Score:</strong> ${item.score}%</p>
        <p><strong>Time:</strong> ${item.time}</p>
        <p><strong>Status:</strong> ${item.passed ? "PASS ✅" : "FAIL ❌"}</p> 
        <p><strong>Date:</strong> ${item.date}</p>
      </div>
    `;

    container.appendChild(div);
  });

});