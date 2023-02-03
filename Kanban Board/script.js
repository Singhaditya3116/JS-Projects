const backlogList = document.querySelector(".backlog-list");
const progressList = document.querySelector(".in-progress-list");
const completeList = document.querySelector(".complete-list");
const onHoldList = document.querySelector(".onhold-list");


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
  updateDOM();
}

//get Data From local Storage if available
function getData(){
  if(localStorage.getItem("taskArrays"))
  {
    taskArrays = JSON.parse(localStorage.taskArrays);
    updateDOM();
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

//Update DOM with the taskArray Data
function updateDOM(){
  // console.log(Object.keys(taskArrays));
  // console.log(Object.values(taskArrays));
  let list = [backlogList,progressList,completeList,onHoldList];
  let taskArrayKeys = Object.keys(taskArrays);

  taskArrayKeys.forEach((task,index)=>{
    taskArrays[task].forEach((taskItem)=>{
      const listItem = document.createElement("li");
      listItem.innerText = `${taskItem}`;
      list[index].appendChild(listItem);
    })
  })
  
}



getData();
