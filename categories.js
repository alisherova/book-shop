const body = document.querySelector("body");
const section = document.createElement("section");
section.classList.add("arrivals");
section.setAttribute("id", "Categories");
let div3 = document.createElement("div");
div3.classList.add("category_header");
const h1 = document.createElement("h1");
h1.textContent = "Categories";
let icon = document.createElement("i");
icon.classList.add("fa-solid", "fa-cart-shopping");
let div4 = document.createElement("div");
div4.classList.add("cart_num");
div4.textContent = "0";

let cartDiv = document.createElement("div");
cartDiv.classList.add("detailedPage", "hidden");

icon.appendChild(div4);
div3.append(h1, icon);
let div1 = document.createElement("div");
let div2 = document.createElement("div");
div1.classList.add("arrivals_box");
div2.classList.add("detailedPage", "hidden");

const fragment = new DocumentFragment();

let booksData = [];

function showConsole(event){
  event.stopPropagation(); 
}
const stopFunc = (event) => {
  event.stopPropagation();
};

const closeModal = () => {
  cartDiv.classList.add("hidden");
  div2.classList.add("hidden");
};
cartDiv.addEventListener("click", closeModal);
div2.addEventListener("click", closeModal);
let numIndicator = "";
let orderedBooks = [];
let booksIds = [];
let total = [];

const addToCart = (id) => {
  !booksIds.includes(id) && numIndicator++;
  div4.textContent = `${numIndicator}`;
  booksData.filter((book) => {
    if (book.id === id && !booksIds.includes(id)) {
      orderedBooks.push(book);
      booksIds.push(book.id);
      total.push(book.saleInfo.listPrice.amount) 
    }
  });
  console.log(total);
};

let cartContent = document.createElement("div");
cartContent.classList.add("selectedBookDiv");

const deleteBook = (id) => {
  let b = orderedBooks.filter((book) => book.id == id)
  orderedBooks = orderedBooks.filter((book) => book.id !== id);
  booksIds = booksIds.filter((bookId) => bookId !== id); 
  total = total.filter((price) => price !== b[0].saleInfo.listPrice.amount);
  console.log(total);
  showCart();
  numIndicator--;
  div4.textContent = `${numIndicator}`;
  if (orderedBooks.length == 0) {
    cartContent.innerHTML = `<h2>No any ordered books left. Please choose one.</h2>`;
  }
};
function openForm(){
  wrapperForm.classList.remove('hidden')
}
let div7 = document.createElement("div");

let button2 = document.createElement("button");
let totalSum = document.createElement("p");
const showCart = () => {
  cartDiv.classList.remove("hidden");
  if (orderedBooks.length == 0) {
    cartContent.innerHTML = `<h3>You have not ordered yet. You can order by clicking <i>'add to bag'</i> or dragging the book image to <i>'add to bag' </i> button.</h3>`;
  } else {
    cartContent.innerHTML = "";
    cartContent.remove(button2);
    orderedBooks.forEach((item) => {
      let i = item.volumeInfo;
      cartContent.innerHTML += `<div id='${item.id}' onClick="stopFunc(event)">
          <div class="arrivals_tag detailedPage_div cart_page">
              <h3 class='detailedPage_tag'>${i.title}</h3>
              <p class='categorySpan'><span>Author: </span>${i.authors}</p>
              <p class='price categorySpan'><span>Price: </span> ${
                item.saleInfo.listPrice?.amount
                  ? "$" + item.saleInfo.listPrice.amount
                  : "$30.5"
              }</p>
              <div class="btn_group">
                <button onClick="deleteBook('${
                  item.id
                }')" class="arrivals_btn detailedPage_btn">Delete
                <i class="fa-solid fa-trash "></i>
                </button>
                <button class="arrivals_btn detailedPage_btn">
                  <a target='blank' href=${i.infoLink}>More Info</a>
                </button>
              </div>
              </div>
      </div>`;
      return cartContent;
    });
  }
  
  totalSum.textContent = `Total: $${total.reduce((a,b) => a + b, 0)}`
  button2.textContent = "Confirm";
  button2.classList.add("arrivals_btn", 'confirm_btn');
  (!orderedBooks.length == 0 && cartContent.append(totalSum, button2)) 
  cartDiv.append(cartContent);
  button2.onclick = openForm
  // button2.onclick = stopFunc(event)
};

const wrapperForm = document.querySelector('.wrapper_form')
function closeForm(){
  wrapperForm.classList.add('hidden')
}

div7.append(cartDiv);


// show description function

