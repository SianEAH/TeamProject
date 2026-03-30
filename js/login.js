//Get the info from the fields
//Sian
let employerFields, employeeFields, registerFields;
//Wait for the DOM to load 
document.addEventListener("DOMContentLoaded", () => {

    employerFields = document.getElementById("employerFields");
    employeeFields = document.getElementById("employeeFields");
    registerFields = document.getElementById("registerFields");

});

function showEmployer() {
    employerFields.style.display = "block";
    employeeFields.style.display = "none";
    registerFields.style.display = "none";

    document.getElementById("employeeBTN").style.display = "none";
}

function showEmployee() {
    employeeFields.style.display = "block";
    employerFields.style.display = "none";
    registerFields.style.display = "none";

    document.getElementById("employerBTN").style.display = "none";
}

function resetForm() {
    employerFields.style.display = "none";
    employeeFields.style.display = "none";
    registerFields.style.display = "none";

    document.getElementById("employerBTN").style.display = "inline-block";
    document.getElementById("employeeBTN").style.display = "inline-block";
}

//for registering
function showRegister() {
    registerFields.style.display = "block";
    employerFields.style.display = "none";
    employeeFields.style.display = "none";

    document.getElementById("employerBTN").style.display = "none";
    document.getElementById("employeeBTN").style.display = "none";
}

//Connecting with the backend route
//Hamza
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

        //Checking if the fields are filled in
        //Sian
        if (!referenceID || !password) {
            alert("Please fill in all the fields to log in.");
            return; // stops login request
        }
        //End of Sian's code

        // communicating with the backend
        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ referenceID, password, role: isEmployee ? "employee" : "employer" })
            });

            const data = await response.json();

            if (response.ok) {
                // storing the JWT token in the browser so we stay logged in
                localStorage.setItem('token', data.token);
                //storing in local storage
                localStorage.setItem('referenceID', referenceID);
                // routing the user to the dashboard
                if (isEmployee) {
                    window.location.href = "EmployeeDashboard.html";
                } else {
                    window.location.href = "EmployerDashboard.html";
                }
            } else {
                // in case of wrong credentials show error to user
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("The server isn't responding. Is the backend running on port 4000?");
        }
    });
});

//register a new company/employer function *NEEDS FINISHING*
//Sian
async function registerEmployer() {
    const companyName = document.getElementById("regCompanyName").value;
    const companyId = document.getElementById("regCompanyId").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;
    //Make sure all the fields are filled in
    if (!companyName || !companyId || !email || !password) {
        alert("Please fill in all the fields to register!");
        return;
    }
}