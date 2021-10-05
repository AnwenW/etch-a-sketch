// Select the elements on the page -- canvas (and 2D context), shake button
const canvas = document.querySelector('#etch-a-sketch');
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
ctx.lineJoin = 'round'; // round to ensure smooth line edges, squared by default
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT; // default width 1px, don't have to specify the unit

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // hue (0 - 360), saturation (%), lightness (%)
/* strokeStyle set here on page load but needs explictly stating again in draw() when updated */

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function
function draw({ key }) {

    // increment the hsl hue
    hue += 2;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

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
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener(
        'animationend', 
        function() {
            canvas.classList.remove('shake');
        }, 
        { once: true }
    );
}

// Listen for keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);