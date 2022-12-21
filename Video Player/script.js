const videoEl = document.querySelector("video");
const playBtn = document.getElementById("play-btn");
const volumeBtn = document.getElementById("volume-icon");
const fullscreen = document.getElementById("fullscreen");
const timeDuration = document.querySelector(".time-duration");
const timeElapsed = document.querySelector(".time-elapsed");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");


// Play & Pause ----------------------------------- //

function playVideo()
{
  videoEl.play();
  playBtn.classList.remove("bx-play");
  playBtn.classList.add("bx-pause");
  playBtn.setAttribute("title","Pause");
}

function pauseVideo()
{
  videoEl.pause();
  playBtn.classList.remove("bx-pause");
  playBtn.classList.add("bx-play");
  playBtn.setAttribute("title","Play");
}


function videoPlayPause()
{
  if(videoEl.paused)
  {
    playVideo();
  }
  else
  {
    pauseVideo();
  }
}


// Progress Bar ---------------------------------- //
function getTime(timeInSec)
{
  let minutes = Math.floor(timeInSec/60);
  if(minutes < 10)
  {
    minutes = `0${minutes}`
  }
  let seconds = Math.floor(timeInSec%60);
  if(seconds < 10)
  {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

//Update Progress Bar as video Plays
function updateProgressBar()
{
  progressBar.style.width=`${(videoEl.currentTime/videoEl.duration)*100}%`;

  let currentTime = getTime(videoEl.currentTime);
  let durationTime = getTime(videoEl.duration);
  timeElapsed.textContent = `${currentTime} /`;
  timeDuration.textContent = `${durationTime}`;
}

//Seek Progress Bar when clicked on progress Range.
function setProgress(e)
{
  let widthPercentage = (e.offsetX/progressRange.offsetWidth)*100;
  progressBar.style.width = `${widthPercentage}%`;
  let timeElapsed = (widthPercentage*videoEl.duration)/100;
  videoEl.currentTime=timeElapsed;
  timeElapsed = getTime(timeElapsed);
  timeElapsed.textContent = `${timeElapsed} /`;
}

// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //



//Event Listeners
playBtn.addEventListener("click",videoPlayPause);
videoEl.addEventListener("click",videoPlayPause);
videoEl.addEventListener("ended",pauseVideo);
videoEl.addEventListener("canplay",updateProgressBar);
videoEl.addEventListener("timeupdate",updateProgressBar);
progressRange.addEventListener("click",setProgress)