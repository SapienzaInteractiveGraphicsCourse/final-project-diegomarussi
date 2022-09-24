
export class HealthBar{

    constructor(htmlElem, initValue=100.0){
        this.valueElem = htmlElem.querySelector('.health-bar-value');
        this.fillElem = htmlElem.querySelector('.health-bar-fill');
        this.health = 100;

        this.setValue(initValue);

    }

    setValue(value){
        if(value < 0){
            value = 0;
        }
        if(value > 100){
            value = 100;
        }

        this.health = value;
        this.update();
    }

    update(){
        const percentage = this.health + '%';
        this.fillElem.style.width = percentage;
        this.valueElem.textContent = percentage;
    }

}



export class Score{

    constructor(htmlElem, initValue=0){
        this.scoreElem = htmlElem.querySelector('.score-bar-value');
        this.score;
        this.velDifficulty;

        this.setScore(initValue);

    }

    setDifficulty(score){
        if(score >0 && score <=30){
        }else if(score > 30 && score <=90){
            this.velDifficulty = 0.8 ;
        }else if(score > 90 && score <=150){
            this.velDifficulty = 0.7
        }else if(score > 150 && score <=190){
            this.velDifficulty = 0.6 
        }else if(score > 190 && score <=240){
            this.velDifficulty = 0.45
        }else if(score > 300){
            this.velDifficulty = 0.3
        }

        
    }

    setScore(score){
        this.score = score
        this.update();
    }

    update(){
        const score = "SCORE: " + this.score;
        this.scoreElem.textContent = score;
    }

}

