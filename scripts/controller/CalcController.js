class CalcController {
    constructor() {
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCaclEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    setLastOperation(value){
        this._operation[this._operation.length -1] = value;
    }
    
    getLastOperation(){
        return this._operation[this._operation.length - 1];
    }

    isOperator(value){
        let index = (['+','-', '*', '/','%'].indexOf(value) > -1);
        return index;
    }

    pushOperation(value){
        this._operation.push(value);
        if(this._operation.length > 3) {
            this.calc();
        }
    }

    calc(){
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last];
        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay(){
        let lastNumber;
        for (let i = this._operation.length-1; i >= 0; i--) {
            if (!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i];
                break;
            }
        }
        this.displayCacl = lastNumber;

    }

    addOperation(value) {
        if(isNaN(this.getLastOperation())){
            if(this.isOperator(value)){
                this.setLastOperation(value);
            }else if (isNaN(value)){
                console.log(value);
            }else{
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        }else {
            if(this.isOperator(value)){
                this.pushOperation(value);
            }else{
                this.setLastOperation(parseInt(this.getLastOperation().toString() + value.toString()));
                this.setLastNumberToDisplay();
            }
        }
    }

    clearAll(){
        this._operation = [];    }

    clearEntry(){
        this._operation.pop();
    }

    setError(){
        this.displayCacl = "Error";
    }
 

    execBtb(value){
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.addOperation('=');
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
                this.addOperation(parseInt(value))
                break;
            default:
                this.setError();
                break;    



        }
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {
                let textBtn = btn.className.baseVal.replace('btn-', '');
                this.execBtb(textBtn);
            });
        
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);        
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayCacl(){
        return this._displayCaclEl.innerHTML;
    }

    set displayCacl(value){
        this._displayCaclEl.innerHTML = value;
    }
    
    get currentDate() {
        return new Date();
    }

    set currtentDate(value) {
        this._currentDate.innerHTML = value;
    }
}