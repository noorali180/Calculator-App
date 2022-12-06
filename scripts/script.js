'use strict'

const calculator = document.querySelector('.calculator');
class App {
    #operand1;
    #operand2;
    #operator;
    #result;

    constructor(){
        calculator.addEventListener('click', this._handleClick.bind(this));
    }

    _handleClick(e){
        const target = e.target;

        if(!target) return;

        if (target.classList.contains('btn-number')) this._handleNumber(target);

        if (target.classList.contains('btn-opeartor')) this._hanldeOperator(target);

        if (target.classList.contains('btn-dot')) this._handleDot(target);

        if(target.classList.contains('btn-result')) this._handleResult()
    }

    _handleNumber(numberEl){
        const number = numberEl.dataset.number;
    }

    _handleOperator(operatorEl){
        const operator = operatorEl.dataset.operator;
    }

    _handleDot(dotEl){
        const operator = operatorEl.dataset.operator;
    }
}

const app = new App();
