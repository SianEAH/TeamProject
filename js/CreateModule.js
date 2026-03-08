//track the puzzles as they're added
let puzzleCount = 1;

document.getElementById("addPuzzle").addEventListener("click", function () {

  puzzleCount++; //up the puzzle counter

  const puzzleDiv = document.createElement("div");
  puzzleDiv.classList.add("puzzle");

  puzzleDiv.innerHTML = `
    <h3>Puzzle ${puzzleCount}</h3>

    <label>Puzzle Question</label>
    <textarea name="question[]"></textarea>

    <label>Media Type</label>
    <select class="mediaType">
      <option value="">Select Media Type</option>
      <option value="text">Text</option>
      <option value="image">Image</option>
      <option value="video">Video</option>
      <option value="file">File</option>
      <option value="mixture">Mixture</option>
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


//function to handle media type changes
function setupMediaSelector(select) {

  select.addEventListener("change", function () {

    const container = this.nextElementSibling;
    container.innerHTML = "";

    if (this.value === "text") {

      container.innerHTML = `
        <label>Scenario Text</label>
        <textarea name="mediaText[]"></textarea>
      `;
    }

    else if (this.value === "image") {

      container.innerHTML = `
        <label>Upload Image</label>
        <input type="file" name="mediaImage[]" accept="image/*">
      `;
    }

    else if (this.value === "video") {

      container.innerHTML = `
        <label>Upload Video</label>
        <input type="file" name="mediaVideo[]" accept="video/*">
      `;
    }

    else if (this.value === "file") {

      container.innerHTML = `
        <label>Upload Document</label>
        <input type="file" name="mediaFile[]" accept=".pdf,.doc,.docx">
      `;
    }

    else if (this.value === "mixture") {

      container.innerHTML = `
        <label>Scenario Text</label>
        <textarea name="mediaText[]"></textarea>

        <label>Upload Image</label>
        <input type="file" name="mediaImage[]" accept="image/*">

        <label>Upload Video</label>
        <input type="file" name="mediaVideo[]" accept="video/*">

        <label>Upload Document</label>
        <input type="file" name="mediaFile[]" accept=".pdf,.doc,.docx">
      `;
    }

  });

}


//attach media selector to the first puzzle on page load
document.querySelectorAll(".mediaType").forEach(setupMediaSelector);