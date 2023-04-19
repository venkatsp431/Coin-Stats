// let tableContent = document.getElementsByClassName("table");
let row = document.getElementById("row");

let pagination = document.querySelector(".pagination");

const rowsperPage = 6;
let totalPages;
let currentPage = 1;
let lastpage, pagelink, pageLi;
let index = 1;
async function fetchURL() {
  const res = await fetch("https://api.coinstats.app/public/v1/coins");
  const res1 = await res.json();
  console.log(res1.coins);
  totalPages = res1.coins.length / rowsperPage;

  for (let i = 1; i <= totalPages; i++) {
    const lio = document.createElement("li");
    lio.classList.add("page-item", "dynamic");
    const ao = document.createElement("a");
    ao.className = "page-link";
    ao.href = "#";
    ao.innerHTML = i;
    ao.setAttribute("data-page", i);
    lio.appendChild(ao);
    lio.className = "mb-5";
    pagination.insertBefore(lio, pagination.querySelector(".next"));
  }
  init(res1);
  pagelink = pagination.querySelectorAll("a");
  lastpage = pagelink.length - 2;
  pageLi = pagination.querySelectorAll("li");
  pageLi[1].classList.add("active");

  pageRunner(pagelink, 6, lastpage, pageLi, res1);
}
fetchURL();
function init(res1) {
  index = 1;
  for (let i = 0; i < 6; i++) {
    row.innerHTML += `<div class="col-md-3">
    <div class="card" style="width: 14rem; box-shadow:0 2px 8px #000; margin:20px 20px; padding:15px;">
  <img src="${
    res1.coins[i].icon
  }" class="card-img-top" style="width:50px; margin:0 15%" alt="...">
  <div class="card-body">
  <h3 class="card-title">${res1.coins[i].name}</h3>
  <p class="mb-1"><b>Rank : </b>${res1.coins[i].rank}</p>
  
    <p class="card-text"><b>Price : </b>${res1.coins[i].price.toFixed(
      2
    )} USD</p>
  </div>
</div></div>"`;
  }
}
function pageRunner(page, items, lastPage, active, res1) {
  for (let button of page) {
    button.onclick = (e) => {
      const page_num = e.target.getAttribute("data-page");
      const page_mover = e.target.getAttribute("id");
      if (page_num != null) {
        index = page_num;
      } else {
        if (page_mover === "next") {
          index++;
          if (index >= lastPage) index = lastPage;
        } else {
          index--;
          if (index <= 1) index = 1;
        }
      }
      row.innerHTML = "";
      pageMaker(index, items, active, res1);
    };
  }
}
function pageMaker(index, items, activePage, res1, lios) {
  activePage.forEach((n) => n.classList.remove("active"));
  activePage[index].classList.add("active");

  if (index > 1) {
    activePage[0].classList.remove("disabled");
    activePage[0].style.cursor = "pointer";
  }
  if (index === 1) activePage[0].classList.add("disabled");
  if (index === lastpage)
    activePage[activePage.length - 1].classList.add("disabled");
  if (index < lastpage)
    activePage[activePage.length - 1].classList.remove("disabled");
  const start = items * index;
  const end = start + items;

  const currentPageDisplay = res1.coins.slice(start - items, end - items);
  for (let i = 0; i < currentPageDisplay.length; i++) {
    let item = currentPageDisplay[i];

    row.innerHTML += `<div class="col-md-3">
    <div class="card" style="width: 14Rem; box-shadow:0 2px 8px #000; margin:20px 20px; padding:15px;">
  <img src="${
    item.icon
  }" class="card-img-top" style="width:50px; margin:0 15%" alt="...">
  <div class="card-body">
  <h3 class="card-title">${item.name}</h3>
  <p class="mb-1"><b>Rank : </b>${item.rank}</p>
  
    <p class="card-text"><b>Price : </b>${item.price.toFixed(2)} USD</p>
  </div>
</div></div>"`;
  }
}
