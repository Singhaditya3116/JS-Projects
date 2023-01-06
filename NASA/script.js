const cardsContainer = document.querySelector(".cards-container");
const addAlertToogle = document.querySelector(".alert");

//NASA API
const count=3;
const apiKey = "DEMO_KEY"
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
    resultsArray.forEach((card) => {
      // console.log(card);
      createCard(card);
    })
  }
  catch(error){
    console.log(error);
  }
}

function addToFavorite(itemUrl){
  // console.log("clicked",arg);
  resultsArray.forEach((element) => {
      if(element.url.includes(itemUrl) && favoritesObject[itemUrl] === undefined)
      {
        favoritesObject[itemUrl] = element;
        localStorage.setItem(itemUrl,JSON.stringify(element));
        //Show Add Confirmation for 2secs.
        addAlertToogle.hidden = false;
        setTimeout(()=>{
          addAlertToogle.hidden = true;
        },1500)
      }
  })
  
  console.log(favoritesObject);
}

function createCard(card){

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
  addFavoriteBtn.setAttribute("onclick",`addToFavorite("${url}")`);
  addFavoriteBtn.textContent="Add to Favorites";
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