icon.addEventListener("click", showCart);

const showDesc = (id) => {
  div2.classList.remove("hidden");
  let selectedBook = booksData.filter((book) => book.id === id);
  selectedBook.forEach((item) => {
    let i = item.volumeInfo;
    div2.innerHTML = `<div class="selectedBookDiv" onClick="stopFunc(event)">
    <div class="arrivals_tag detailedPage_div">
        <h3 class='detailedPage_tag'>${i.title}</h3>
        <p class='categorySpan'><span>Author: </span>${i.authors}</p>
        <p class='categorySpan'><span>Category: </span> ${i.categories}</p>
        <div class='linkDiv'>
          <a class='detailedPage_link' target='blank' href='${
            item.saleInfo?.buyLink ? item.saleInfo?.buyLink : i.infoLink
          }'>Buy Here 
            <i class="fa-solid fa-cart-shopping "></i>
          </a>
          <a class='detailedPage_link' target='blank' href='${
            item.accessInfo.pdf?.acsTokenLink
              ? item.accessInfo.pdf?.acsTokenLink
              : "No availabe pdf yet."
          }'>Download Pdf 
            <i class="fa-solid fa-download"></i>
          </a>
        </div> 
          <p id=${item.id} class='description detailedPage_pr'>${
      i.description ? i.description : "No reviews yet."
    }</p>
        <div class="btn_group">
          <button onClick="closeModal()" class="arrivals_btn detailedPage_btn"> Close </button>
          <button class="arrivals_btn detailedPage_btn">
            <a target='blank' href=${i.infoLink}>More Info</a>
          </button>
        </div>
    </div>
  </div>`;
  });
};


// drag and drop
let dragItem = null;
function dragStart(id) {
  document.querySelectorAll(".dareggedDiv").forEach((e) => {
    if (e.id == id) {
      e.style.opacity = "0.5";
    }
  });
  document.getElementById(`${id}_btn`).style.boxShadow = "0px 0px 20px gray";
  document.getElementById(`${id}_btn`).style.scale = "1.2";
}

function dragEnd(id) {
  document.querySelectorAll(".dareggedDiv").forEach((e) => {
    if (e.id == id) {
      e.style.opacity = "1";
    }
  });
  document.getElementById(`${id}_btn`).style.boxShadow = "0px 0px 0px gray";
  document.getElementById(`${id}_btn`).style.scale = "1";
}

function dragOver(event) {
  event.preventDefault();
}

function dragLeave(event) {
  event.preventDefault();
}

function drop(id, event) {
  event.preventDefault();
  addToCart(id);
  document.querySelector(".dareggedDiv").style.opacity = "1";
  document.querySelector(".cartBtn").style.boxShadow = "0px 0px 0px gray";
  document.querySelector(".cartBtn").style.scale = "1";
}


// fetch data

async function getData() {
  const response = await fetch("./books.json");
  const data = await response.json();
  return data;
}

getData().then((data) => {
  booksData = data.items;
  booksData.forEach((item) => {
    let i = item.volumeInfo;
    div1.innerHTML += `<div class="arrivals_card">
    <div class="arrivals_image" ondragstart="dragStart('${
      item.id
    }')" ondragend="dragEnd('${item.id}',(event))" draggable="true">
      <img src="${i.imageLinks.thumbnail}" alt="${i.title}"></img>
    </div>  
    <div ondrop="drop('${
      item.id
    }',(event))" ondragleave="dragLeave(event)" class="arrivals_tag">
      <div ondragover="dragOver(event)" id=${item.id} class='dareggedDiv'>
      <h3>${i.title}</h3>
      <div>
      <p class='categorySpan'><span>Author: </span>${i.authors}</p>
        <p class='price categorySpan'><span>Price: </span> ${
          item.saleInfo.listPrice?.amount
            ? "$" + item.saleInfo.listPrice.amount
            : "$30.5"
        }</p>
      </div>
        <p id=${item.id} class='description prHeight'>${
      i.description ? i.description : "No reviews yet."
    }</p>
      <div class="arrivals_icon">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star-half-stroke"></i>
      </div>
      </div>
      <div  class="btn_group">
        <button onClick="showDesc('${
          item.id
        }')" class="arrivals_btn"> Learn More </button>
        <button id=${item.id}_btn onClick="addToCart('${
      item.id
    }')" class="arrivals_btn cartBtn">Add to Bag</button>
      </div>
      </div>
      </div>`;
  });
});
fragment.append(div3, div1, div2, cartDiv);
section.append(fragment);
body.appendChild(section);
