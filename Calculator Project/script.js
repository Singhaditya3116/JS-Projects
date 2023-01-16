const displayScreen = document.getElementById("screen");
const clearBtn = document.getElementById("clear");
const numbersBtn = document.getElementsByClassName("numbers");
const operators = document.getElementsByClassName("operators");
const equalToBtn = document.getElementById("equal-to");
const deleteBtn = document.getElementById("delete");
const tableBody = document.querySelector("tbody");
const operatorArray = ["%","/","+","-","x"];
var operand1 = 0;
var operand2 = 0;
var operator = null;

//Clear the Input Screen
function clearScreen(){
  displayScreen.innerText="";
  return;
}

//Get the value from Screen
function currentScreenValue()
{
  // console.log(this);
  displayScreen.innerText = displayScreen.innerText+" "+ this.innerText;
  return;
}

//Evaluate the statement on the screen when = is clicked.
function evaluate()
{
  console.log(displayScreen.innerText)
}

function deleteBtnClicked(e)
{
  // console.log("delete clicked");
  e.stopPropagation();
  let currScreen = displayScreen.innerText;
  if(currScreen === "")
  {
    return;
  }
  console.log("original ",displayScreen.innerText,"length ",displayScreen.innerText.length);
  if(currScreen.length === 1)
  {
    displayScreen.innerText="";
  }
  else
  {
    displayScreen.innerText = currScreen.substring(0,currScreen.length-1);
  }
  
  console.log("sliced ",displayScreen.innerText,"length ",displayScreen.innerText.length);
}

function operatorButtonClicked(operator)
{
  let currScreen = displayScreen.innerText;
  if(currScreen === "" || operatorArray.includes(currScreen[currScreen.length -1]))
  {
    return;
  }
  displayScreen.innerText += operator;
  console.log(currScreen,typeof currScreen);
  // console.log(operator,typeof operator);
  // operator = this.innerText;
  // operand1 = displayScreen.innerText;
  // displayScreen.innerText =displayScreen.innerText + " "+ operator;
}

function operandClicked(operand)
{
  // console.log(operand,typeof operand);
  displayScreen.innerText += operand;
}



function checkBtnClicked(e)
{
  console.log(e.target, e.currentTarget)
  if(e.target.tagName === "TR" || e.target.tagName === "IMG")
  {
    return;
  }
  let tempOperator = e.target.innerText;
  let value = Number(tempOperator);
  
  if(value >= 0 && value <= 10)
  {
    //console.log(e.target,e.target.tagName);
    operandClicked(value);
  }
  else if(tempOperator == "%" || tempOperator == "/" || tempOperator == "-" || tempOperator == "+" || tempOperator == "x")
  {
    operatorButtonClicked(tempOperator);
  }
}

clearBtn.addEventListener('click',clearScreen);
equalToBtn.addEventListener('click',evaluate);
deleteBtn.addEventListener('click',deleteBtnClicked);

tableBody.addEventListener("click",checkBtnClicked);


