const BASEURL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".btn");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

window.addEventListener("load", () => {
  updatexchange();
});

//for shawing all contries
for (let select of dropdown) {
  for (currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

//updating flags
const updateflag = (element) => {
  let currCOde = element.value;
  let cuntrycode = countryList[currCOde];
  let newsrc = `https://flagsapi.com/${cuntrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updatexchange();
});

// find exchange rate
const updatexchange = async () => {
  let amount = document.querySelector(".amount input");
  let amuVAl = amount.value;
  if (amuVAl === "" || amuVAl < 0) {
    amuVAl = 1;
    amuVAl.value = "1";
  }
  const URL = `${BASEURL}/${fromcurr.value.toLowerCase()}.json`;
  let respons = await fetch(URL);
  let data = await respons.json();
  let rate = data[fromcurr.value.toLowerCase()];
  let exvalue = rate[tocurr.value.toLowerCase()];
  let finalamu = amuVAl * exvalue;
  msg.innerText = `${amuVAl} ${fromcurr.value} = ${finalamu} ${tocurr.value}`;
};
