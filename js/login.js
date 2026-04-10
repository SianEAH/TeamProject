//Get the info from the fields
//Sian
let employerFields, employeeFields, registerFields;
let currentRole = null; //to make sure the role is the right one
//Wait for the DOM to load 
document.addEventListener("DOMContentLoaded", () => {

    employerFields = document.getElementById("employerFields");
    employeeFields = document.getElementById("employeeFields");
    registerFields = document.getElementById("registerFields");

});

//show Employer
function showEmployer() {
    currentRole = "employer"; //to make sure it's employer
    employerFields.style.display = "block";
    employeeFields.style.display = "none";
    registerFields.style.display = "none";

    document.getElementById("employeeBTN").style.display = "none";
}

//Show Employee
function showEmployee() {
    currentRole = "employee"; //to make sure it's employee
    employeeFields.style.display = "block";
    employerFields.style.display = "none";
    registerFields.style.display = "none";

    document.getElementById("employerBTN").style.display = "none";
}

//Reset the form
function resetForm() {
    employerFields.style.display = "none";
    employeeFields.style.display = "none";
    registerFields.style.display = "none";

    document.getElementById("employerBTN").style.display = "inline-block";
    document.getElementById("employeeBTN").style.display = "inline-block";
    //Clear the input fields
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    })
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
        
        //getting the data from the employee or employer section
        //Sian
        const referenceInput = isEmployee
        ? document.getElementById("referenceID")
        : document.getElementById("companyID");

        const passwordInput = isEmployee
        ? document.getElementById("employeePassword")
        : document.getElementById("employerPassword");

        //To prevent crashing issue encountered
        if(!referenceInput || !passwordInput) {
            console.error("Input fields not found",  {
            referenceInput,
            passwordInput,
            isEmployee
            });
            alert("Form error - input issues");
            return; //come out of loop, to prevent crashing issue
        }
        //variables
        const referenceID = referenceInput.value.trim();
        const password = passwordInput.value.trim();

        //Checking if the fields are filled in
        //Sian
        if (!referenceID || !password) {
            alert("Please fill in all the fields to log in.");
            return; 
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

//register a new company/employer function
//Sian
async function registerEmployer() {
    //get the info from the fields
    const companyName = document.getElementById("regCompanyName").value.trim();
    const companyId = document.getElementById("regCompanyId").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const confirmPassword = document.getElementById("regConfirmPassword").value.trim();

    //Check if any fields are empty, all must be filled
    if (!companyName || !companyId || !email || !password || !confirmPassword) {
        alert("Please fill in all fields to register!");
        return;
    }

    //Check if the passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch("http://localhost:4000/api/registerEmployer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                companyName,
                companyID: companyId,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! New account created.");
            //Clear the input fields
            document.getElementById("regCompanyName").value = "";
            document.getElementById("regCompanyId").value = "";
            document.getElementById("regEmail").value = "";
            document.getElementById("regPassword").value = "";
            document.getElementById("regConfirmPassword").value = "";
            resetForm(); //reset the form
        } else {
            alert(data.message || "Registration failed. Please try again");
        }

    } catch (err) { //catch any errors
        console.error(err);
        alert("Server error");
    }
}