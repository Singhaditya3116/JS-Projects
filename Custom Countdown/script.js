const inputContainer = document.getElementById("input-container");
const countdownTimerContainer = document.getElementById("countdown");
const countdownCompleteContainer = document.getElementById("countdown-complete");

const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date");
const countdownTitleEl = document.getElementById("countdown-title");
const countdownDataEl = document.querySelectorAll("th");
const resetBtn = document.getElementById("reset-button");

const newCountdownBtn = document.getElementById("new-count-button");
const countdownCompleteText = document.getElementById("countdown-complete-text");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let savedCountdown;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute*60;
const day = hour*24;

//Set date input minimum as today date.
const today = new Date().toISOString().split("T")[0];
// console.log(today);
dateEl.setAttribute("min",today);
dateEl.value=today;

function completeCountdown()
{
  clearInterval(countdownActive);
  inputContainer.hidden=true;
  countdownTimerContainer.hidden = true;
  countdownCompleteContainer.hidden=false;

  countdownCompleteText.textContent = `${countdownTitle} completed on ${countdownDate}`;
  localStorage.removeItem("countdown");
}

//populate countdown values
function updateDOM()
{
  countdownActive = setInterval(()=>{
    const now = new Date().getTime();
    let difference = countdownValue-now;  
    const days = Math.floor(difference / day);
    const hours = Math.floor((difference % day) / hour);
    const minutes = Math.floor((difference % hour) / minute);
    const seconds = Math.floor((difference % minute) / second);
    //console.log("Days :",days," hours :",hours," minutes ",minutes," seconds ",seconds);

    if(difference < 0)
    {
      completeCountdown();
    }
    else
    {
      countdownDataEl[0].textContent = days;
      countdownDataEl[1].textContent = hours;
      countdownDataEl[2].textContent = minutes;
      countdownDataEl[3].textContent = seconds;
      countdownTitleEl.textContent = countdownTitle;

      inputContainer.hidden = true;
      countdownTimerContainer.hidden=false;
    }
  },1000)

}

//take form Input
function updateCountdown(e)
{
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title:countdownTitle,
    date:countdownDate
  }
  console.log(savedCountdown);
  localStorage.setItem("countdown",JSON.stringify(savedCountdown));
  
  //Get countdown date value in milli sec.
  countdownValue = new Date(countdownDate).getTime();
  if(countdownTitle === "")
  {
    alert("Enter Countdown Title!");
  }
  else
  {
    updateDOM();
  }
}

//reset Countdown
function reset()
{
  countdownDataEl[0].textContent = 0;
  countdownDataEl[1].textContent = 0;
  countdownDataEl[2].textContent = 0;
  countdownDataEl[3].textContent = 0;
  countdownTitleEl.innerText = "";
  clearInterval(countdownActive);

  inputContainer.hidden=false;
  countdownCompleteContainer.hidden=true;
  countdownTimerContainer.hidden=true;
  document.getElementById("title").value="";
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown()
{
  //Get countdown from localstorage if available
  if(localStorage.getItem("countdown"))
  {
    inputContainer.hidden=true;
    countdownCompleteContainer.hidden=true;
    countdownTimerContainer.hidden=false;

    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle=savedCountdown.title;
    countdownDate=savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}


//Event Listeners
countdownForm.addEventListener("submit",updateCountdown);
resetBtn.addEventListener("click",reset);
newCountdownBtn.addEventListener("click",reset);

//on Load check local Storage
restorePreviousCountdown();