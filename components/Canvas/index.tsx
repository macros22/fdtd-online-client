import React from 'react';
import useCanvas from './useCanvas';

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258


// Line chart tuttorial.
// https://www.c-sharpcorner.com/UploadFile/18ddf7/html5-line-graph-using-canvas/

const ImageCanvas: React.FC = () => {

  const WIDTH = 650;
  const HEIGHT = 450;
  const PADDING = 5;

  const INTERVAL_X = 20;
  const INTERVAL_Y = 20;

  const CHART_WIDTH = WIDTH-PADDING*2;
  const CHART_HEIGHT = HEIGHT-PADDING*2;

  const x0 = PADDING;
  const y0 = HEIGHT-PADDING;

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'gray';
    ctx.beginPath();
    // Draw x axis.
    ctx.moveTo(x0, y0)
    ctx.lineTo(x0+CHART_WIDTH, y0);
    ctx.lineWidth = 1;

    // Draw intervals.
    for(let x = x0; x <= x0+CHART_WIDTH; x += INTERVAL_X) {
      
    }


    // set line color
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
    // ctx.arc(50, 100, 40 * Math.sin(frameCount * 0.025) ** 2, 0, 3 * Math.PI);
    // ctx.fill();
  };

  return (
    <>
      <Canvas draw={draw} />
    </>
  );
};

type CanvasProps = {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
  rest?: any;
};

const Canvas: React.FC<CanvasProps> = ({ rest, draw }) => {
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} />;
};

export default ImageCanvas;
