/* Koch Curve: Using recursive process directly to calculate and draw lines */

const canvas = document.getElementById("mainCanvas");
const ctx = mainCanvas.getContext('2d', {alpha: false});

const bcanvas = document.getElementById("backupCanvas");
const bctx = bcanvas.getContext('2d', {alpha: false});

let w, h, maxIterations; 
let midX, midY;

let curMouse = {};

let counter = 0;
let iterations = 1;

let segLen = 1 / 3;

var radius=300;

let kochPoints;

let varAng;

let run = true;

let Strokecolors = ['pink', 'lightpink', 'palevioletred'];

window.addEventListener('resize', updateCanvasSize());
document.addEventListener("click", getMousePos);
document.addEventListener("click", clickSquare);
document.getElementById("clear").onclick = updateCanvasSize;

updateCanvasSize();

requestAnimationFrame(animate);

/* UTILITY CODE */

/* use to update global w and h and reset canvas width/height */ 
function updateCanvasSize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  bcanvas.width = w;
  bcanvas.height = h;

  midX = w/2;
  midY = h/2;

  maxIterations = 1;
  kochPoints = [];

  while((w / Math.pow(5, maxIterations) > 1)) {
    maxIterations += 1;
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, w, h);

  varAng = lerp(1,5);

}

//get a random integer between two numbers
function lerp(a,b) {
  return Math.floor(Math.random() * b) + a;
}

function drawSquare(x,y,side) {

  ctx.strokeStyle = 'red';
  ctx.strokeWidth = 5;
  
  ctx.save();
  ctx.beginPath()
  ctx.moveTo(x - side/2, y - side/2); //TOP LEFT
  ctx.lineTo(x + side/2, y - side/2); //TOP RIGHT
  ctx.lineTo(x + side/2, y + side/2); //BOTTOM RIGHT
  ctx.lineTo(x - side/2, y + side/2); //BOTTOM LEFT
  ctx.closePath();
  ctx.stroke();

  //console.log('draw square ran');

}

function getMousePos(event) {

  let mouse = {
    x: event.clientX,
    y: event.clientY
  };
  
  curMouse = mouse;
  //console.dir(mouse);
  //return  mouse;
}

// function clear(){
//   kochPoints = [];
//   console.log('CLear ran');
//   console.dir(kochPoints);
// }

function clickSquare() {
  //getMousePos();
  //drawSquare(curMouse.x, curMouse.y, 100);
  //koch(curMouse.x, curMouse.y, 50)
  let newP = {
    x: curMouse.x,
    y: curMouse.y
  }

  kochPoints.push(newP);

  //console.dir(kochPoints);
}


/* MAIN DRAWING CODE */
function draw(){
  for(var i=0;i<1;i++){
    ctx.beginPath();

    ctx.moveTo(midX, midY);
    //ctx.arc(midX, midY,radius,i*Math.PI/4,(i+1)*((Math.PI/4)),false);
    ctx.arc(midX, midY,radius, 90, 270, false);  
    ctx.closePath();
    ctx.clip();

    allKoch();
    // ctx.fillStyle = 'gray';
    // ctx.fillRect(0, 0, w, h);

    ctx.save()
    ctx.fillStyle = 'crimson';
    ctx.globalAlpha = .1;
    ctx.beginPath();

    ctx.moveTo(midX, midY);
    ctx.arc(midX, midY,radius, 180, 90, true);  
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    //allKoch();

  }
}

function allKoch(){


  ctx.strokeStyle = 'lightpink';
  //ctx.lineWidth = 2;

  // add some blurring  
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'darkmagenta';

  let sideLength;

  for(let j = 0; j < kochPoints.length; j ++){
    ctx.lineWidth = lerp(.5,5);
    sideLength = lerp(10,150);
    //console.log(sideLength);
    cInd = lerp(0,Strokecolors.length);
    ctx.strokeStyle = Strokecolors[cInd];
    //console.log(ctx.strokeStyle);
    koch(kochPoints[j].x, kochPoints[j].y, sideLength);
  }
}

function koch(cX, cY, side){
  
  kochLine(cX - side,cY - side, side, 0 * Math.PI/varAng);
  kochLine(cX + side,cY - side, side, 2 * Math.PI/varAng);
  kochLine(cX + side,cY + side, side, 4 * Math.PI/varAng);
  kochLine(cX - side,cY + side, side, 6 * Math.PI/varAng);

};

function kochLine( xForm, yForm, side,rot){
  ctx.save();
  ctx.translate(xForm, yForm);
  ctx.rotate(rot);
  ctx.beginPath();
  drawKochCurve(side*2, iterations);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawKochCurve(width, iterations) {

  // this is the exit condition for the recursion
  // when we hit bottom, we draw the line
  if(iterations == 1) {
    ctx.moveTo(0,0);
    ctx.lineTo(width, 0);
  } else {

    // here we do the splitting of the line into segments
    // and apply translations and rotations to draw the koch curve
    // for the new segments
    let newWidth = width * segLen; 
    let newIterations = iterations - 1;

    ctx.save();

    //TYPE 1
    // 1st segment
    drawKochCurve(newWidth, newIterations);

    // 2nd segment
    ctx.translate(newWidth, 0);
    ctx.rotate(-Math.PI * 1/2); 
    drawKochCurve(newWidth*2, newIterations);

    // 3rd segment
    ctx.translate(newWidth*2, 0);
    ctx.rotate(Math.PI * 1/2);
    drawKochCurve(newWidth, newIterations);

    // 4th segment
    ctx.translate(newWidth, 0);
    ctx.rotate(-Math.PI * -1/2);
    drawKochCurve(newWidth*2, newIterations);

    // 5th segment
    ctx.translate(newWidth, 0);
    ctx.rotate(-Math.PI * 1/2);
    drawKochCurve(newWidth, newIterations);

    ctx.restore();
  }

}

function flipData(imgData){
  //https://permadi.com/2009/04/html5-using-canvas-to-flip-images/
  for (i=0; i<imgData.height; i++)
  {
   // We only need to do half of every row since we're flipping the halves
    for (j=0; j<imgData.width/2; j++)
    {
       var index=(i*4)*imgData.width+(j*4);
       var mirrorIndex=((i+1)*4)*imgData.width-((j+1)*4);
       for (p=0; p<4; p++)
       {
         var temp=imgData.data[index+p];
         imgData.data[index+p]=imgData.data[mirrorIndex+p];
         imgData.data[mirrorIndex+p]=temp;
       }
    }
  }
}

function animate() {
  //draw();
    if((counter % 200) == 0) {
      //allKoch();
      draw();
      if(++iterations > maxIterations) {
        iterations = 1;  
      }
    }
    counter++;

    ctx.save();
    var imgData=ctx.getImageData(0,0,w,h);

    flipData(imgData);

    ctx.putImageData(imgData,0,0,0,0,imgData.width + 300, imgData.height + 300);
    ctx.restore();

    requestAnimationFrame(animate);
}



