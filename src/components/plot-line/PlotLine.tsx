import { drawCircle } from "libs/utils/canvas-draw";
import React from "react";
import { DrawType } from "./PlotLine.interface";
import { ICanvasProps, IPlotLineProps } from "./PlotLine.props";
import { useCanvas } from "./useCanvas";

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

// Line chart tutorial.
// https://www.c-sharpcorner.com/UploadFile/18ddf7/html5-line-graph-using-canvas/

export const PlotLine = ({
  data,
  maxX,
  maxY,
  minX,
  minY,
  WIDTH,
  HEIGHT,
  epsilonData,
  srcPositionRelative,
}: IPlotLineProps) => {
  const PADDING = 5;

  const deltaX = minX >= 0 ? maxX : maxX - minX;
  // const deltaY = minY >= 0 ? maxY : maxY - minY;
  const deltaY = Math.max(Math.abs(minY), Math.abs(maxY)) * 2;
  // const deltaY = 3.6;

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
  const y0 = chartY0 - (0 - deltaY / 2) * scaleY;

  // Transform browser Y-axis to real world.
  const tY = (y: number) => HEIGHT - y;

  type PointType = {
    x: number;
    y: number;
  };

  const data1: PointType[] = [];
  // const data2: PointType[] = [];

  const epsilonDataInterval = CHART_WIDTH / epsilonData.length;
  const maxEpsilon = Math.max(...epsilonData);
  const minEpsilon = Math.min(...epsilonData);
  const epsilonScale = CHART_HEIGHT / 2 / maxEpsilon;

  let prevY = 0;

  for (let i = 0; i * epsilonDataInterval <= CHART_WIDTH; ++i) {
    const newX = i * epsilonDataInterval;
    const newY = epsilonData[i] - minEpsilon;

    // Make meander epsilon line profile.
    if (i > 0) {
      if (newY !== prevY) {
        data1.push({ x: newX, y: prevY });
      }
    }

    data1.push({ x: newX, y: newY });

    prevY = newY;
  }

  const draw: DrawType = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "gray";
    ctx.beginPath();

    // Draw x axis.
    ctx.moveTo(chartX0, tY(chartY0));
    ctx.lineTo(chartX0 + CHART_WIDTH, tY(chartY0));

    // Draw y axis.
    ctx.moveTo(chartX0, tY(chartY0));
    ctx.lineTo(chartX0, tY(chartY0 + CHART_HEIGHT));

    ctx.setLineDash([2]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0,0,0,0.1)";

    // Draw Ox tick marks.
    for (let x = chartX0; x <= chartX0 + CHART_WIDTH; x += INTERVAL_X) {
      ctx.moveTo(x, tY(chartY0) - TICK_MARKS_HEIGHT / 2);
      ctx.lineTo(x, tY(chartY0 + CHART_HEIGHT));
    }

    // Draw Oy tick marks.
    for (let y = chartY0; y <= chartY0 + CHART_HEIGHT; y += INTERVAL_Y) {
      ctx.moveTo(chartX0 - TICK_MARKS_HEIGHT / 2, tY(y));
      ctx.lineTo(chartX0 + CHART_WIDTH, tY(y));
    }
    ctx.stroke();

    // Draw tick marks numbers.
    ctx.font = "10pt Inter bold";
    ctx.fillStyle = "gray";
    ctx.textBaseline = "middle";

    // Draw Ox tick marks numbers.
    ctx.textAlign = "center";
    for (let x = chartX0; x < chartX0 + CHART_WIDTH; x += INTERVAL_X * 2) {
      const label = String(Math.round(x - chartX0).toFixed());
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
    ctx.textAlign = "right";
    for (let y = chartY0; y <= chartY0 + CHART_HEIGHT; y += INTERVAL_Y * 2) {
      const label = ((y0 + y) / scaleY).toFixed(2) + "";
      ctx.save();
      ctx.translate(chartX0 - PADDING * 2, tY(y));
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }
    ctx.restore();

    ctx.setLineDash([]);

    // console.log(data)
    if (data[0]) drawLine(ctx, data, "red", 2, scaleX, scaleY);
    drawLine(ctx, data1, "blue", 1, 1, epsilonScale, true);

    const srcRadius = 10;
    const srcPositionX = srcPositionRelative * CHART_WIDTH;
    const srcPositionY = 0;
    drawCircle(
      ctx,
      x0 + srcPositionX,
      tY(y0 + srcPositionY * scaleY),
      "blue",
      epsilonScale,
      srcRadius,
      true
    );

  };

  const drawLine = (
    ctx: CanvasRenderingContext2D,
    data: PointType[],
    color = "black",
    width = 3,
    scaleX: number,
    scaleY: number,
    isDashedLine = false
  ) => {
    ctx.save();
    ctx.lineWidth = width;
    if (isDashedLine) {
      ctx.setLineDash([2]);
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x0 + data[0].x * scaleX, tY(y0 + data[0].y * scaleY));

    for (let n = 0; n < data.length; n++) {
      const point = data[n];

      // Draw line segment.
      ctx.lineTo(chartX0 + point.x * scaleX, tY(y0 + point.y * scaleY));
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(chartX0 + point.x * scaleX, tY(y0 + point.y * scaleY));
      ctx.closePath();
    }
    ctx.restore();
  };


  return (
    <Canvas draw={draw} width={WIDTH} height={HEIGHT} />
  );
};


const Canvas = ({ draw, width, height, ...props }: ICanvasProps): JSX.Element => {
  const canvasRef = useCanvas(draw, width, height);

  return (
    <canvas ref={canvasRef} {...props} />
  );
};

