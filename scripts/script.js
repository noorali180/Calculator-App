'use strict'

// // ELEMENTS...
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
//////////////////////////////////////////////////////////

// Calclulator Class...
class Calculator {
    // constructor function...
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandElement = previousOperandTextElement;
        this.currentOperandElement = currentOperandTextElement;
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    // function to clear all inputs...
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // function to remove the latest entry in current operand field...
    delete(){
        if(this.currentOperand === '') return;

        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // function to compute the calculations...
    compute(previousOperand, currentOperand){
        switch (this.operation){
            case '+' : return previousOperand + currentOperand;

            case '-' : return previousOperand - currentOperand;

            case '×' : return previousOperand * currentOperand;

            case '÷' : return previousOperand / currentOperand;

            default: return;
        }
    }

    // function to append a number on output screen...
    appendNumber(number){
        if(number === '.' && this.currentOperand.length === 0) this.currentOperand = '0.';
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number.toString();
    }

    // function to select any operation wants to perform...
    selectOperation(operation){
        if(this.currentOperand === '' && this.previousOperand === '') return;

        if(this.currentOperand === '') this.operation = operation;
        
        // /////////////////////////////////////////////////////

        if(this.previousOperand === '') {
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
        else{
            const previousOperand = parseFloat(this.previousOperand);
            const currentOperand = parseFloat(this.currentOperand);

            if(isNaN(currentOperand) || isNaN(previousOperand)) return;

            this.previousOperand = this.compute(previousOperand, currentOperand);
            this.operation = operation;
            this.currentOperand = '';
        }
    }

    // function to handle equal button functionality...
    calculate(){
        let computation;

        const previousOperand = parseFloat(this.previousOperand);
        const currentOperand = parseFloat(this.currentOperand);

        if(isNaN(currentOperand) || isNaN(previousOperand)) return;

        computation = this.compute(currentOperand, previousOperand);

        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;

        this.updateDisplay();

        this.currentOperand = '';
    }

    // function to update the output display...
    updateDisplay(){
        this.currentOperandElement.innerText = new Intl.NumberFormat(navigator.language)
        .format(this.currentOperand.toString());

        if(this.operation !== undefined){
            this.previousOperandElement.innerText = `${new Intl.NumberFormat(navigator.language)
            .format(this.previousOperand.toString())} ${this.operation.toString()}`
        }
        else{
            this.previousOperandElement.innerText = '';
        }
    }
}

// calculator object...
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

//// EVENT HANDLERS>>>

numberButtons.forEach(button => {
    button.addEventListener('click', function(e){
        calculator.appendNumber(e.target.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', function(e){
        calculator.selectOperation(e.target.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', function(e){
    calculator.calculate();
})

allClearButton.addEventListener('click', function(e){
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', function(e){
    calculator.delete();
    calculator.updateDisplay();
})
