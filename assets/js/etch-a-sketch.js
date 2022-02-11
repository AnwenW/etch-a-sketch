// Select the elements on the page -- canvas (and 2D context), shake button
const canvas = document.querySelector('#etch-a-sketch');
const frame = document.querySelector('.frame');
const ctx = canvas.getContext('2d'); // ctx is common for 'context'
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 10; // true constant (that won't be changed) use caps/underscores

// Make a variable called width/height from the same canvas properties:
const { width, height } = canvas;

// Get random X and Y starting points on the canvas
// These need to be let (not const) as values will be updated below
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Set up canvas for drawing
ctx.lineJoin = 'round'; // square to ensure smooth line edges, squared by default
ctx.lineCap = 'round';
ctx.lineWidth = 7; // default width 1px, don't have to specify the unit
ctx.strokeStyle = '#262626';
// ctx.globalAlpha = 0.9;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function
function draw({ key }) {

    // start the path
    ctx.beginPath();
    // move ctx to where X and Y values were
    ctx.moveTo(x, y);

    // reassign X and Y depending on keypress
    switch(key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        default:
            break;
    }
    
    // draw line to new X and Y point
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Write handler for the keys -- need to know whether to move up/down/left/right
function handleKey(e) {
    if(e.key.includes('Arrow')) { // arrow keys only
        e.preventDefault(); // prevent keys scrolling window when smaller than page, but should make sure UI always fits inside window
        draw({ key: e.key });
    }
}

// Write clear canvas/'shake' function

// Is it possible to half-clear the canvas on shake? So you need to shake again to fully clear it?

function clearCanvas() {
    frame.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    frame.addEventListener(
        'animationend', 
        function() {
            frame.classList.remove('shake');
        }, 
        { once: true }
    );
}

// Listen for keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);


// CHECK SENSITIVITY!! NOT TOO SENSITIVE OR WILL ACCIDENTALLY CLEAR CANVAS
// Detect mouse movement to run shake/ clear canvas function
(function() {
    "use strict";
    var detectMouseShake = function(subscribe, _a) {

        var interval = _a.interval, 
            threshold = _a.threshold;
        var velocity;
        var direction;
        var directionChangeCount = 0;
        var distance = 0;

        var listener = function(event) {

            var nextDirection = Math.sign(event.movementX);

            distance += Math.abs(event.movementX) + Math.abs(event.movementY);

            if (nextDirection !== direction) {
                direction = nextDirection;
                directionChangeCount ++;
            }
        };

        var intervalClear = setInterval( (function() {

            var nextVelocity = distance / interval;

            if (!velocity) {
                velocity = nextVelocity;
                return;
            }

            var acceleration = (nextVelocity - velocity) / interval;

            if (directionChangeCount && acceleration > threshold) {
                subscribe( (function() {
                    clearInterval(intervalClear);
                    document.removeEventListener("mousemove",listener);
                }) )
            }

            distance = 0;
            directionChangeCount = 0;
            velocity = nextVelocity;

        }), interval);
        
        document.addEventListener("mousemove",listener);
    };
        
    detectMouseShake(function() {
        // Run canvas shake/ clear canvas function
        clearCanvas();
    }, {
        interval: 350, // ms to reset counter
        threshold: 0.011, // acceleration of mouse movement threshold
    });
})();
