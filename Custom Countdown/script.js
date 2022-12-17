const inputContainer = document.getElementById("input-container");
const countdownTimerContainer = document.getElementById("countdown");
const countdownCompleteContainer = document.getElementById("countdown-complete");

const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date");
const countdownTitleEl = document.getElementById("countdown-title");
const countdownDataEl = document.querySelectorAll("th");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = "";

const second = 1000;
const minute = second * 60;
const hour = minute*60;
const day = hour*24;

//Set date input minimum as today date.
const today = new Date().toISOString().split("T")[0];
console.log(today);
dateEl.setAttribute("min",today);
dateEl.value=today;

//populate countdown values
function updateDOM()
{
  const now = new Date().getTime();
  let difference = countdownValue -now;  
  const days = Math.floor(difference / day);
  const hours = Math.floor((difference % day) / hour);
  const minutes = Math.floor((difference % hour) / minute);
  const seconds = Math.floor((difference % minute) / second);
  //console.log("Days :",days," hours :",hours," minutes ",minutes," seconds ",seconds);

  inputContainer.hidden = true;
  countdownTimerContainer.hidden=false;
  countdownTitleEl.innerText = countdownTitle;

  countdownDataEl[0].innerText = days;
  countdownDataEl[1].innerText = hours;
  countdownDataEl[2].innerText = minutes;
  countdownDataEl[3].innerText = seconds;
}

//take form Input
function updateCountdown(e)
{
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  //Get countdown date value in milli sec.
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
}

//Event Listeners
countdownForm.addEventListener("submit",updateCountdown);