function checkAnswer(){
  const answers = document.getElementsByName("first_question");
  let selected = null;

  for(let i = 0; i < answers.length; i++){
    if(answers[i].checked){
      selected = answers[i].value;
    }
  }
    if(selected === null) {
      document.getElementById("result1").innerText = "Please select an answer!";
      return;
    }
    if(selected === "C" ){
      document.getElementById("result1").innerText = "Correct!";
    }else{
      document.getElementById("result1").innerText = "Incorrect!"

    }
  
}

function checkOrder(){
  const correctOrder = ["Encourage", "back", "trusts", "repeat"];

  const userOrder = [
    document.getElementById("step1").value,
    document.getElementById("step2").value,
    document.getElementById("step3").value,
    document.getElementById("step4").value
  ];
  let correct = true;
  for(let i = 0; i < correctOrder.length; i++){
    if(userOrder[i] !== correctOrder[i]){
      correct = false;
    }
  }
  if(correct){
    document.getElementById("result2").innerHTML = "Correct";
  }else{
    document.getElementById("result2").innerHTML = "Incorrect";
  }
}

function checkText(){
  const userInput = document.getElementById("answer3").value;

  if(userInput === "112"){
    document.getElementById("result3").innerHTML = "Correct";
  }else if(userInput === "999"){
    document.getElementById("result3").innerHTML = "Correct";
  }else{
    document.getElementById("result3").innerHTML = "Incorrect"
  }
}
console.log("mes");

