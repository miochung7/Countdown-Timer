// Constructor function

class Timer {
    constructor(durationInput, startButton, pauseButton, resetButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.resetButton = resetButton;

        // Adds a statement if callback has been passed and stores the reference to the callback passed in into this.onStart etc
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.durationInput.addEventListener('click', this.clearDuration);
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
        this.resetButton.addEventListener('click', this.reset);
    }

    clearDuration = (e) => {
        if (e.target === this.durationInput) {
            this.durationInput.value = ' ';
        }
    };


    /* CLASS PROPERTIES - Behind the scenes JS will make this function declaration and move it out of the class
    It will move this function inside the constructor function. */
    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining); // onStart will execute and passes in timeRemaining
        }
        this.tick(); // this will execute immediately 
        this.interval = setInterval(this.tick, 20);
        /*  this.interval will allow access from other methods
        this will execute at 1 second after and so on
        We will invoke this.tick and how often we want to run this function    */
    };

    pause = () => {
        clearInterval(this.interval);
    };

    reset = () => {
        this.durationInput.value = 'How many seconds?';
    };

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
                audio.play();
                this.reset();
            }
        } else {
            /*      Behind the scenes, we call get getter to retrieve the value in this.timeRemaining - 1,
                    and we call the setter in the first this.timeRemaining to update the value.    */

            //  setter               getter
            this.timeRemaining = this.timeRemaining - 0.02;
            if (this.onTick) {
                this.onTick(this.timeRemaining); // executes onTick and passes in timeRemaining
            }
        }
    };

    // we can treat 'get' as an instance variable
    get timeRemaining() {
        return parseFloat(this.durationInput.value); // converts string into integer which includes the decimal
    }

    // Can set the value to the variable timeReamaining
    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2); // Round the decimel to 2 places 
    }

};



// OR using which is an older way to use .bind to overide value of this to instance of class

//  class Timer {
//     constructor(durationInput, startButton, pauseButton) {
//         this.durationInput = durationInput;
//         this.startButton = startButton;
//         this.pauseButton = pauseButton;

//         this.startButton.addEventListener('click', this.start.bind(this));
//     }
//     start() {
//     console.log(this);
// }