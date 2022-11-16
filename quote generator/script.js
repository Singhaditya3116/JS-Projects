
// Get Quotes From API.
let apiQuotes = [];

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter-button");

//Get Quotes from API and append in array.
async function getQuotes()
{
  const apiURL = "https://type.fit/api/quotes";
  try{
    const quotesArray = await fetch(apiURL);
    apiQuotes = await quotesArray.json();
    console.log(apiQuotes);
    newQuotes();
  }catch(error){
    console.log("error",error);
  }
}
getQuotes();

// Get random Quotes from array and display it in UI.
function newQuotes(){
  let randomNumber = Math.floor(Math.random()*apiQuotes.length);
  
  //If author name is NULL,Keep the author name as Unknown
  if(apiQuotes[randomNumber].author === null)
  {
    authorText.textContent ="Unknown";
  }
  else
  {
    authorText.textContent = apiQuotes[randomNumber].author;
  }
  
  //Checking quotes length and applying css if length is too big.
  if(apiQuotes[randomNumber].text.length > 120)
  {
    quoteText.classList.add("long-quote");
  }
  else
  {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = apiQuotes[randomNumber].text;
}

//Tweet Quote.
function tweetQuote()
{
  const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl,"_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click",newQuotes)

twitterBtn.addEventListener("click",tweetQuote)


