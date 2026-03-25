  let puzzle1 = false;
  let puzzle2 = false;
  let puzzle3 = false;
  let puzzle4 = false;
  let puzzle5 = false;

function checkAnswer1(){
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
      puzzle1 = true;
    }else{
      document.getElementById("result1").innerText = "Incorrect!"

    }
  
}

function checkOrder2(){
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
    puzzle2 = true;
  }else{
    document.getElementById("result2").innerHTML = "Incorrect";
  }
}

function checkText3(){
  const userInput = document.getElementById("answer3").value;

  if(userInput === "112"){
    document.getElementById("result3").innerHTML = "Correct";
    puzzle3 =true;
  }else if(userInput === "999"){
    document.getElementById("result3").innerHTML = "Correct";
    puzzle3 = true;
  }else{
    document.getElementById("result3").innerHTML = "Incorrect"
  }
}

function checkAnswer4(){
  const Answer = document.getElementsByName("fourth_question");
  let selected4 = null;
  for(let i = 0; i < Answer.length; i++){
    if(Answer[i].checked){
      selected4 = Answer[i].value;
    }
  }
   
  if(selected4 === null){
    document.getElementById("result4").innerHTML = "Please select an answer!";
    return;
  }
  if(selected4 === "D"){
    document.getElementById("result4").innerHTML = "Correct";
    puzzle4 = true;
  }else{
    document.getElementById("result4").innerHTML = "Incorrect"
  }
}

function checkTrue5(){
  const rightAnswer = ["F", "T", "T", "F"];

  const userAns = [
    document.getElementById("question1").value,
    document.getElementById("question2").value,
    document.getElementById("question3").value,
    document.getElementById("question4").value
  ];

  let orderedCorrect = true;
  for(let i = 0; i < rightAnswer.length; i++){
    if(userAns[i] !== rightAnswer[i]){
      orderedCorrect = false;
    }
  }
  if(orderedCorrect){
    document.getElementById("result5").innerHTML = "Correct";
    puzzle5 = true;
  }else{
    document.getElementById("result5").innerHTML = "Incorrect";
  }
}


function unlock(){
  if(puzzle1&&puzzle2&&puzzle3&&puzzle4&&puzzle5){
    document.getElementById("final").innerHTML = "Congrats You unlocked the door and escaped!";
  }else{
    document.getElementById("final").innerHTML = "Please check all the answers and try again!";
  }
}

function enterFirstAid(){
  window.location.href = "FirstAid.html";
}