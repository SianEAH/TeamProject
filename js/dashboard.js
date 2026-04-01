/*Sian*/
async function loadModules() {
    console.log("loadModules running"); //for debugging
    const token = localStorage.getItem("token"); //get the webtoken

  const referenceID = localStorage.getItem("referenceID");
  
  const res = await fetch(`http://localhost:4000/api/user?referenceID=${referenceID}`);

  const data = await res.json();
  console.log("DATA RECIEVED:", data); //for debugging
  displayModules(data.completed); //get the completed modules for the user
}

function displayModules(modules) {
  console.log("MODULES:", modules); //for debugging

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

        const statusSpan = card.querySelector(".status");
        //add the status of the module
        if (statusSpan) {
          statusSpan.classList.add(module.status);
          statusSpan.innerText = module.status.replace("-", " ");
        }
      }
    });

  });
}

window.onload = loadModules; //do this function on load time