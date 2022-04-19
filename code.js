const disOperate = document.querySelector(".operate");
const result = document.querySelector(".result");

const equalSign = document.querySelector(".equal");
const operateSign = document.querySelectorAll(".sign");
const digitBtn = document.querySelectorAll(".digit");
const clearAll = document.querySelector(".ac");
const onBtn = document.querySelector(".on");
const pointBtn = document.querySelector(".point");
const clearOne = document.querySelector(".clearOne");

const display = document.querySelector(".display");

let operand = null;
let number1 = "";
let number2 = "";

let blocked = true;

window.addEventListener("keydown", keyBoard);

onBtn.addEventListener("click", () => {
  display.classList.toggle("light");
  onBtn.textContent === "OFF"
    ? (onBtn.textContent = "ON")
    : (onBtn.textContent = "OFF");
});

digitBtn.forEach((digit) => {
  digit.addEventListener("click", () => getNumber(digit));
});

operateSign.forEach((opSign) => {
  opSign.addEventListener("click", () => setOperator(opSign));
});

equalSign.addEventListener("click", evaluate);

pointBtn.addEventListener("click", addPoint);

clearOne.addEventListener("click", clearNum);

clearAll.addEventListener("click", clear);

function getNumber(digit) {
  if (operand !== null || disOperate.textContent === "")
    result.textContent += digit.value;
  blocked = true;
}
function setOperator(opSign) {
  if (operand !== null && blocked) evaluate();
  if (blocked) number1 = result.textContent;
  operand = opSign.value;
  disOperate.textContent = `${number1} ${operand}`;
  result.textContent = "";
  blocked = false;
}

function evaluate() {
  if (operand === null) return;
  number2 = result.textContent;
  result.textContent = "";
  disOperate.textContent = `${number1} ${operand} ${number2}`;
  result.textContent = operate(number1, operand, number2);
  operand = null;
}

function addPoint() {
  result.textContent.includes(".")
    ? pointBtn.removeEventListener("click", addPoint)
    : (result.textContent += pointBtn.value);

  pointBtn.addEventListener("click", addPoint);
}

function clearNum() {
  if (operand !== null || disOperate.textContent === "")
    result.textContent = result.textContent.slice(0, -1);
}

function clear() {
  operand = null;
  number1 = "";
  number2 = "";
  disOperate.textContent = "";
  result.textContent = "";
}

function keyBoard(e) {
  e["value"] = e["key"];
  if (e.value >= 0 && e.value <= 9) getNumber(e);
  if (e.value === "+" || e.value === "-" || e.value === "*" || e.value === "/")
    setOperator(e);
  if (e.value === "Enter") evaluate();
  if (e.value === ",") addPoint();
  if (e.value === "Backspace") clearNum();
}
const operate = function (num1, sign, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  if (sign === "+") {
    return add(num1, num2);
  }
  if (sign === "-") {
    return sub(num1, num2);
  }
  if (sign === "*") {
    return multi(num1, num2);
  }
  if (sign === "/") {
    if (num2 === 0) {
      clear();
      return alert("You cannot divide by 0");
    }
    return division(num1, num2);
  }
};

const add = function (a, b) {
  return round(a + b);
};

const sub = function (a, b) {
  return round(a - b);
};

const multi = function (a, b) {
  return round(a * b);
};

const division = function (a, b) {
  return round(a / b);
};

function round(results) {
  result.textContent.includes(".") ||
  disOperate.textContent.includes(".") ||
  operand === "/"
    ? (endedNum = parseFloat(results.toFixed(3)))
    : (endedNum = results);
  return endedNum;
}
