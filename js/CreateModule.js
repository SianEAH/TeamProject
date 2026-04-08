//Sian
//track the puzzles as they're added
let puzzleCount = 1;

document.getElementById("addPuzzle").addEventListener("click", function () {

  puzzleCount++; //up the puzzle counter

  const puzzleDiv = document.createElement("div");
  puzzleDiv.classList.add("puzzle");
  //append to innerHTML
  puzzleDiv.innerHTML = `
    <h3>Puzzle ${puzzleCount}</h3>

    <label>Puzzle Question</label>
    <textarea name="question[]"></textarea>

    <label>Media Type</label>
    <select class="mediaType">
      <option value="">Select Media Type</option>
      <option value="file">File</option>
    </select>

    <div class="mediaInput"></div>

    <label>Hint</label>
    <input type="text" name="hint[]">

    <label>Correct Answer</label>
    <input type="text" name="answer[]">
  `;

  document.getElementById("createModuleForm").appendChild(puzzleDiv);

  //attach media selector to this new puzzle
  setupMediaSelector(puzzleDiv.querySelector(".mediaType"));
});


//function to handle media type changes (Options were taken out to make it file only)
function setupMediaSelector(select) {

  select.addEventListener("change", function () {

    const container = this.nextElementSibling;
    container.innerHTML = "";

    if (this.value === "file") {

      container.innerHTML = `
        <label>Upload File</label>
        <input type="file" name="mediaFile[]" accept=".pdf,.doc,.docx">
      `;
    }

  });

}

//When the add module button is clicked an alert is shown
document.getElementById("createModule").addEventListener("click", function () {
  alert("Module created!");
});


//attach media selector to the first puzzle on page load
document.querySelectorAll(".mediaType").forEach(setupMediaSelector);