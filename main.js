const body = document.querySelector('body')
const fragment = new DocumentFragment();
const main = document.createElement("main");
main.setAttribute('id', 'Home')
const div = document.createElement("div");
div.classList.add("main_tag"); 
const h1 = document.createElement("h1");
h1.innerText = 'WELCOME TO BOOK STORE!'
const p = document.createElement("p");
p.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda molestias atque laborum non fuga ex deserunt. Exercitationem velit ducimus praesentium, obcaecati hic voluptate id tenetur fuga illum quidem omnis? Rerum?'
div.append(h1, p);
const img = document.createElement("img");
img.src = "./gif.gif";
fragment.append(div,img)
main.append(fragment)
body.append(main);


