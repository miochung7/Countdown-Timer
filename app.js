// Select the three elements

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');
const resetButton = document.querySelector('#reset');
const audio = document.querySelector('#audio');


const perimeter = circle.getAttribute('r') * 2 * Math.PI; // Retrieve the length of the circle
circle.setAttribute('stroke-dasharray', perimeter); //  Sets stroke-dasharray to the permieter


let duration;

// Create instances of the Timer - will automatically set up the eventlistener 
const timer = new Timer(durationInput, startButton, pauseButton, resetButton, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset',
            (perimeter * timeRemaining) / duration - perimeter // Calculates even dashOffset with the time remaining
        );
    },
    onComplete() {
        setInterval(() => {

            circle.removeAttribute('stroke-dashoffset');
        }, 1500);
        console.log('Timer is completed');

    }
});

/* 
Can detect whenever the timer starts, whenever we tick down every second and when the timer is complete.
Can tell the outside world all the code outside of the class that something important has happened.
Will use a callback function that'll be provided to the Timer class at an appropriate time:
onStart()
onTick()
onComplete()
*/