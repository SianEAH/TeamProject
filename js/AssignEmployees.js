function openEmployeeList() {
  document.getElementById("employeeModal").style.display = "block";
}

function closeModal() {
  const checkboxes = document.querySelectorAll("#employeeModal input[type='checkbox']"); 

  checkboxes.forEach(box => {
    box.checked = false; //set them back to blank when cancel is clicked
  });

  document.getElementById("employeeModal").style.display = "none";
}
