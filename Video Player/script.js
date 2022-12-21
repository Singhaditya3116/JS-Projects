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
function getMinutes(timeInSec)
{
  let minutes = Math.floor(timeInSec/60);
  if(minutes < 10)
  {
    minutes = `0${minutes}`
  }
  return minutes;
}

function getSeconds(timeInSec)
{
  let seconds = Math.floor(timeInSec%60);
  if(seconds < 9 )
  {
    seconds = `0${seconds}`;
  }
  return seconds;
}

function updateProgressBar()
{
  progressBar.style.width=`${(videoEl.currentTime/videoEl.duration)*100}%`;

  let currentMinutes = getMinutes(videoEl.currentTime);
  let currentSeconds = getSeconds(videoEl.currentTime);
  timeElapsed.textContent = `${currentMinutes}:${currentSeconds} /`
  console.log(currentMinutes,currentSeconds);
}

function changeProgressBarWidth(e)
{
  console.log(e.clientX);
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
progressRange.addEventListener("click",changeProgressBarWidth)