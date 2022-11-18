const body = document.querySelector("body");
const fragment = new DocumentFragment()
const section = document.createElement("section");
section.classList.add('about')
section.setAttribute('id', 'About')
const img = document.createElement("img");
img.classList.add('about_image')
img.src = "./image/aboutUs.jpg";
const div = document.createElement("div");
div.classList.add("about_tag"); 
const h1 = document.createElement("h1");
h1.innerText = 'About Us'
const p = document.createElement("p");
p.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda molestias atque laborum non fuga ex deserunt. Exercitationem velit ducimus praesentium, obcaecati hic voluptate id tenetur fuga illum quidem omnis? Rerum?'
div.append(h1, p);
fragment.append(img, div)
section.appendChild(fragment)
body.append(section);