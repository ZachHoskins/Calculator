class Calculator {
  constructor (previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  percent() {
    this.currentOperand = this.currentOperand / 100;
  }

  appendNumber(num) {
    if (num === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand + num;
  }

  selectOperator(operation) {
    if(this.currentOperand === "") return;
    if(this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  calculate() {
    let compute;
    let previous = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    if(isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        compute = previous + current;
        break;
      case "-":
        compute = previous - current;
        break;
      case "×":
        compute = previous * current;
        break;
      case "÷":
        compute = previous / current;
        break;
      default:
        return;
    }
    this.currentOperand = compute;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateScreen() {
    this.currentOperandText.innerText = this.currentOperand;
    if(this.operation !== undefined) {
      this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = "";
    }
  }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("[data-equals]");
const percentBtn = document.querySelector("[data-percent]");
const clearBtn = document.querySelector("[data-clear]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

const calc = new Calculator(previousOperandText, currentOperandText);

numberBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    calc.appendNumber(btn.innerText);
    calc.updateScreen();
  })
})

operatorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    calc.selectOperator(btn.innerText);
    calc.updateScreen();
  })
})

equalsBtn.addEventListener('click', () => {
  calc.calculate();
  calc.updateScreen();
})

clearBtn.addEventListener('click', () => {
  calc.clear();
  calc.updateScreen();
})

percentBtn.addEventListener('click', () => {
  calc.percent();
  calc.updateScreen();
})