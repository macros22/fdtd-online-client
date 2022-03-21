import React from 'react';
import { DataChartType } from 'types/lab1';
import useCanvas, { drawType } from '../../molecules/Canvas/useCanvas';

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

// Line chart tutorial.
// https://www.c-sharpcorner.com/UploadFile/18ddf7/html5-line-graph-using-canvas/

type ImageCanvasProps = {
  WIDTH: number;
  HEIGHT: number;
};

const DragAndDrop: React.FC<ImageCanvasProps> = ({
  WIDTH,
  HEIGHT,
}) => {

////////////////////////////////
const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

if (canvasRef.current) {
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    canvas.setAttribute('width', '' + WIDTH);
    canvas.setAttribute('height', '' + HEIGHT);
    var BB = canvas.getBoundingClientRect();
    var offsetX = BB.left;
    var offsetY = BB.top;
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    // listen for mouse events
    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;
    canvas.onmousemove = myMove;

// drag related variables
var dragok = false;
var startX: number;/*from  w  w w .  d em o2 s. c o m*/
var startY: number;
// an array of objects that define different rectangles
var rects: any[] = [];
rects.push({
    x: 75 - 15,
    y: 50 - 15,
    width: 30,
    height: 30,
    fill: "#444444",
    isDragging: false
});
rects.push({
    x: 75 - 25,
    y: 50 - 25,
    width: 30,
    height: 30,
    fill: "#ff550d",
    isDragging: false
});
rects.push({
    x: 75 - 35,
    y: 50 - 35,
    width: 30,
    height: 30,
    fill: "#800080",
    isDragging: false
});
rects.push({
    x: 75 - 45,
    y: 50 - 45,
    width: 30,
    height: 30,
    fill: "#0c64e8",
    isDragging: false
});

// call to draw the scene
draw();
// draw a single rect
function rect(x: number, y: number, w: number, h: number) {
    if(context){
       context.beginPath();
        context.rect(x, y, w, h);
        context.closePath();
        context.fill();
}
}
// clear the canvas
function clear() {
    if(context)
        context.clearRect(0, 0, WIDTH, HEIGHT);
}
// redraw the scene
function draw() {
    clear();
    if(context){
        context.fillStyle = "#FAF7F8";
        rect(0, 0, WIDTH, HEIGHT);
        // redraw each rect in the rects[] array
        for (var i = 0; i < rects.length; i++) {
            var r = rects[i];
            context.fillStyle = r.fill;
            rect(r.x, r.y, r.width, r.height);
        }
    }
}
// handle mousedown events
function myDown(e: { preventDefault: () => void; stopPropagation: () => void; clientX: number; clientY: number; }) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();
    // get the current mouse position
    var mx = e.clientX - offsetX;
    var my = e.clientY - offsetY;
    // test each rect to see if mouse is inside
    dragok = false;
    for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
            // if yes, set that rects isDragging=true
            dragok = true;
            r.isDragging = true;
        }
    }
    // save the current mouse position
    startX = mx;
    startY = my;
}
// handle mouseup events
function myUp(e: MouseEvent) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();
    // clear all the dragging flags
    dragok = false;
    for (var i = 0; i < rects.length; i++) {
        rects[i].isDragging = false;
    }
}
// handle mouse moves
function myMove(e: MouseEvent) {
    // if we're dragging anything...
    if (dragok) {
        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();
        // get the current mouse position
        var mx = e.clientX - offsetX;
        var my = e.clientY - offsetY;
        // calculate the distance the mouse has moved
        // since the last mousemove
        var dx = mx - startX;
        var dy = my - startY;
        // move each rect that isDragging
        // by the distance the mouse has moved
        // since the last mousemove
        for (var i = 0; i < rects.length; i++) {
            var r = rects[i];
            if (r.isDragging) {
                r.x += dx;
                r.y += dy;
            }
        }
        // redraw the scene with the new rect positions
        draw();
        // reset the starting mouse position for the next mousemove
        startX = mx;
        startY = my;
    }
}

//////////////////////////////////////
}



  return (
    <>
        <canvas ref={canvasRef} />
    </>
  );
};


export default DragAndDrop;
