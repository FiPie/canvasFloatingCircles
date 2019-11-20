var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//context 'our magic brush;)'
var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}
var maxRadius = 40;

var colourScheme = 2;
var colourArray = [
  ['#FCBB6D',
    '#D8737F',
    '#AB6C82',
    '#685D79',
    '#475C7A'
  ],
  ['#F8B195',
    '#F67280',
    '#C06C84',
    '#6C5B7B',
    '#355C7D'
  ],
  ['#E5FCC2',
    '#9DE0AD',
    '#45ADA8',
    '#547980',
    '#594F4F '
  ],
  ['#805C22',
    '#FFD591',
    '#FFB845',
    '#806A49',
    '#CC9337'
  ],
  ['#425780',
    '#D1E0FF',
    '#85ADFF',
    '#697080',
    '#6A8BCC'
  ]
];

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //reinitialize generation of circles
  init(100);
})

// here we create a javaScriptObject named Circle
function Circle(x, y, dx, dy, radius, colour) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.colour = colourArray[colourScheme][Math.floor(Math.random() * colourArray[colourScheme].length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "darkBlue";
    c.stroke();
    c.fillStyle = this.colour;
    c.fill();
  }
  this.update = function() {
    // the velocity on x axis will get reversed whenever the center of the shape +/- its radius hit the border od innerWidth
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    // the velocity on y axis will get reversed whenever the center of the shape +/- its radius hit the border od innerHeight
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    // these incrementation actualy changes the position of starting coords for drawing the shape in next iteration (call) of the function animate()
    this.x += this.dx;
    this.y += this.dy;

    // interactivity

    //we check if the circles are withing 50 px reach from the mouse cursor
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      //the circles withing the reach of cursor will increase their radii but not more than maxRadius
      if (this.radius < maxRadius) {
        // circles growth rate
        this.radius += 7;
      }
    }
    //we set the radius of circles beyond the reach to shrink but not less than minRadius
    else if (this.radius > this.minRadius) {
      // circles shrinkage rate
      this.radius -= 0.5;
    }

    this.draw();
  }
}


// we will store all individual Circle object in circleArray
var circleArray = [];

function init(quantity) {

  // should the number of circles overcome some threshold it will be reset
  if (circleArray.length > 5000) {
    circleArray = [];
  }
  for (var i = 0; i < quantity; i++) {
    var radius = Math.random() * 3 + 1; // circle radius
    var x = Math.random() * (innerWidth - radius * 2) + radius; // starting x coord at random and preventing the circles from spawning in the edges of the screen and getting stuck
    var y = Math.random() * (innerHeight - radius * 2) + radius; // starting y coord at random
    var dx = (Math.random() - 0.5) * 2; // velocity in x axis at random
    var dy = (Math.random() - 0.5) * 2; // velocity in y axis at random
    // var colour = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() + ")";

    //we add with push() function a new circle with randomized parameters each iteration of the loop
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}


console.log(circleArray);


//ANIMATED SHAPES

function animate() {
  requestAnimationFrame(animate);
  // here we erase the shapes drawn previously to achieve the effect of movement instead of overdrawing everything with the same shapes
  c.clearRect(0, 0, innerWidth, innerHeight);

  //we will now call update() methode for each Circle Object in the circleArray
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

}

init(100);
animate();






//RECTANGLES
//c.fillRect(x,y,width,height);     draws and fills the rectangle with colour
//c.strokeRect(x,y,width,height);   outlines and draws the rectangle with colour

// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(400, 400, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect(400, 100, 100, 100);
//
// c.strokeStyle = "rgba(100, 0, 100, 0.5)";
// c.strokeRect(200, 300, 100, 100);
// c.fillStyle = "rgba(100, 100, 0, 0.3)";
// c.fillRect(200, 300, 100, 100);



//LINES
// c.beginPath();   starts a new set of coords for a shape command
// c.moveTo(x,y);   coordinates of starting point
// c.lineTo(x,y);   coordinates of next end point
// c.stroke();      draw command

// c.beginPath();
// c.moveTo(100, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.lineTo(100, 300);
// c.strokeStyle = "#fa34a1";
// c.stroke();



// ARC/Circle
//c.arc( x(int), y(int), r(int), startAngle(float), endAngle(float), drawCounterClockwise(boolean) );   creates an outline for our arc/circle

// c.beginPath();
// c.arc(100, 400, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "lightBlue";
// c.stroke();
//
// c.beginPath();
// c.arc(250, 500, 50, 0, Math.PI * 2, false);
// c.strokeStyle = "darkBlue";
// c.stroke();


//will create multiple colorful circles at random all over the canvas element

// for (var i = 0; i < 2000; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   var colour = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() + ")"
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = colour;
//   c.stroke();
// }





console.log(canvas);