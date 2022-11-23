const nameInput = document.getElementById("name");
const SurnameInput = document.getElementById("Surname");
const form = document.querySelector("form");
const formSummary = document.querySelector(".form-summary");
formSummary.classList.add("detailedPage", "hidden");
const Street = document.getElementById("Street");
const House = document.getElementById("House");
const Flat = document.getElementById("Flat");
const cashPayType = document.getElementById("flip_heads");
const checkboxes = document.getElementsByName("gift");

nameInput.onchange = () => {
  lettersAndSpaceCheck("name", "nameSpan");
  enable();
};
SurnameInput.onchange = () => {
  lettersAndSpaceCheck("Surname", "SurnameSpan");
  enable();
};

function checkLength() {
  if (Street.value.length > 5) return true;
}

Street.onchange = () => {
  checkLength();
  enable();
};

function checkMin() {
  if (House.value > 1) return true;
}

House.onchange = () => {
  checkMin();
  enable();
};

let numPattern = "^[1-9]+[0-9]*$";
let dashPattern = /^[-1-9–]+[-0-9–]*$/;
function checkPattern() {
  if (Flat.value.match(dashPattern) &&  Flat.value.match(numPattern)) {
    document.getElementById("flatSpan").textContent = " ";
    return true;
  } 
}

Flat.onchange = () => {
  checkPattern();
  enable();
};

function checkCashPayType() {
  let checkedChecks = document.querySelectorAll("input[type='radio']:checked");
  if (checkedChecks.length == 1) return true;
}

let radios = document.querySelectorAll("input[type='radio']");
radios.forEach(
  (e) =>
    (e.onchange = () => {
      checkCashPayType();
      enable();
    })
);

function enable() {
  if (
    checkDate() === true &&
    checkLength() === true &&
    checkMin() === true &&
    checkPattern() === true &&
    checkCashPayType() === true
  ) {
    document.getElementById("completeBtn").removeAttribute("disabled");
  }
}

function lettersAndSpaceCheck(idName, spanName) {
  let letter = /^[A-Za-z]+$/;
  if (nameInput.value.length < 4 && nameInput.value.match(letter)) {
    document.getElementById("nameSpan").textContent =
      "you should enter a least 4 letters";
    return false;
  } else if (
    SurnameInput.value.length < 5 &&
    SurnameInput.value.match(letter)
  ) {
    document.getElementById("SurnameSpan").textContent =
      "you should enter a least 5 letters";
    return false;
  } else if (document.getElementById(`${idName}`).value.match(letter)) {
    document.getElementById(`${spanName}`).textContent = "";
    enable();
    return true;
  } else {
    document.getElementById(`${spanName}`).textContent =
      "Please enter only letters without spaces";
    return false;
  }
}

const dateInput = document.querySelector('input[type="date"]');
function checkDate() {
  let n = new Date(dateInput.value);
  let m = n.getDate() + 1;
  if (
    n.getDate() == new Date().getDate() &&
    n.getMonth() == new Date().getMonth() &&
    n.getFullYear() == new Date().getFullYear()
  ) {
    document.getElementById(
      "dateSpan"
    ).textContent = `It can not be delivered earlier than ${m}/${n.getMonth()}/${n.getFullYear()}`;
    return false;
  } else if (dateInput.value === "") return false;
  else return true;
}
dateInput.onchange = () => {
  checkDate();
  enable();
};

let checks = document.querySelectorAll("input[type='checkbox']");
let max = 2;
for (let i = 0; i < checks.length; i++) checks[i].onclick = selectiveCheck;
function selectiveCheck() {
  let checkedChecks = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );
  if (checkedChecks.length >= max + 1 || checkedChecks.length == 0)
    return false;
  else if (checkedChecks.length == 2) return true;
}

const stopFunction = (event) => {
  event.stopPropagation();
};

const closePopup = () => {
  formSummary.classList.add("hidden");
  document.querySelector(".wrapper_form").classList.add("hidden");
};
formSummary.addEventListener("click", closePopup);
form.onsubmit = (e) => {
  e.preventDefault();
  let checkedBoxes = "";
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkedBoxes += checkboxes[i].value + ", ";
    }
  }
  formSummary.classList.remove("hidden");
  formSummary.innerHTML = `<div class="selectedBookDiv" onClick="stopFunction(event)">
    <div class="arrivals_tag detailedPage_div">
        <h3 class='detailedPage_tag'>Personal information</h3>
        <p class='categorySpan'><span>Name : </span>${nameInput.value}</p>
        <p class='categorySpan'><span>Surname : </span> ${
          SurnameInput.value
        }</p>
        <p class='categorySpan'><span>Delivery date : </span> ${
          dateInput.value
        }</p>
        <div>
          <p class='categorySpan'><span>Street : </span> ${Street.value}</p>
          <p class='categorySpan'><span>House : </span> ${House.value}</p>
          <p class='categorySpan'><span>Flat : </span> ${Flat.value}</p>
        </div>
        <p id='payType' class='categorySpan'><span>Payment type : </span> ${
          cashPayType.checked ? "cash" : "card"
        }</p>
        <p class='categorySpan'><span>Gifts : </span> ${checkedBoxes}</p>
        <div class="btn_group">
          <button onClick="closePopup()" class="arrivals_btn detailedPage_btn"> Close </button>
        </div>
    </div>
  </div>`;
  e.target.reset();
};
