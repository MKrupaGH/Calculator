const disOperate = document.querySelector(".operate");
const result = document.querySelector(".result");

const equalSign = document.querySelector(".equal");
const operateSign = document.querySelectorAll(".sign");
const digitBtn = document.querySelectorAll(".digit");

let operand = null;
let number1 = "";
let number2 = "";
let displayAdd = "";

let blocked = false;

digitBtn.forEach((digit) => {
  digit.addEventListener("click", () => {
    result.textContent += digit.value;
  });
});

operateSign.forEach((opSign) => {
  opSign.addEventListener("click", () => {
    number1 = result.textContent;
    operand = opSign.value;
    disOperate.textContent = `${number1} ${operand}`;
    result.textContent = "";
    blocked = true;
    if (number2 == null) {
      number2 = result.textContent;
      result.textContent = "";
      disOperate.textContent = `${number1} ${operand} ${number2}`;
      result.textContent = operate(number1, operand, number2);
      operand = null;
      blocked = false;
    }
  });
});

equalSign.addEventListener("click", () => {
  if (blocked) {
    number2 = result.textContent;
    result.textContent = "";
    disOperate.textContent = `${number1} ${operand} ${number2}`;
    result.textContent = operate(number1, operand, number2);
    operand = null;
    blocked = false;
  }
});

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
      return alert("You cannot divide by 0");
    }
    return division(num1, num2);
  }
};

const add = function (a, b) {
  return a + b;
};

const sub = function (a, b) {
  return a - b;
};

const multi = function (a, b) {
  return a * b;
};

const division = function (a, b) {
  return (a / b).toFixed(2);
};
