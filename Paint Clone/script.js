const activeToolText = document.querySelector("#active-tool");
const brushIcon = document.querySelector("#brush");
const brushColorBtn = document.querySelector("#brush-color");
const brushSizeEl = document.querySelector("#brush-size");
const brushSlider = document.querySelector("#brush-slider");
const bucketColorBtn = document.querySelector("#bucket-color");
const eraser = document.querySelector("#eraser");
const {body} = document;

//Global Variables
let currentSize=10;
let bucketColor= "#000000";
let brushColor = "#ffffff";
let isBrush = true;

//Setting Canvas.
const canvas = document.createElement("canvas");
canvas.id = "canvas";
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

createCanvas();

brushIcon.addEventListener("click",switchToBrush);
