import { PointType } from "libs/types/types";

export const drawCircle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color = "black",
    width = 3,
    radius = 20,
    isDashedLine = false
) => {
    ctx.lineWidth = width;
    if (isDashedLine) {
        ctx.setLineDash([2]);
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
};

export const drawRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color = "black",
  ) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
  };
  
  export const drawLine = (
    ctx: CanvasRenderingContext2D,
    data: PointType[],
    color = "black",
    width = 3,
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
    ctx.moveTo(data[0].x, data[0].y);

    for (let n = 0; n < data.length; n++) {
      const point = data[n];
      // Draw line segment.
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.closePath();
    }
    ctx.restore();
  };
