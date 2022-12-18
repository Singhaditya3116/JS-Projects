const addBookmarkBtn = document.getElementById("add-bookmark-btn");
const modal = document.getElementsByClassName("modal")[0];
const closeModal = document.getElementById("close-modal");
const container = document.getElementsByClassName("container")[0];
const webNameEl = document.getElementById("web-name");
const webUrlEL = document.getElementById("web-url");
const bookmarkForm = document.getElementById("bookmark-form");
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
  
  //hideModal();
}


//Event Listeners
addBookmarkBtn.addEventListener("click",showModal);
closeModal.addEventListener("click",hideModal);
bookmarkForm.addEventListener("submit",addBookmarkToList);