const cardsContainer = document.querySelector(".cards-container");
const favoritesBtn = document.querySelector("#favorites");
const addAlertToogle = document.querySelector(".alert");
const resultNavBar = document.getElementById("results-nav");
const favoritesNavbar = document.getElementById("favorites-nav")
const loadNewBtn = document.getElementById("load-new");


//NASA API
const count=10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favoritesObject = {};

//Get Data from NASA API.

async function getNasaData()
{
  try{
    const response = await fetch(apiUrl);
    // console.log(response);
    resultsArray = await response.json();
    console.log(resultsArray);
    cardsContainer.innerHTML="";
    resultsArray.forEach((card) => {
      // console.log(card);
      createCard(card,false);
    })
  }
  catch(error){
    console.log(error);
  }
}

function addToFavorite(itemUrl){
  // console.log("clicked",arg);
  resultsArray.forEach((element) => {
      if(element.url.includes(itemUrl) && !favoritesObject[itemUrl])
      {
        favoritesObject[itemUrl] = element;

        //Show Add Confirmation for 2secs.
        addAlertToogle.hidden = false;
        setTimeout(()=>{
          addAlertToogle.hidden = true;
        },1500);
        console.log(favoritesObject);
        //Set Favorites in localStorage.
        localStorage.setItem("nasaFavorites",JSON.stringify(favoritesObject));
      }
  })
  
}
//Remove card from favorites Section
function removeFromFavorite(itemUrl)
{
  console.log(favoritesObject);
  delete favoritesObject[itemUrl];
  console.log(favoritesObject);
  localStorage.setItem("nasaFavorites",JSON.stringify(favoritesObject));
  showFavoritesCard();
}

//Show favorites card from localStorage;
function showFavoritesCard()
{
  resultNavBar.classList.add("hidden");
  favoritesNavbar.classList.remove("hidden");
  favoritesObject = JSON.parse(localStorage.getItem("nasaFavorites"));
  
  const cards = Object.values(favoritesObject);
  // console.log(cards);
  cardsContainer.innerHTML = "";
  cards.forEach((card)=>{
    createCard(card,true);
  })
}

function loadMoreNasaImages()
{
  resultNavBar.classList.remove("hidden");
  favoritesNavbar.classList.add("hidden");
  cardsContainer.innerHTML="";
  getNasaData();
}

function createCard(card,isFavorite){

  const {hdurl,url,title,explanation,date} = card;
  let copyright = card.copyright;
  copyright = (copyright == undefined) ? "Unknown" : copyright;
  //Card Container
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");

  //Card Image
  const cardImageContainer = document.createElement("div");
  cardImageContainer.classList.add("card-image");
  const linkTag = document.createElement("a");
  linkTag.setAttribute("href",hdurl);
  linkTag.setAttribute("target","_blank");
  const imgTag = document.createElement("img");
  imgTag.setAttribute("src",url);
  imgTag.setAttribute("alt","NASA Image");

  linkTag.appendChild(imgTag);
  cardImageContainer.appendChild(linkTag);

  //Card Body
  const cardBodyContainer = document.createElement("div");
  cardBodyContainer.classList.add("card-body");
  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = `${title}`;
  const addFavoriteBtn = document.createElement("button");
  addFavoriteBtn.setAttribute("id","add-favorite");
  if(!isFavorite)
  {
    
    addFavoriteBtn.setAttribute("onclick",`addToFavorite("${url}")`);
    addFavoriteBtn.textContent="Add to Favorites";
  }
  else
  {
    addFavoriteBtn.setAttribute("onclick",`removeFromFavorite("${url}")`);
    addFavoriteBtn.textContent="Remove from Favorites";
  }
  const details = document.createElement("div");
  details.classList.add("details");
  details.textContent = `${explanation}`;

  const authorDetails = document.createElement("div");
  authorDetails.classList.add("author-details");
  const dateEl = document.createElement("div");
  dateEl.classList.add("date");
  dateEl.textContent = `${date}`;
  const authorName = document.createElement("div");
  authorName.classList.add("author-name");
  authorName.textContent=`${copyright}`;

  authorDetails.append(dateEl,authorName);
  cardBodyContainer.append(cardTitle,addFavoriteBtn,details,authorDetails);

  cardContainer.append(cardImageContainer,cardBodyContainer);
  // console.log(cardContainer);

  cardsContainer.appendChild(cardContainer);
}



//onLoad
getNasaData();
// createCard();


//Event Listeners
favoritesBtn.addEventListener("click",showFavoritesCard);
loadNewBtn.addEventListener("click",getNasaData);