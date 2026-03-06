//adding modules
document.getElementById("addPuzzle").addEventListener("click", function () {

  const puzzleDiv = document.createElement("div");
  puzzleDiv.classList.add("puzzle"); //https://www.w3schools.com/jsref/prop_element_classlist.asp

  puzzleDiv.innerHTML = `
    <label>Puzzle Question</label>
    <textarea name="question[]"></textarea>

    <label>Upload Media</label>
    <input type="file" name="media[]">

    <label>Hint</label>
    <input type="text" name="hint[]">

    <label>Correct Answer</label>
    <input type="text" name="answer[]">
  `;

  document.getElementById("createModuleForm").appendChild(puzzleDiv);

});

//media type selector and what it shows
document.querySelectorAll(".mediaType").forEach(select => {

  select.addEventListener("change", function () {

    const container = this.nextElementSibling;
    container.innerHTML = "";

    if (this.value === "text") {
      container.innerHTML = `
        <label>Scenario Text</label>
        <textarea name="mediaText[]"></textarea>
      `;
    }

    if (this.value === "image") {
      container.innerHTML = `
        <label>Upload Image</label>
        <input type="file" name="mediaImage[]" accept="image/*">
      `;
    }

    if (this.value === "video") {
      container.innerHTML = `
        <label>Upload Video</label>
        <input type="file" name="mediaVideo[]" accept="video/*">
      `;
    }

    if (this.value === "file") {
      container.innerHTML = `
        <label>Upload Document</label>
        <input type="file" name="mediaFile[]" accept=".pdf,.doc,.docx">
      `;
    }

    if (this.value === "mixture") {
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

});