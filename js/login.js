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