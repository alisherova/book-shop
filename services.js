const datas = [
  {
    id: 1,
    icon: "fa-truck-fast",
    title: "Fast Delivery",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    icon: "fa-headset",
    title: "24 x 7 Services",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    id: 3,
    icon: "fa-tag",
    title: "Best Deal",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
  {
    id: 4,
    icon: "fa-lock",
    title: "Secure Payment",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
];

const body = document.querySelector("body");
const fragment = new DocumentFragment()
const section = document.createElement("section");
section.classList.add("services_box", 'services');
section.setAttribute('id', 'Services')

datas.forEach((data) => {
  const div = document.createElement("div");
  div.classList.add("services_card");
  const i = document.createElement("i");
  i.classList.add('fa-solid', data.icon);
  const h3 = document.createElement("h3");
  h3.textContent = data.title;
  const p = document.createElement("p");
  p.textContent = data.desc;

  div.append( i,h3, p);
  fragment.append(div);
  section.append(fragment);
});
body.append(section);