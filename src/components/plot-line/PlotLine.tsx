import React from "react";
import { Canvas } from "components";
import { drawCircle, drawLine } from "libs/utils/canvas-draw";
import { DrawType } from "./PlotLine.interface";
import { IPlotLineProps } from "./PlotLine.props";
import { IPoint } from "libs/types/types";

export const PlotLine = ({
  data: dataLine,
  maxX,
  maxY,
  minX,
  minY,
  canvasWidth,
  canvasHeight,
  epsilonData,
  srcPositionRelative,
}: IPlotLineProps) => {
  const padding = 5;

  const deltaX = minX >= 0 ? maxX : maxX - minX;
  const deltaY = Math.max(Math.abs(minY), Math.abs(maxY)) * 2;

  const intervalX = 30;
  const intervalY = 20;

  const chartWidth = canvasWidth - padding * 8;
  const chartHeight = canvasHeight - padding * 6;

  const scaleX = chartWidth / deltaX;
  const scaleY = chartHeight / deltaY;

  const tickMarksLength = 6;

  const chartX0 = canvasWidth - chartWidth;
  const chartY0 = canvasHeight - chartHeight;

  const x0 = chartX0;
  const y0 = chartY0 - (0 - deltaY / 2) * scaleY;

  // Transform browser Y-axis to 180 degrees.
  const tY = (y: number) => canvasHeight - y;

  // Fill epsilon line data.
  const epsilonLine: IPoint[] = [];

  const epsilonDataInterval = chartWidth / epsilonData.length;
  const maxEpsilon = Math.max(...epsilonData);
  const minEpsilon = Math.min(...epsilonData);
  const epsilonScale = chartHeight / (2 * maxEpsilon);

  let prevY = 0;

  for (let i = 0; i * epsilonDataInterval <= chartWidth; ++i) {
    const newX = i * epsilonDataInterval;
    const newY = epsilonData[i] - minEpsilon;

    // Make meander epsilon line profile.
    if (i > 0) {
      if (newY !== prevY) {
        epsilonLine.push({ x: newX, y: prevY });
      }
    }

    epsilonLine.push({ x: newX, y: newY });

    prevY = newY;
  }

  const draw: DrawType = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "gray";
    ctx.beginPath();

    // Draw x axis.
    ctx.moveTo(chartX0, tY(chartY0));
    ctx.lineTo(chartX0 + chartWidth, tY(chartY0));

    // Draw y axis.
    ctx.moveTo(chartX0, tY(chartY0));
    ctx.lineTo(chartX0, tY(chartY0 + chartHeight));

    // Draw tick marks.
    ctx.setLineDash([2]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0,0,0,0.1)";

    // Draw X tick marks.
    for (let x = chartX0; x <= chartX0 + chartWidth; x += intervalX) {
      ctx.moveTo(x, tY(chartY0) - tickMarksLength / 2);
      ctx.lineTo(x, tY(chartY0 + chartHeight));
    }

    // Draw Y tick marks.
    for (let y = chartY0; y <= chartY0 + chartHeight; y += intervalY) {
      ctx.moveTo(chartX0 - tickMarksLength / 2, tY(y));
      ctx.lineTo(chartX0 + chartWidth, tY(y));
    }
    ctx.stroke();

    // Draw tick marks numbers.
    ctx.font = "10pt Inter bold";
    ctx.fillStyle = "gray";
    ctx.textBaseline = "middle";

    // Draw X tick marks numbers.
    ctx.textAlign = "center";
    for (let x = chartX0; x < chartX0 + chartWidth; x += intervalX * 2) {
      const label = Math.round(x - chartX0).toFixed().toString();
      ctx.save();
      ctx.translate(x, tY(chartY0 - padding * 3));
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }
    ctx.restore();

    // Draw Y tick marks numbers.
    ctx.textAlign = "right";
    for (let y = chartY0; y <= chartY0 + chartHeight; y += intervalY * 2) {
      const label = ((y0 + y) / scaleY).toFixed(2).toString();
      ctx.save();
      ctx.translate(chartX0 - padding * 2, tY(y));
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }
    ctx.restore();

    ctx.setLineDash([]);

    // Draw data line.
    if (dataLine.length) {
      const dataLineScaled = dataLine.map(p => ({
        x: chartX0 + p.x * scaleX,
        y: tY(y0 + p.y * scaleY)
      }))
      drawLine(ctx, dataLineScaled, "red", 2)
    };

    // Draw epsilon line.
    const epsilonLineScaled = epsilonLine.map(p => ({
      x: chartX0 + p.x,
      y: tY(y0 + p.y * epsilonScale)
    }))
    drawLine(ctx, epsilonLineScaled, "blue", 1, true);

    // Draw source point.
    const srcRadius = 8;
    const srcPositionX = srcPositionRelative * chartWidth;
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

  return (
    <Canvas draw={draw} width={canvasWidth} height={canvasHeight} />
  );
};