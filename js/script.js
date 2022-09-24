const toggleDiv = document.querySelector(".toggle-switch");
const checkbox = document.querySelector("#box");
const body = document.querySelector("body");
const infoDiv = document.querySelector(".info-div");
const units = document.querySelectorAll(".units");
const dataP = document.querySelectorAll(".data");

const inputNumber = document.querySelector("#number-to-convert");
const btn = document.querySelector("#btn");
const lengthP = document.querySelector("#length-data");
const volumeP = document.querySelector("#volume-data");
const massP = document.querySelector("#mass-data");

const meterToFeetRatio = 3.28;
const feetToMeterRatio = 1 / 3.28;
const litersToGallonsRatio = 1 / 3.78;
const gallonsToLitersRatio = 3.78;
const kilogramsToPoundsRatio = 2.2;
const PoundsToKilogramsRatio = 1 / 2.2;

let modeStatus = false;

let oldValue = 0;

let paragraphs = [lengthP, volumeP, massP];

let data = [
  {
    name: "feets",
    value: 0,
    ratio: meterToFeetRatio,
  },
  {
    name: "meters",
    value: 0,
    ratio: feetToMeterRatio,
  },
  {
    name: "gallons",
    value: 0,
    ratio: litersToGallonsRatio,
  },
  {
    name: "liters",
    value: 0,
    ratio: gallonsToLitersRatio,
  },
  {
    name: "pounds",
    value: 0,
    ratio: kilogramsToPoundsRatio,
  },
  {
    name: "kilograms",
    value: 0,
    ratio: PoundsToKilogramsRatio,
  },
];

darkMode();
render(paragraphs, data);

checkbox.addEventListener("change", darkMode);

if (window.innerWidth < 700) {
  toggleDiv.style.top = "50px";
} else {
  toggleDiv.style.top = "-13px";
}

inputNumber.addEventListener("focus", function () {
  if (Number(window.innerWidth) < 700) {
    toggleDiv.style.top = "-15px";
    toggleDiv.style.transition = "all 0.3s";
  }
});

inputNumber.addEventListener("blur", function () {
  if (window.innerWidth < 700) {
    toggleDiv.style.top = "50px";
    toggleDiv.style.transition = "all 0.3s";
  }
});

document.body.addEventListener("keydown", function (event) {
  let code = 13;
  if (event.keyCode == code) {
    calculate();
  }
});

btn.addEventListener("click", calculate);

function darkMode() {
  localStorage.setItem("status", checkbox.checked);

  if (JSON.parse(localStorage.getItem("status"))) {
    body.style.backgroundColor = "#1C1C1C";
    infoDiv.style.backgroundColor = "#1F2937";
    for (let i = 0; i < units.length; i++) {
      units[i].style.backgroundColor = "#273549";
      dataP[i].style.color = "#fff";
    }
    body.style.transition = "all 0.3s";
    modeStatus = true;
    localStorage.setItem("status", modeStatus);
  } else {
    body.style.backgroundColor = "var(--clr-bg)";
    infoDiv.style.backgroundColor = "var(--clr-d-white)";
    for (let i = 0; i < units.length; i++) {
      units[i].style.backgroundColor = "var(--clr-white)";
      dataP[i].style.color = "var(--clr-gray)";
    }
    body.style.transition = "all 0.3s";
  }
}

function calculate() {
  oldValue = inputNumber.value;
  convert(oldValue, data);
  clearInput(inputNumber);
  render(paragraphs, data);
}

function convert(num, arr) {
  for (let i = 0; i < data.length; i++) {
    let newValue = num * arr[i].ratio;
    arr[i].value = newValue.toFixed(2);
  }
}

function render(paragraph, units) {
  let x = 0;
  for (let i = 0; i < paragraph.length; i++) {
    switch (i) {
      case 0:
        x = 0;
        break;
      case 1:
        x = 2;
        break;
      case 2:
        x = 4;
        break;
    }
    paragraph[i].textContent = `${oldValue} ${units[x + 1].name} = ${
      units[x].value
    } ${units[x].name} | ${oldValue} ${units[x].name} = ${units[x + 1].value} ${
      units[x + 1].name
    }`;
  }
}

function clearInput(input) {
  input.value = "";
}
