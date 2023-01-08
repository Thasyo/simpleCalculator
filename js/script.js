//selecionando os elementos necessários 
const previousNumberText = document.querySelector("#previous-numbers");
const currentsNumberText = document.querySelector("#currents-numbers");
const buttons = document.querySelectorAll(".buttons-container button");
const currentOperation = "";

//classe para as funcionalidades da calculadora
class Calculator {
    constructor(previousNumberText, currentsNumberText){
        this.previousNumberText = previousNumberText;
        this.currentsNumberText = currentsNumberText;
        this.currentOperation = currentOperation;
    }

    //adicionando método quando adicinamos algum digito à calculadora;
    addDigit(digit){
        
        //verificando se existem mais de um ponto digitados na operação atual; 
        if(this.currentsNumberText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //processando todas as operações da calculadora.
    processOperation(operation){

        //Pegando o valor atual e anterior.
        let operationValue;
        const previous = +this.previousNumberText.innerText.split(" ")[0];
        const current = +this.currentsNumberText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            default:
                return;
        }



    }

    //adicionando método para mudar os valores na tela da calculadora;
    updateScreen(operationValue = null, operation = null, current = null, previous = null){
       
        if(operationValue === null){
            this.currentsNumberText.innerText += this.currentOperation
        }else{
            //verificando se o valor é 0, se sim, adiciona o valor atual.
            if(previous === 0) {
                operationValue = current;
            }

            //adicionando o valor atual para o anterior;
            this.previousNumberText.innerText = `${operationValue} ${operation}`
            this.currentsNumberText.innerText = "";


        }


    
    
    }


};

const calc = new Calculator (previousNumberText, currentsNumberText); 

//adicionando os eventos de click para cada botão
buttons.forEach((btns) => {
    btns.addEventListener("click", (e) => {
        const value = e.target.innerText; //pegando o valor de texto dentro de cada button.

        //o "+" antes da variável converte o valor em número
        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        }else{
            calc.processOperation(value)
        }

    });

});