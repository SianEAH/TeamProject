/*Sian*/
/*Load Modules*/
async function loadModules() {
  const token = localStorage.getItem("token"); //get the webtoken

  const referenceID = localStorage.getItem("referenceID"); //store the referenceID in local storage
  
  const res = await fetch(`http://localhost:4000/api/user?referenceID=${referenceID}`);

  const data = await res.json();
  displayModules(data.completed); //get the completed modules for the user
}

/*Display Modules*/
function displayModules(modules) {

  //For already created data, as created account was not created with the right module data type
  if(!Array.isArray(modules)) {
    console.error("Modules is not an array:", modules);
    return; //come out of the loop
  }
  
    modules.forEach(module => { //go through the modules

    //find all card titles from the bootstrap elements
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      const title = card.querySelector(".card-title").innerText.trim();

      //match module name
      if (title.toLowerCase().trim() === module.moduleName.toLowerCase().trim()) {
        //module status
        const statusSpan = card.querySelector(".status");
        //add the status of the module
        if (statusSpan) {
          statusSpan.classList.remove("complete", "in-progress", "incomplete");
          statusSpan.className = "status";

          if (module.status === "complete") {
              statusSpan.innerText = "Complete ✅"; //HTML Unicode Dingbats: https://www.w3schools.com/charsets/ref_utf_dingbats.asp
              statusSpan.classList.add("bg-success", "text-dark");
          } else if (module.status === "in-progress") {
              statusSpan.innerText = "In Progress";
              statusSpan.classList.add("bg-warning", "text-dark");
          } else {
              statusSpan.innerText = "Incomplete ❌"; //HTML Unicode Dingbats: https://www.w3schools.com/charsets/ref_utf_dingbats.asp
              statusSpan.classList.add("bg-danger", "text-dark");
          }
        }
      }
    });

  });
}

window.onload = loadModules; //do this function on load time