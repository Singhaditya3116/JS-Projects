const questionContainer = document.querySelector(".question-set-container");
const buttonContainer = document.querySelector(".button");
const countdownContainer = document.querySelector(".countdown-container");
const submitBtn = document.getElementById("start-btn");
const countdownValue = document.querySelector(".countdown");

function startCountDown()
{
  countdownValue.textContent = 3;
  let i=3;
  let countdownInterval = setInterval(()=>{
    i--;
    countdownValue.textContent = i;
    if(i == 0)
    {
      countdownValue.textContent = "Go!";
      clearInterval(countdownInterval);
    }
    // console.log(i);
    
  },1000)
}


submitBtn.addEventListener("click",()=>{

  // Get selected Radio data.

  // const radioButtons = document.querySelector("input[name=question-set]:checked");
  // console.log(radioButtons);

  // Hide the Question set Container
  questionContainer.hidden = true;
  buttonContainer.hidden = true;
  countdownContainer.classList.remove("hidden");
  // Start CountDown
  startCountDown();
  
})