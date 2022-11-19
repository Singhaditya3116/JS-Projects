// Unsplash API
const count=6;
const apiKey = "wEJawa1hK7wHScECo1eR9S6Ao5GbcLtEt5nYPGXHVf8";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById("image-container"); 
let photosArray = [];

//Get photos from Unsplash API
async function getPhotos(){

  try{
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  }catch(error){
    console.log("Error",error);
  }

}

//Creating elements for photos and appending it to the DOM.
function displayPhotos(){
  let result="";

  photosArray.forEach((photo)=>{
    // result += `
    // <a href=${photo.links.html}>
    //   <img src=${photo.urls.regular} alt=${photo.alt_description} title=${photo.alt_description}>
    // </a>
    // `

    //Create a to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href",photo.links.html);
    item.setAttribute("target","_blank");

    //Create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src",photo.urls.regular);
    img.setAttribute("alt",photo.alt_description);
    img.setAttribute("title",photo.alt_description);

    //Put <img> inside <a>
    item.appendChild(img);
    //appending <a> to image-container
    imageContainer.appendChild(item);
  })
  console.log(result);
  //imageContainer.innerHTML = result;
  
}
getPhotos();

var prevOffsetHeight = 0;
var currOffsetHeight=0;
var isLoad = false;

window.addEventListener("scroll",()=>{
  //console.log("Scrolled");

  if(window.scrollY > (document.body.offsetHeight - window.innerHeight - 100))
  {
    currOffsetHeight = (document.body.offsetHeight - window.innerHeight - 100);

    if(isLoad && (prevOffsetHeight != currOffsetHeight)) // if offsite height has changed then load when we reach bottom
    {
      isLoad=false;
    }

    if(!isLoad)  //Scroll has reached bottom and we need to load photos
    {
      getPhotos();
      console.log("Load more");
      prevOffsetHeight = currOffsetHeight;
      isLoad = true;
    }
  }
})

