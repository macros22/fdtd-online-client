import React from 'react';
import { DataChartType } from 'types/lab1';
import useCanvas, { drawType } from './useCanvas';

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

// Line chart tutorial.
// https://www.c-sharpcorner.com/UploadFile/18ddf7/html5-line-graph-using-canvas/

type ImageCanvasProps = {
  data: DataChartType;
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
  WIDTH: number;
  HEIGHT: number;
};

const ImageCanvas: React.FC<ImageCanvasProps> = ({
  data,
  maxX,
  maxY,
  minX,
  minY,
  WIDTH,
  HEIGHT,
}) => {
  const PADDING = 5;

  const deltaX = minX >= 0 ? maxX : maxX - minX;
  // const deltaY = minY >= 0 ? maxY : maxY - minY;
  const deltaY = Math.max(Math.abs(minY), Math.abs(maxY))*2;
  // const deltaY = 0.2;

  // const scaleX = WIDTH / deltaX;
  // const scaleY = HEIGHT / deltaY;
  // const pointRadius = 5;

  const INTERVAL_X = 30;
  const INTERVAL_Y = 20;

  const CHART_WIDTH = WIDTH - PADDING * 8;
  const CHART_HEIGHT = HEIGHT - PADDING * 6;

  const scaleX = CHART_WIDTH / deltaX;
  const scaleY = CHART_HEIGHT / deltaY;

  const TICK_MARKS_HEIGHT = 6;

  const chartX0 = WIDTH - CHART_WIDTH;
  const chartY0 = HEIGHT - CHART_HEIGHT;

  const x0 = chartX0;
  // const y0 = chartY0 - minY * scaleY;
  const y0 = chartY0 - (0 - deltaY/2) * scaleY ;

  // Transform browser Y-axis to real world.
  const tY = (y: number) => HEIGHT - y;

  type dataType = {
    x: number;
    y: number;
  };

  // const data1: dataType[] = [];
  // const data2: dataType[] = [];

  // for (let x = 0; x <= CHART_WIDTH; x += INTERVAL_X) {
  //   data1.push({ x, y: Math.random() * 400 });
  //   data2.push({ x, y: Math.random() * 350 });
  // }

  const draw: drawType  = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'gray';
    ctx.beginPath();

    // Draw x axis.
    ctx.moveTo(chartX0, tY(chartY0));
    ctx.lineTo(chartX0 + CHART_WIDTH, tY(chartY0));

    // Draw y axis.
    ctx.moveTo(chartX0, tY(chartY0));
    ctx.lineTo(chartX0, tY(chartY0 + CHART_HEIGHT));

    ctx.lineWidth = 2;

    // Draw Ox tick marks.
    for (let x = chartX0; x <= chartX0 + CHART_WIDTH; x += INTERVAL_X) {
      ctx.moveTo(x, tY(chartY0) - TICK_MARKS_HEIGHT / 2);
      ctx.lineTo(x, tY(chartY0) + TICK_MARKS_HEIGHT / 2);
    }

    // Draw Oy tick marks.
    for (let y = chartY0; y <= chartY0 + CHART_HEIGHT; y += INTERVAL_Y) {
      ctx.moveTo(chartX0 - TICK_MARKS_HEIGHT / 2, tY(y));
      ctx.lineTo(chartX0 + TICK_MARKS_HEIGHT / 2, tY(y));
    }

    // set line color
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
    // ctx.arc(50, 100, 40 * Math.sin(frameCount * 0.025) ** 2, 0, 3 * Math.PI);
    // ctx.fill();

    // Draw tick marks numbers.
    ctx.font = '10pt Roboto bold';
    ctx.fillStyle = 'gray';
    ctx.textBaseline = 'middle';

    // Draw Ox tick marks numbers.
    ctx.textAlign = 'center';
    for (let x = chartX0; x <= chartX0 + CHART_WIDTH; x += INTERVAL_X * 2) {
      const label = String(Math.round(x - chartX0));
      // const label2 = data[0].x;
      ctx.save();
      ctx.translate(x, tY(chartY0 - PADDING * 3));
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }
    ctx.restore();

    // console.log('sum', y0+chartY0);
    // console.log('sumstr', y0+chartY0+"");

    // Draw Oy tick marks numbers.
    ctx.textAlign = 'right';
    for (let y = chartY0; y <= chartY0 + CHART_HEIGHT; y += INTERVAL_Y * 2) {
      const label = (y0 + y).toFixed() + '';
      ctx.save();
      ctx.translate(chartX0 - PADDING * 2, tY(y));
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }
    ctx.restore();

    // console.log(data)
    if(data[0])
      drawLine(ctx, data, 'red', 2);
    // drawLine(ctx, data1, 'blue', 2);
    // drawLine(ctx, data2, 'red', 2);
  };

  // const transformContext = (ctx: CanvasRenderingContext2D) => {

  //  // move context to center of canvas
  //  ctx.translate(chartX0, chartY0 + this.height);

  //  // invert the y scale so that that increments
  //  // as you move upwards
  //  context.scale(1, -1);
  // };

  const drawLine = (
    ctx: CanvasRenderingContext2D,
    data: dataType[],
    color: string = 'black',
    width: number = 3
  ) => {
    ctx.save();
    //  transformContext();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x0 + data[0].x * scaleX, tY(y0 + data[0].y * scaleY));

    for (var n = 0; n < data.length; n++) {
      var point = data[n];

      // Draw line segment.
      ctx.lineTo(chartX0 + point.x * scaleX, tY(y0 + point.y * scaleY));
      ctx.stroke();
      ctx.closePath();

      // Draw dot segment.
      // ctx.beginPath();
      // ctx.arc(chartX0+point.x * scaleX, tY(chartY0+point.y * scaleY), pointRadius, 0, 2 * Math.PI, false);
      // ctx.fill();
      // ctx.closePath();

      // position for next segment
      ctx.beginPath();
      // console.log(y0, chartY0);
      ctx.moveTo(chartX0 + point.x * scaleX, tY(y0 + point.y * scaleY));
    }
    ctx.restore();
  };

  return (
    <>
      <Canvas draw={draw} width={WIDTH} height={HEIGHT} />
    </>
  );
};

type CanvasProps = {
  draw: drawType ;
  width: number;
  height: number;
  rest?: any;
};

const Canvas: React.FC<CanvasProps> = ({ rest, draw, width, height }) => {
  const canvasRef = useCanvas(draw, width, height);

  return <canvas ref={canvasRef} {...rest} />;
};

export default ImageCanvas;
