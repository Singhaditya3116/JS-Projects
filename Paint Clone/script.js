const activeToolText = document.querySelector("#active-tool");
const brushIcon = document.querySelector("#brush");
const brushColorBtn = document.querySelector("#brush-color");
const brushSizeEl = document.querySelector("#brush-size");
const brushSlider = document.querySelector("#brush-slider");
const bucketColorBtn = document.querySelector("#bucket-color");
const eraser = document.querySelector("#eraser");
const clearCanvasBtn = document.querySelector("#clear-canvas");
const {body} = document;

//Global Variables
let currentSize=10;
let bucketColor= "#ffffff";
let brushColor = "#a51dab";
let isBrush = true;
let isMouseDown= false;
let drawnArray = [];

//Setting Canvas.
const canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.setAttribute("alt","Drawing Board");
const context = canvas.getContext("2d");


//formatting brush size
function displayBrushSize(){
  let size = currentSize;
  if(size < 10)
  {
    size = `0${size}`;
  }
  brushSizeEl.innerText = size;
}

//Setting Brush Color
brushColorBtn.addEventListener("change",()=>{
  isBrush=true;
  brushColor = `#${brushColorBtn.value}`;
  // console.log(brushColor);
})


//Setting Brush Size
brushSlider.addEventListener("change",()=>{
  currentSize = brushSlider.value;
  displayBrushSize(); 
})

//Setting Background Color
bucketColorBtn.addEventListener("change",()=>{
  bucketColor = `#${bucketColorBtn.value}`;
  createCanvas();
  restoreCanvas();
})

// Eraser
eraser.addEventListener("click",() => {
  isBrush=false;
  activeToolText.innerText="Eraser";
  brushIcon.style.color = "white";
  eraser.style.color = "black";
  brushColor = bucketColor;
  currentSize = 50;
})

// Switch to Brush
function switchToBrush(){
  isBrush = true;
  activeToolText.innerText = "Brush";
  brushIcon.style.color = "black";
  eraser.style.color = "white";
  brushColor = `#${brushColorBtn.value}`;
  currentSize = 10;
  brushSlider.value = 10;
  displayBrushSize();
}

function createCanvas(){
  canvas.height = window.innerHeight - 50;
  canvas.width = window.innerWidth;
  context.fillStyle = bucketColor;
  context.fillRect(0,0,canvas.width,canvas.height);
  body.appendChild(canvas);
  switchToBrush();
}

// Get Mouse position.
function getMousePosition(event){
  const boundaries = canvas.getBoundingClientRect();
  return {
    x : event.clientX - boundaries.x,
    y : event.clientY - boundaries.y
  }
}

//Clear Canvas
clearCanvasBtn.addEventListener("click",() => {
  createCanvas();
  drawnArray = [];
  activeToolText.innerText = "Canvas Cleared";

  setTimeout(switchToBrush,1500);
})

//Draw What is stored in draw array
function restoreCanvas(){

  for(let i = 1; i<drawnArray.length; i++){
    context.beginPath();
    context.moveTo(drawnArray[i - 1].x,drawnArray[i - 1].y)
    context.lineWidth = drawnArray[i].size;
    context.lineCap = "round";

    if(drawnArray[i].brush){  //If it is a brush
      context.strokeStyle = drawnArray[i].color;
    }else{ //If it is eraser
      context.strokeStyle = bucketColor;
    }
    context.lineTo(drawnArray[i].x,drawnArray[i].y);
    context.stroke();
  }
}

// Store drawn lines in drawn array
function storeDrawn(x,y,size,color,brush){
  const line = {
    x,y,size,color,brush
  }
  drawnArray.push(line);
}

//Mouse down
canvas.addEventListener("mousedown",(event) => {
  isMouseDown= true;
  const currentPosition = getMousePosition(event);
  // console.log("mouse is clicked ",currentPosition);
  context.moveTo(currentPosition.x,currentPosition.y);
  context.beginPath();
  context.lineWidth = currentSize;
  context.lineCap = "round";
  context.strokeStyle = brushColor;
})

//Mouse Move
canvas.addEventListener("mousemove",() => {
  if(isMouseDown){
    const currentPosition = getMousePosition(event);
    context.lineTo(currentPosition.x,currentPosition.y);
    context.stroke();
    storeDrawn(currentPosition.x,currentPosition.y,currentSize,brushColor,isBrush);
  }
  else
  {
    storeDrawn(undefined);
  }
})

//Mouse Up
canvas.addEventListener("mouseup",() => {
  isMouseDown = false;
  // console.log("Mouse is unclicked");
})

// body.setAttribute("onclick","getMousePosition(event)");


createCanvas();

brushIcon.addEventListener("click",switchToBrush);
