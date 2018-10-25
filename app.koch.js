/* Koch Curve: Using recursive process directly to calculate and draw lines */

const canvas = document.getElementById("mainCanvas");
const ctx = mainCanvas.getContext('2d', {alpha: false});

let w, h, maxIterations; 
let midX, midY;

/* UTILITY CODE */

/* use to update global w and h and reset canvas width/height */ 
function updateCanvasSize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  midX = w/2;
  midY = h/2;

  maxIterations = 1;

  while((w / Math.pow(3, maxIterations) > 1)) {
    maxIterations += 1;
  }
}
updateCanvasSize();
window.addEventListener('resize', updateCanvasSize());

/* MAIN DRAWING CODE */



function drawKochCurve1(width, iterations) {

  // multiplier for seg lens.  
  let segLen = 1 / 3;

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
    drawKochCurve1(newWidth, newIterations);

    // 2nd segment
    ctx.translate(newWidth, 0);
    ctx.rotate(-Math.PI * 1/2);  // 60 degrees counterclockwise
    drawKochCurve1(newWidth, newIterations);

    // 3rd segment
    ctx.translate(newWidth, 0);
    ctx.rotate(Math.PI * 1/2);  // 120 degrees clockwise
    drawKochCurve1(newWidth, newIterations);

    // 4th segment
    ctx.translate(newWidth, 0);
    ctx.rotate(-Math.PI * -1/2);  // 60 degrees counterclockwise
    drawKochCurve1(newWidth, newIterations);

    // 5th segment
    ctx.translate(newWidth, 0);
    ctx.rotate(-Math.PI * 1/2);  // 60 degrees counterclockwise
    drawKochCurve1(newWidth, newIterations);

    ctx.restore();
  }
}


let counter = 0;
let iterations = 1;

function draw() {
    
    ctx.fillStyle = '#000014';
    ctx.fillRect(0,0,w,h);

    ctx.strokeStyle = 'pink';
    ctx.lineWidth = 2;

    // add some blurring  
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00c';

    //Type 1
    ctx.save();

    ctx.fillStyle = 'white';
    let rectWid = 10;
    ctx.fillRect(midX - rectWid/2,midY - rectWid/2,rectWid,rectWid);

    let segment = w/4;
    //INNER SQUARE
    //top
    ctx.translate(midY - segment/2,midX - segment/2);
    ctx.rotate(45 * Math.PI / 180)
    ctx.translate(segment, segment);
    ctx.beginPath();
    drawKochCurve1(segment, iterations);
    ctx.stroke();

    //right side
    ctx.rotate(Math.PI/2)
    ctx.translate(0, -segment);
    ctx.beginPath();
    drawKochCurve1(w/4, iterations);
    ctx.stroke();

    //bottom
    ctx.rotate(Math.PI/2)
    ctx.translate(0, -segment);
    ctx.beginPath();
    drawKochCurve1(w/4, iterations);
    ctx.stroke();

    //left side
    ctx.rotate(Math.PI/2)
    ctx.translate(0, -segment);
    ctx.beginPath();
    drawKochCurve1(segment, iterations);
    ctx.stroke();

    ctx.restore();


    ctx.save();
    segment = w/2;
    //OUTER SQUARE
    //top
    ctx.translate(w + w/2/2,-h/4.5);
    ctx.rotate(Math.PI / 2)
    ctx.translate(segment, segment);
    ctx.beginPath();
    drawKochCurve1(w/2, iterations);
    ctx.stroke();

    //right side
    ctx.rotate(Math.PI/2)
    ctx.translate(0, -segment);
    ctx.beginPath();
    drawKochCurve1(w/2, iterations);
    ctx.stroke();

    //bottom
    ctx.rotate(Math.PI/2)
    ctx.translate(0, -segment);
    ctx.beginPath();
    drawKochCurve1(w/2, iterations);
    ctx.stroke();

    //left side
    ctx.rotate(Math.PI/2)
    ctx.translate(0, -segment);
    ctx.beginPath();
    drawKochCurve1(w/2, iterations);
    ctx.stroke();

    ctx.restore();

    ////////////////////////////////STARTING OVER

    let segTest = 100;

    ctx.strokeStyle = 'gray';

    //  X-------X
    //  |       |
    //  |   *   |
    //  X-------X

    //Draw Square from Center
    // ctx.save();
    // ctx.beginPath()
    // ctx.moveTo(midX - segTest/2, midY - segTest/2); //TOP LEFT
    // ctx.lineTo(midX + segTest/2, midY - segTest/2); //TOP RIGHT
    // ctx.lineTo(midX + segTest/2, midY + segTest/2); //BOTTOM RIGHT
    // ctx.lineTo(midX - segTest/2, midY + segTest/2); //BOTTOM LEFT
    // ctx.closePath();
    // ctx.stroke();

    ctx.save();
    ctx.translate(midX - segTest/2, midY - segTest/2); //TOP LEFT
    //ctx.rotate(Math.PI / 2)
    ctx.beginPath();
    drawKochCurve1(segTest, iterations);
    ctx.stroke();

    ctx.translate(midX + segTest/2, midY + segTest/2); //TOP RIGHT
    ctx.rotate(Math.PI/2)
    ctx.beginPath();
    drawKochCurve1(segTest, iterations);
    ctx.stroke();
    ctx.restore();


}

function animate(t) {
  if((counter % 120) == 0) {
    draw();
    if(++iterations > maxIterations) {
      iterations = 1;  
    }
  }
  counter++;
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate);
