/*Sian*/
/*Open Employee List*/
function openEmployeeList() {
  document.getElementById("employeeModal").style.display = "block";
}

/*Close the employee pop-up*/
function closeModal() {
  const checkboxes = document.querySelectorAll("#employeeModal input[type='checkbox']"); 

  checkboxes.forEach(box => {
    box.checked = false; //set them back to blank when cancel is clicked
  });

  document.getElementById("employeeModal").style.display = "none";
}

/*Generating password*/
function generatePassword() {
  return Math.random().toString(36).slice(-10); //convert to String, so it's not all numbers
}

/*Assigning the employees: creating the dummy logins*/
document.getElementById("assignBtn").addEventListener("click", assignEmployees);

async function assignEmployees() {
  const selected = document.querySelectorAll("#employeeModal input:checked");
  //validation for empty checkboxes
  if (selected.length === 0) {
    alert("Please select at least one employee to assign");
    return; //come out of the loop
  }

  let output = "";

  for (let emp of selected) {
    const referenceID = emp.value;
    const password = generatePassword();

    const result = await createEmployee(referenceID, password);
    //getting the generated passwords
    if (result.message === "Employee already exists") {
      output += `${referenceID} → already exists (password unknown)\n`;
    } else {
      output += `${referenceID} → ${password}\n`;
    }
  }
  //to see the login details
  alert("Login Details:\n\n" + output);

  closeModal(); //call my closeModal function
}

//Creating an employee in the database when assigning
async function createEmployee(referenceID, password) {
  try {
    const res = await fetch("http://localhost:4000/api/employee/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        referenceID,
        password,
        name: referenceID,
        email: `${referenceID}@test.com`,
        jobTitle: "Employee"
      })
    });

    const data = await res.json();

    return {
      referenceID,
      password,
      message: data.message
    };

  } catch (err) { //error handling
    console.error(err);
  }
}