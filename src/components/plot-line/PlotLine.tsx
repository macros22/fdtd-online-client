import React from "react";
import { Canvas } from "components";
import styles from "./PlotLine.module.scss";
import {
  applyLineStyle,
  drawAxis,
  drawCircle,
  drawLine,
  drawPlotMarksX,
  drawPlotMarksY,
  drawStar,
  drawTickMarksNumbers,
} from "libs/utils/canvas-draw";
import { DrawType } from "./PlotLine.interface";
import { IPlotLineProps } from "./PlotLine.props";
import { IPoint } from "libs/types/types";

export const PlotLine = ({
  // data: dataLine,
  data = [
    {
      x: 0,
      y: -1,
    },
    {
      x: 50,
      y: 1,
    },
    {
      x: 100,
      y: -1,
    },
  ],
  maxX = 100,
  maxY = 1,
  minX = 0,
  minY = -1,
  canvasWidth,
  canvasHeight,
  epsilonData,
  srcPositionRelative,
}: Partial<IPlotLineProps>) => {
  const padding = 5;
  const dataLine = data;
  // console.log("dataLine", dataLine);
  // console.log("dataLine.length", dataLine.length);

  const deltaX = minX >= 0 ? maxX : maxX - minX;
  const deltaY = Math.max(Math.abs(minY), Math.abs(maxY)) * 2;

  const intervalX = 30;
  const intervalY = 20;

  const chartWidth = canvasWidth - padding * 15;
  const chartHeight = canvasHeight + padding * 3;
  // const chartWidth = canvasWidth;
  // const chartHeight = canvasHeight;

  const intervalYLabel = ((maxY - minY) * intervalY) / chartHeight;
  const intervalXLabel = ((maxX - minX) * intervalX) / chartWidth;

  const scaleX = chartWidth / deltaX;
  const scaleY = chartHeight / deltaY;

  const tickMarksLength = 6;

  const TOP_SHIFT = 10;
  const chartX0 = canvasWidth - chartWidth;
  const chartY0 = canvasHeight - chartHeight - TOP_SHIFT;

  const x0 = chartX0;
  const y0 = chartY0 - (0 - deltaY / 2) * scaleY;

  // Transform browser Y-axis to 180 degrees.
  const tY = (y: number) => canvasHeight - y;

  // Fill epsilon line data.
  const epsilonLine: IPoint[] = [];

  let epsilonScale = 1;
  if (epsilonData) {
    const epsilonDataInterval = chartWidth / epsilonData.length;
    const maxEpsilon = Math.max(...epsilonData);
    const minEpsilon = Math.min(...epsilonData);
    epsilonScale = chartHeight / (2 * maxEpsilon);

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
  }

  const draw: DrawType = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "gray";
    // ctx.beginPath();

    drawAxis({ ctx, chartY0, chartX0, chartWidth, chartHeight, tY });

    drawPlotMarksX({
      ctx,
      xStart: chartX0,
      xEnd: chartX0 + chartWidth,
      interval: intervalX,
      chartY0: chartY0,
      chartHeight: chartHeight,
      markLength: tickMarksLength,
      tY,
    });

    drawPlotMarksY({
      ctx,
      yStart: chartY0,
      yEnd: chartY0 + chartHeight,
      interval: intervalY,
      chartX0,
      chartWidth,
      markLength: tickMarksLength,
      tY,
    });

    drawTickMarksNumbers({
      ctx,
      chartY0,
      chartX0,
      chartWidth,
      chartHeight,
      tY,
      padding,
      intervalX,
      intervalY,
      y0,
      scaleY,
      maxYLabel: maxY,
      minYLabel: minY,
      intervalYLabel,
      maxXLabel: maxX,
      minXLabel: minX,
      intervalXLabel,
    });

    ctx.restore();

    ctx.setLineDash([]);

    // Draw data line.
    if (dataLine.length) {
      const dataLineScaled = dataLine.map((p) => ({
        x: chartX0 + p.x * scaleX,
        y: tY(y0 + p.y * scaleY),
      }));
      drawLine(ctx, dataLineScaled, "red", 2);
    }

    if (epsilonData) {
      // Draw epsilon line.
      const epsilonLineScaled = epsilonLine.map((p) => ({
        x: chartX0 + p.x,
        y: tY(y0 + p.y * epsilonScale),
      }));
      drawLine(ctx, epsilonLineScaled, "blue", 1, true);
    }

    if (srcPositionRelative) {
      // Draw source point.
      const srcRadius = 8;
      const srcPositionX = srcPositionRelative * chartWidth;
      const srcPositionY = 0;

      drawStar({
        ctx,
        cx: x0 + srcPositionX,
        cy: tY(y0 + srcPositionY * scaleY),
      });
      // drawCircle(
      //   ctx,

      //   ,
      //   "blue",
      //   epsilonScale,
      //   srcRadius,
      //   true
      // );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelY}>Ex</div>
      <div className={styles.labelX}>x</div>
      <Canvas draw={draw} width={canvasWidth} height={canvasHeight} />
    </div>
  );
};
