// header

const body = document.querySelector("body");
const section = document.createElement("section");
section.classList.add("header");
const fragment = new DocumentFragment();
const nav = document.createElement("nav");
const div = document.createElement("div");
div.classList.add("logo");
nav.append(div);
const img = document.createElement("img");
img.src = "image/logo.png";
div.append(img);
const ul = document.createElement("ul");
ul.innerHTML += ` <li><a href="#Home">Home</a></li>
<li><a href="#Services">Services</a></li>
    <li><a href="#About">About</a></li>
    <li><a href="#Categories">Categories</a></li>
    <li onclick="showCart()"><a href="#Order">My Orders</a></li>`;
fragment.appendChild(ul);
nav.append(fragment);
section.append(nav);
body.append(section);

