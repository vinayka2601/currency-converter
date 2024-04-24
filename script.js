
const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")

const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
  updateExchangeRate();
})

for (let select of dropdowns) {
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
    updateFlag(evt.target);
  })
}
const updateFlag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();

});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1"
  }


  const url = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  // console.log(response);

  let data = await response.json();
  // console.log(data);

  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  //console.log(rate);

  let finalAmount = amtVal * rate;
  //       1 USD = 80 INR
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}