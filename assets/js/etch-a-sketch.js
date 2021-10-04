// console.log('it works'); // Always check the right JS file is linked up!

// Select the elements on the page -- canvas (and 2D context), shake button

const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d'); // ctx is common for 'context'
const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 10; // true constant (that won't be changed) use caps/underscores

// Set width/ height variables 
// const width = canvas.width;
// const height = canvas.height;

// Make a variable called width/height from the same canvas properties:
const { width, height } = canvas;

// Get random X and Y starting points on the canvas
// These need to be let (not const) as values will be updated below

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Setup canvas for drawing

ctx.lineJoin = 'round'; // round to ensure smooth line edges, squared by default
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT; // default width 1px, don't have to specify the unit

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

// Write handler for the keys -- need to know whether to move point up/ down/ left/ right

function handleKey(e) {
    if(e.key.includes('Arrow')) { // arrow keys only
        e.preventDefault(); // prevent keys scrolling window when smaller than page, but should make sure UI always fits inside window
        draw({ key: e.key });
    }
}

// Listen for arrow keys
window.addEventListener('keydown', handleKey);

// Write clear canvas/'shake' function
