const inputContainer = document.getElementById("input-container");
const countdownTimerContainer = document.getElementById("countdown");
const countdownCompleteContainer = document.getElementById("countdown-complete");

const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date");
const countdownTitleEl = document.getElementById("countdown-title");

let countdownTitle = "";
let countdownDate = "";


//Set date input minimum as today date.
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min",today);
dateEl.value=today;

//take form Input
function updateCountdown(e)
{
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  console.log(countdownTitle,countdownDate);
  e.preventDefault();

  inputContainer.hidden = true;
  countdownTimerContainer.hidden=false;
  countdownTitleEl.innerText = countdownDate;
}

//Event Listeners
countdownForm.addEventListener("submit",updateCountdown);