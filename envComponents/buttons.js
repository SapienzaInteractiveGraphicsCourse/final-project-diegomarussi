export default class Button{

    constructor(element){
        this.button = document.querySelector(element);

        this.color;
        this.bkColor;


    }

    setValue(flag){
        if(flag){
            this.color = 'red';
            this.bkColor = 'blue';
        }
        if(!flag){
            this.color = 'black';
            this.bkColor = 'lightBlue';
        }


        this.update();
    }

    update(){
        this.button.style.color = this.color;
        this.button.style.backgroundColor = this.bkColor;
    }

}