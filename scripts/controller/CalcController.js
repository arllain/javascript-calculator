class CalcController {
    constructor() {
        this._locale = 'pt-BR';
        this._displayCaclEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
    }

    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
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