// NOTE: Lilian Dupouy
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE
// ===============
document.addEventListener('DOMContentLoaded', function() {
  const display = document.querySelector('.calculator__display');
  let firstOperand = null;
  let operator = null;
  let waitingForSecondOperand = false;
  let shouldResetScreen = false;

  function inputDigit(digit) {
    if (display.textContent === '0' || shouldResetScreen) {
      display.textContent = digit;
      shouldResetScreen = false;
    } else {
      display.textContent += digit;
    }
  }

  function inputDecimal(dot) {
    if (!display.textContent.includes(dot)) {
      display.textContent += dot;
    }
  }

  function clearScreen() {
    display.textContent = '0';
    shouldResetScreen = false;
  }

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.textContent);

    if (operator && waitingForSecondOperand) {
      operator = nextOperator;
      return;
    }

    if (firstOperand === null) {
      firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation(firstOperand, inputValue, operator);
      display.textContent = String(result);
      firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    shouldResetScreen = true; // Efface le chiffre lorsque l'opérateur est pressé
  }

  function performCalculation(x, y, operator) {
    switch (operator) {
      case '+':
        return x + y;
      case '-':
        return x - y;
      case '*':
        return x * y;
      case '/':
        if (y === 0) {
          return 'Error';
        }
        return x / y;
      case '=':
        return y;
    }
  }

  function handleInput(event) {
    const { target } = event;
    if (target.matches('button')) {
      const { action } = target.dataset;
      console.log(target.textContent); 
      if (!action) {
        if (display.textContent === '0' || shouldResetScreen) {
          display.textContent = target.textContent;
          shouldResetScreen = false;
        } else {
          display.textContent += target.textContent;
        }
      } else if (action === 'decimal') {
        inputDecimal(target.textContent);
      } else if (action === 'clear') {
        clearScreen();
      } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide' || action === 'calculate') {
        handleOperator(action);
      }
    }
  }

  document.querySelector('.calculator__keys').addEventListener('click', handleInput);
});