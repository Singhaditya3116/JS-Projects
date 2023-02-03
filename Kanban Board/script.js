const backlogList = document.querySelector(".backlog-list");
const progressList = document.querySelector(".in-progress-list");
const completeList = document.querySelector(".complete-list");
const onHoldList = document.querySelector(".onHold-list");


//Initializing Array
let taskArrays = {
  backlogArray : [],
  progressArray : [],
  completeArray : [],
  onHoldArray : []
}

//set Data in localStorage
function updateLocalStorage(){
  localStorage.setItem("taskArrays",JSON.stringify(taskArrays));
}

//get Data From local Storage if available
function getData(){
  if(localStorage.getItem("taskArrays"))
  {
    taskArrays = JSON.parse(localStorage.taskArrays);
    // console.log(taskArrays);
  }
  else
  {
    taskArrays = {
      backlogArray : ["Release the course","Sit back and Relax"],
      progressArray : ["Work on Projects","Relax to music"],
      completeArray : ["Being cool","Getting stuff done"],
      onHoldArray : ["Being uncool"]
    }
    updateLocalStorage();
  }
}


getData();