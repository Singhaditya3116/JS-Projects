
// Get Quotes From API.
let apiQuotes = [];
const btn = document.getElementById("new-quote");
const quote = document.getElementById("quote");
const author = document.getElementById("author");

async function getQuotes()
{
  const apiURL = "https://type.fit/api/quotes";

  const quotesArray = await fetch(apiURL);
  apiQuotes = await quotesArray.json();
  console.log(apiQuotes);
}

btn.addEventListener("click",function(){
  let randomNumber = Math.floor(Math.random()*apiQuotes.length);
  quote.innerHTML = apiQuotes[randomNumber].text;
  author.innerHTML = apiQuotes[randomNumber].author;
})


getQuotes();