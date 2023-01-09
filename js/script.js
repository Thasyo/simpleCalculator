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

        //Verficando se o valor atual for vazio.
        if(this.currentsNumberText.innerText === "" && operation !== "C"){
            
            if(this.previousNumberText.innerText !== ""){
                //mudando a operação atual caso o valor atual for vazio.
                this.changeOperation(operation);
            }
            return;
        }

        //Pegando o valor atual e anterior.
        let operationValue;
        const previous = +this.previousNumberText.innerText.split(" ")[0];
        const current = +this.currentsNumberText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.processDelOperator();
                break;    
            case "CE":
                this.processCeOperator();
                break;
            case "C":
                this.processCOperator();
                break;
            case "=":
                this.processEqualOperator();
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

    //mudando operações matemáticas.
    changeOperation(operation){
        
        const mathOperations = ["+", "-", "/", "*"];

        if(!mathOperations.includes(operation)){
            return;
        }

        this.previousNumberText.innerText = this.previousNumberText.innerText.slice(0, -1) + operation;
    }

    //método para deletar o último dígito.
    processDelOperator(){
        this.currentsNumberText.innerText = this.currentsNumberText.innerText.slice(0, -1);
    }

    //método para deletar todos os digitos do valor atual.
    processCeOperator(){
        this.currentsNumberText.innerText = "";
    }

    //método para limpar completamente todo o screen da calculadora.
    processCOperator(){
        this.currentsNumberText.innerText = "";
        this.previousNumberText.innerText = "";
    }

    //método para o button 'equal'.
    processEqualOperator(){
        const operation = this.previousNumberText.innerText.split(" ")[1];
        this.processOperation(operation);
    }

};

//fazendo a "chamada" da nova classe.
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