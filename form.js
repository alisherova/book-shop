const nameInput = document.getElementById("name");
const SurnameInput = document.getElementById("Surname");

nameInput.onchange = () => {
  lettersAndSpaceCheck("name", "nameSpan");
};
SurnameInput.onchange = () => {
  lettersAndSpaceCheck("Surname", "SurnameSpan");
};

function lettersAndSpaceCheck(idName, spanName) {
  let letter = /^[A-Za-z]+$/;
  if (nameInput.value.length < 4 && nameInput.value.match(letter)) {
    document.getElementById("nameSpan").textContent =
      "you should enter a least 4 letters";
  } else if (
    SurnameInput.value.length < 5 &&
    SurnameInput.value.match(letter)
  ) {
    document.getElementById("SurnameSpan").textContent =
      "you should enter a least 5 letters";
  } else if (document.getElementById(`${idName}`).value.match(letter)) {
    document.getElementById(`${spanName}`).textContent = "";
    return true;
  } else {
    document.getElementById(`${spanName}`).textContent =
      "Please enter only letters without spaces";
  }
}

const dateInput = document.querySelector('input[type="date"]');

dateInput.onchange = () => {
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
  }
};

var checks = document.querySelectorAll("input[type='checkbox']");
var max = 2;
for (var i = 0; i < checks.length; i++) checks[i].onclick = selectiveCheck;
function selectiveCheck(event) {
  var checkedChecks = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );
  if (checkedChecks.length >= max + 1) return false;
}

const form = document.querySelector("form");
const formSummary = document.querySelector(".form-summary");
formSummary.classList.add("detailedPage", "hidden");
const Street = document.getElementById("Street");
const House = document.getElementById("House");
const Flat = document.getElementById("Flat");
const cashPayType = document.getElementById("flip_heads");
const checkboxes = document.getElementsByName("gift");

const stopFunction = (event) => {
  event.stopPropagation();
};

const closePopup = () => {
  formSummary.classList.add("hidden");
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
        <h3 class='detailedPage_tag'>Something</h3>
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
