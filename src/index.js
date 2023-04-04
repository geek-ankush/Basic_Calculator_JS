// Calculator object to store calculator-related data and methods
const calculator = {
  currentInput: "0", // stores the current input value
  currentOperator: null, // stores the current operator
  operatorClicked: false, // indicates if an operator has been clicked
  decimalClicked: false, // indicates if the decimal point has been clicked
  screen: document.querySelector(".output"), // the calculator display
  previousInputs: document.querySelector(".previous-inputs"), // display of previous inputs

  init() {
    // initializes the calculator and adds event listeners
    document
      .querySelector(".buttons")
      .addEventListener("click", this.handleButtonClick.bind(this));
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  },

  clear() {
    // clears the calculator display and resets values
    this.currentInput = "0";
    this.currentOperator = null;
    this.operatorClicked = false;
    this.decimalClicked = false;
    this.screen.value = this.currentInput;
    this.previousInputs.value = "";
  },

  appendNumber(number) {
    // appends a number to the current input
    if (this.operatorClicked) {
      this.currentInput = "0";
      this.operatorClicked = false;
    }

    if (number === "." && this.decimalClicked) {
      return;
    }

    if (this.currentInput === "0" && number !== ".") {
      this.currentInput = "";
    }

    this.currentInput += number;

    if (number === ".") {
      this.decimalClicked = true;
    }

    this.screen.value = this.currentInput;
  },

  chooseOperator(operator) {
    // sets the current operator and updates previous inputs display
    if (this.currentOperator !== null) {
      this.evaluate();
    }

    this.currentOperator = operator;
    this.operatorClicked = true;

    if (this.previousInputs.value === "") {
      this.previousInputs.value =
        this.currentInput + " " + this.currentOperator;
    } else {
      this.previousInputs.value +=
        " " + this.currentInput + " " + this.currentOperator;
    }
  },

  toggleSign() {
    // toggles the sign of the current input
    this.currentInput = (parseFloat(this.currentInput) * -1).toString();
    this.screen.value = this.currentInput;
  },

  evaluate() {
    // performs the calculation
    const previousValue = parseFloat(this.previousInputs.value.split(" ")[0]);
    const operator = this.previousInputs.value.split(" ")[1];
    const currentValue = parseFloat(this.currentInput);

    let result;

    switch (operator) {
      case "+":
        result = previousValue + currentValue;
        break;
      case "-":
        result = previousValue - currentValue;
        break;
      case "*":
        result = previousValue * currentValue;
        break;
      case "/":
        result = previousValue / currentValue;
        break;
      case "%":
        result = previousValue % currentValue;
        break;
      default:
        return;
    }

    this.currentInput = result.toString();
    this.currentOperator = null;
    this.operatorClicked = true;
    this.decimalClicked = false;
    this.screen.value = this.currentInput;
    this.previousInputs.value = "";
  },

  handleButtonClick(event) {
    // handles button clicks
    const button = event.target;
    const buttonValue = button.textContent;

    switch (buttonValue) {
      case "AC":
        this.clear();
        break;
      case "+/-":
        this.toggleSign();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        this.chooseOperator(buttonValue);
        break;
      case "=":
        this.evaluate();
        break;
      default:
        this.appendNumber(buttonValue);
    }
  },

  handleKeyDown(event) {
    // handles keyboard clicks
    const key = event.key;
    let button;

    switch (key) {
      case "Backspace":
        button = document.querySelector(".clear");
        calculator.clear();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        button = document.querySelector(`.operator[data-key="${key}"]`);
        calculator.chooseOperator(key);
        break;
      case "=":
      case "Enter":
        button = document.querySelector(".equals");
        calculator.evaluate();
        break;
      case ".":
      case ",":
        button = document.querySelector(".decimal");
        calculator.appendNumber(".");
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        button = document.querySelector(`.number[data-key="${key}"]`);
        calculator.appendNumber(key);
        break;
      case "+/-":
      case "m":
        button = document.querySelector(".toggle-sign");
        calculator.toggleSign();
        break;
      default:
        return;
    }

    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 100);
  }
};

calculator.init();
