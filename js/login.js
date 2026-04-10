//Get the info from the fields
const employerFields = document.getElementById("employerFields");
const employeeFields = document.getElementById("employeeFields");

function showEmployer() {
    employerFields.style.display = "block";
    employeeFields.style.display = "none";
    document.getElementById("employeeBTN").style.display = "none"; //hide the employee button
}

function showEmployee() {
    employeeFields.style.display = "block";
    employerFields.style.display = "none";
    document.getElementById("employerBTN").style.display = "none"; //hide the employer buttom
}

function resetForm() {
    document.getElementById("employerFields").style.display = "none";
    document.getElementById("employeeFields").style.display = "none";
    document.getElementById("employerBTN").style.display = "inline-block";
    document.getElementById("employeeBTN").style.display = "inline-block";
};

//Connecting with the backend route

document.addEventListener("DOMContentLoaded", () => {
    // getting the form to control what happens when user clicks login
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // stop the page from refreshing immediately

        // figure out if they're trying to log in as an Employee or Employer
        const isEmployee = employeeFields.style.display === "block";
        
        // getting the data from the employee or employer section
        const section = isEmployee ? employeeFields : employerFields;
        const referenceID = section.querySelector("input[type='text']").value;
        const password = section.querySelector("input[type='password']").value;

        // communicating with the backend
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ referenceID, password })
            });

            const data = await response.json();

            if (response.ok) {
                // storing the JWT token in the browser so we stay logged in
                localStorage.setItem('token', data.token);
                //storing in local storage
                localStorage.setItem('referenceID', referenceID);
                // routing the user to the dashboard
                if (isEmployee) {
                    window.location.href = "/html/EmployeeDashboard.html";
                } else {
                    window.location.href = "/html/EmployerDashboard.html";
                }
            } else {
                // in case of wrong credentials show error to user
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("The server isn't responding. Please try again later.");
        }
    });
});