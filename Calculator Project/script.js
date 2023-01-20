const displayScreen = document.getElementById("screen");
const clearBtn = document.getElementById("clear");
const numbersBtn = document.getElementsByClassName("numbers");
const operators = document.getElementsByClassName("operators");
const equalToBtn = document.getElementById("equal-to");
const deleteBtn = document.getElementById("delete");
const tableBody = document.querySelector("tbody");
const operatorArray = ["%","÷","+","−","×"];
const operatorMap = {
  "%":"%",
  "÷":"/",
  "+":"+",
  "−":"-",
  "×":"*"
}


//Clear the Input Screen
function clearScreen(){
  displayScreen.innerText="";
  return;
}

//Get the value from Screen
function currentScreenValue()
{
  
  displayScreen.innerText = displayScreen.innerText+" "+ this.innerText;
  return;
}

//Evaluate the statement on the screen when = is clicked.
function evaluate(e)
{
  e.stopPropagation();
  let tempstatement = displayScreen.innerText;
  let statement="";

  for(let i=0;i<tempstatement.length;i++)
  {
    if(operatorArray.includes(tempstatement[i]))
      statement += operatorMap[tempstatement[i]];
    else
      statement += tempstatement[i];
  }
  console.log(eval(statement));
  let ans = eval(statement);
  if(ans % 1 !== 0){
    ans = ans.toFixed(2);
  } 
  displayScreen.innerText = ans;
}

function deleteBtnClicked(e)
{
  e.stopPropagation();
  let currScreen = displayScreen.innerText;
  if(currScreen.length === 1 || currScreen === ""){
    displayScreen.innerText="";
    return;
  }
  else{
    displayScreen.innerText = currScreen.substring(0,currScreen.length-1);
  }

}

function operatorButtonClicked(operator)
{
  let currScreen = displayScreen.innerText;
  if(currScreen === "" || operatorArray.includes(currScreen[currScreen.length -1]))
  {
    return;
  }
  displayScreen.innerText += operator;
}

function operandClicked(operand)
{
  displayScreen.innerText += operand;
}

function checkBtnClicked(e)
{
  if(e.target.tagName === "TR" || e.target.tagName === "IMG")
  {
    return;
  }
  let tempOperator = e.target.innerText;
  let value = Number(tempOperator);
  
  if(value >= 0 && value < 10)
  {
    operandClicked(value);
  }
  else if(operatorArray.includes(tempOperator))
  {
    operatorButtonClicked(tempOperator);
  }
}

clearBtn.addEventListener('click',clearScreen);
equalToBtn.addEventListener('click',evaluate);
deleteBtn.addEventListener('click',deleteBtnClicked);

tableBody.addEventListener("click",checkBtnClicked);


