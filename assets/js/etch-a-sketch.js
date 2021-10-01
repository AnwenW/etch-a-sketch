// console.log('it works'); // Always check the right JS file is linked up!

// Select the elements on the page -- canvas (and 2D context), shake button

const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d'); // ctx is common for 'context'
const shakeButton = document.querySelector('.shake');

// Setup canvas for drawing

ctx.lineJoin = 'round'; // round to ensure smooth line edges, squared by default
ctx.lineCap = 'round';
ctx.lineWidth = 10; // default width 1px, don't have to specify the unit

// Write a draw function



// Write handler for the keys -- need to know whether to move point up/ down/ left/ right

// Write clear canvas/'shake' function
