class CalcController{

    constructor(){

        this.operation  = [];
        this.locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();        
    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        })
    }

    clearAll(){
        this.operation =[];
        this.displayCalc = '';
    }

    setError(){
        this.displayCalc = 'Error';
    }

    clearEntry(){
        this.operation.pop();
    }

    LastOperationIsNumber(){ 

        return !isNaN(this.operation [this.operation.length - 1]);       
    }

    currentValueisNumber(value){ 

        return !isNaN(value);         
    }

    setLastNumberDisplay(){
        let lastNumber;

        for (let i = this.operation.length; i>=0; i--){

            if (this.currentValueisNumber(this.operation[i]))
            {
                lastNumber = this.operation[i];

                break;
            }
        }

        this.displayCalc = lastNumber;
    }

//Quando apertar igual se o último for um operador apague do array
    addOperation(value){

        if(this.operation && this.operation.length === 0){

            if(['/','%','*','.','+','-'].indexOf(value) === -1){
               this.operation.push(value);
               this.setLastNumberDisplay();
            }

         }else if ((this.LastOperationIsNumber() && this.currentValueisNumber(value)) || (value === '.')){

            this.operation [this.operation.length - 1] = this.operation [this.operation.length - 1].toString() + value.toString();
            this.setLastNumberDisplay();
         } else if (!this.LastOperationIsNumber() && !this.currentValueisNumber(value)){

            this.operation [this.operation.length - 1] =  value.toString();
         }         
         else {
 
            this.operation.push(value);
            this.setLastNumberDisplay();
            if(this.operation.length > 3){

              
              let lastOperation =  this.operation.pop();

              let total = eval(this.operation.join(''));

              this.operation = [ total , lastOperation ];

              this.displayCalc = total;

            }

         }        
    }
    execBooton(value){
       
        switch (value) {

        case 'ac':
         this.clearAll();
        break;

        case 'ce':
          this.clearEntry();
        break;

        case 'porcento':
            this.addOperation('/');
        break;

        case 'divisao':
            this.addOperation('/');
        break;

        case 'multiplicacao':
            this.addOperation('*');
        break;

        case 'subtracao':
            this.addOperation('-');
        break;

        case 'soma':
            this.addOperation('+');
        break;

        case 'igual':
             
        break;

        case 'ponto':
            this.addOperation('.');
        break;

        case '0':
        case '1':
        case '2':
        case '3':    
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':

            this.addOperation(parseInt(value));

        break;

        default:
            this.setError();
            break;
      }

      console.log(this.operation)
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach((button, index) => {

            this.addEventListenerAll(button, 'click drag', 
                () => this.execBooton(button.className.baseVal.replace('btn-','')));

            this.addEventListenerAll(button, 'mouseover mouseup mousedown', 
                () => button.style.cursor = "pointer" );
        })
    }

    initialize(){

        this.setDisplayDateTime();

        setInterval(() =>{
            this.setDisplayDateTime();
        }, 1000)       
    }


    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this.locale, {day: '2-digit', month:'long', year: 'numeric'});
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get displayDate (){
        return this._dateEl.innerHTML;
    }

    set displayDate (value){
          this._dateEl.innerHTML = value;
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate= value;
    }
}