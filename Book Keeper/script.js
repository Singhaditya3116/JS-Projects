const addBookmarkBtn = document.getElementById("add-bookmark-btn");
const modal = document.getElementsByClassName("modal")[0];
const closeModal = document.getElementById("close-modal");
const container = document.getElementsByClassName("container")[0];
const webNameEl = document.getElementById("web-name");
const webUrlEL = document.getElementById("web-url");
const bookmarkForm = document.getElementById("bookmark-form");
const bookmarkContainer = document.querySelector(".bookmarks-container");
const bookmarkDeleteIcon = "https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Cross_icon_%28white%29.svg/800px-Cross_icon_%28white%29.svg.png";
let deleteBookmarkBtn = document.querySelectorAll("#bookmark-delete-icon");

let bookmarkArray = [];



function showModal()
{
  modal.hidden=false;
  document.body.classList.add("body-modal");
}

function hideModal()
{
  modal.hidden=true;
  document.body.classList.remove("body-modal");
}

//validateForm
function validate(nameValue, urlValue) {
  const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields.');
    return false;
  }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address.');
    return false;
  }
  
  // Valid
  return true;
}

// Get data from form and append it to bookmaark array.
function addBookmarkToList(e)
{
  e.preventDefault();
  // console.log(e);
  let nameValue = webNameEl.value;
  let urlValue = webUrlEL.value;
  //console.log(nameValue,urlValue);
  if(!urlValue.includes("https://") && !urlValue.includes("http://"))
  {
    urlValue = `https://${urlValue}`;
  }
  if(!validate(nameValue,urlValue))
  {
    return false;
  }
  
  let bookmarkItem = {
    name:nameValue,
    url:urlValue
  };
  bookmarkArray.push(bookmarkItem);
  // console.log(bookmarkArray);
  bookmarkForm.reset();
  webNameEl.focus();
  localStorage.setItem("bookmarks",JSON.stringify(bookmarkArray));
  buildBookmark();
  hideModal();
  return true;
}

// create bookmark item and append it in container
function buildBookmark()
{
  // Remove all bookmark Elements
  bookmarkContainer.innerHTML="";
  // build bookmark from bookmark array.
  bookmarkArray.forEach((bookmarkItem)=>{
    const {name,url} = bookmarkItem;
    let divContainer = document.createElement("div");
    divContainer.className ="bookmark-items";

    let anchorTag = document.createElement("a");
    anchorTag.setAttribute("href",url);
    anchorTag.setAttribute("target","_blank");
    let text = document.createTextNode(name);
    anchorTag.appendChild(text);
    
    let imgTag = document.createElement("img");
    imgTag.setAttribute("src",bookmarkDeleteIcon);
    imgTag.setAttribute("title","Delete Bookmark");
    imgTag.setAttribute("onclick",`deleteBookmarkItem('${url}')`);
    imgTag.id="bookmark-delete-icon";

    divContainer.appendChild(anchorTag);
    divContainer.appendChild(imgTag);
    bookmarkContainer.appendChild(divContainer);
  })
  
}

// Fetch Bookmarks from localStorage.
function fetchBookmarks()
{
  if(localStorage.getItem("bookmarks"))
  {
    bookmarkArray = JSON.parse(localStorage.getItem("bookmarks"));
  }
  else
  {
    bookmarkArray = [
      {
        name:"Google",
        url:"https://google.com"
      }
    ]
    localStorage.setItem("bookmarks",JSON.stringify(bookmarkArray));
  }
  buildBookmark();
}

function deleteBookmarkItem(urlValue)
{
  let index=-1;
  for(let i=0;i<bookmarkArray.length;i++)
  {
    if(bookmarkArray[i].url === urlValue)
    {
      index=i;
      break;
    }
  }
  bookmarkArray.splice(index,1);
  if(bookmarkArray.length > 0)
  {
    localStorage.setItem("bookmarks",JSON.stringify(bookmarkArray));
  }
  else
  {
    localStorage.removeItem("bookmarks");
  }
  buildBookmark();
}

//Event Listeners
addBookmarkBtn.addEventListener("click",showModal);
closeModal.addEventListener("click",hideModal);
bookmarkForm.addEventListener("submit",addBookmarkToList);

//on load, load data from localStorage
fetchBookmarks();