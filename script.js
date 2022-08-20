class Calculator {
  constructor(firstNumberText, secondNumberText) {
    this.firstNumberText = firstNumberText;
    this.secondNumberText = secondNumberText;
    this.reset();
  }

  reset() {
    this.firstNumber = '';
    this.secondNumber = '';
    this.operation = undefined;
  }

  delete() {
    this.secondNumber = this.secondNumber.toString().slice(0, -1);
  }

  addNumber(number) {

    if (number === '.' && this.secondNumber.includes('.') || number === '.' && this.secondNumber === '')
      return;

    if (this.secondNumber.length <= 6) {
      this.secondNumber = this.secondNumber.toString() + number.toString();
    }
  }

  addOperator(operation) {
    if (this.secondNumber === '')
      return;
    else if (this.firstNumber === '' && operation === '√' || this.firstNumber === '' && operation === 'n²') {
      this.operation = operation;
      this.count();
    }
    else if (this.firstNumber !== ''){
      this.count();
    }
    else{
      this.operation = operation;
      this.firstNumber = this.secondNumber;
      this.secondNumber = '';
    }
    
  }

  count() {
    let result;
    const first = parseFloat(this.firstNumber);
    const second = parseFloat(this.secondNumber);

    if (isNaN(first) && isNaN(second))
      return;



    switch (this.operation) {
      case '+':
        result = first + second;
        break;
      case '-':
        result = first - second;
        break;
      case '*':
        result = first * second;
        break;
      case '/':
        if(second == 0){          
          alert("You can't divide by zero");
          break;
        }        
        result = first / 100 * second;
        break;
      case '%':
        result = first / second;
        break;
      case '√':
        result = Math.sqrt(second);
        break;
      case 'n²':
        result = Math.pow(second, 2);
        break;
      default:
        return;
    }

    this.operation = undefined;
    this.secondNumber = result;
    this.firstNumber = '';
  }

  update() {
    this.secondNumberText.innerText = this.secondNumber;

    if (this.operation != null) {
      this.firstNumberText.innerText = `${this.firstNumber} ${this.operation}`;
    }
    else {
      this.firstNumberText.innerText = '';
    }
  }

}

const number = document.querySelectorAll(".btn-number");
const operation = document.querySelectorAll(".btn-operator");
const reset = document.querySelector(".btn-reset");
const del = document.querySelector(".btn-del");
const equels = document.querySelector(".btn-equels");

const firstNumberText = document.querySelector(".first-number");
const secondNumberText = document.querySelector(".second-number");

const cal = new Calculator(firstNumberText, secondNumberText);

number.forEach(button => {
  button.addEventListener('click', () => {
    cal.addNumber(button.innerText);
    cal.update();
  })
})

operation.forEach(button => {
  button.addEventListener('click', () => {
    cal.addOperator(button.innerText);
    cal.update();
  })
})

equels.addEventListener('click', button => {
  cal.count();
  cal.update();
})

reset.addEventListener('click', button => {
  cal.reset();
  cal.update();
})

del.addEventListener('click', button => {
  cal.delete();
  cal.update();
})
