import { IPoint } from "libs/types/types";

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color = "black",
  width = 3,
  radius = 5,
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
  color = "black"
) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(x, y, width, height);
  ctx.fill();
};

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  data: IPoint[],
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

export const drawStar = ({
  ctx,
  cx,
  cy,
  spikes = 5,
  outerRadius = 10,
  innerRadius = 4,
}: {
  ctx: CanvasRenderingContext2D;
  cx: number;
  cy: number;
  spikes?: number;
  outerRadius?: number;
  innerRadius?: number;
}) => {
  ctx.save();
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.restore();
};

export const applyLineStyle = ({
  ctx,
  color = "rgba(0,0,0,0.15)",
  isLineDashed = false,
}: {
  ctx: CanvasRenderingContext2D;
  isLineDashed?: boolean;
  color?: string;
}) => {
  ctx.setLineDash(isLineDashed ? [2] : []);
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.stroke();
};

export const drawPlotMarksX = ({
  ctx,
  xStart,
  xEnd,
  interval,
  chartY0,
  chartHeight,
  markLength,
  tY,
}: {
  ctx: CanvasRenderingContext2D;
  xStart: number;
  xEnd: number;
  interval: number;
  chartY0: number;
  chartHeight: number;
  markLength: number;
  tY: (y: number) => number;
}) => {
  for (let x = xStart; x <= xEnd; x += interval) {
    ctx.moveTo(x, tY(chartY0) - markLength / 2);
    ctx.lineTo(x, tY(chartY0 + chartHeight));
  }

  applyLineStyle({ ctx, isLineDashed: true });
};

export const drawPlotMarksY = ({
  ctx,
  yStart,
  yEnd,
  interval,
  chartX0,
  chartWidth,
  markLength,
  tY,
}: {
  ctx: CanvasRenderingContext2D;
  yStart: number;
  yEnd: number;
  interval: number;
  chartX0: number;
  chartWidth: number;
  markLength: number;
  tY: (y: number) => number;
}) => {
  for (let y = yStart; y <= yEnd; y += interval) {
    ctx.moveTo(chartX0 - markLength / 2, tY(y));
    ctx.lineTo(chartX0 + chartWidth, tY(y));
  }

  applyLineStyle({ ctx, isLineDashed: true });
};

export const drawAxis = ({
  ctx,
  chartY0,
  chartX0,
  chartWidth,
  chartHeight,
  tY,
  shouldAxisXDraw = true,
  shouldAxisYDraw = true,
}: {
  ctx: CanvasRenderingContext2D;
  chartY0: number;
  chartX0: number;
  chartWidth: number;
  chartHeight: number;
  tY: (y: number) => number;
  shouldAxisXDraw?: boolean;
  shouldAxisYDraw?: boolean;
}) => {
  if (shouldAxisXDraw) {
    ctx.moveTo(chartX0, tY(chartY0));
    ctx.lineTo(chartX0 + chartWidth, tY(chartY0));
  }

  if (shouldAxisYDraw) {
    ctx.moveTo(chartX0, tY(chartY0));
    ctx.lineTo(chartX0, tY(chartY0 + chartHeight));
  }
  applyLineStyle({ ctx });
};

export const drawTickMarksNumbers = ({
  ctx,
  chartY0,
  chartX0,
  chartWidth,
  chartHeight,
  tY,
  padding,
  intervalX,
  intervalY,
  shouldTickMarksXDraw = true,
  shouldTickMarksYDraw = true,
  y0,
  scaleY,
  minYLabel = -1,
  maxYLabel = 1,
  intervalYLabel = 0.1,
  minXLabel = 0,
  maxXLabel = 100,
  intervalXLabel = 10,
}: {
  ctx: CanvasRenderingContext2D;
  chartY0: number;
  chartX0: number;
  chartWidth: number;
  chartHeight: number;
  padding: number;
  intervalX: number;
  intervalY: number;
  tY: (y: number) => number;
  shouldTickMarksXDraw?: boolean;
  shouldTickMarksYDraw?: boolean;
  y0: number;
  scaleY: number;
  minYLabel?: number;
  maxYLabel?: number;
  intervalYLabel?: number;
  minXLabel?: number;
  maxXLabel?: number;
  intervalXLabel?: number;
}) => {
  ctx.font = "10pt Inter bold";
  ctx.fillStyle = "gray";
  ctx.textBaseline = "middle";

  if (shouldTickMarksXDraw) {
    ctx.textAlign = "center";
    const coef = 2;
    for (
      let x = chartX0, i = 0;
      x < chartX0 + chartWidth;
      x += intervalX * coef, i += coef
    ) {
      const label = (minXLabel + i * intervalXLabel).toFixed().toString();
      // const label = Math.round(x - chartX0)
      //   .toFixed()
      //   .toString();
      ctx.save();
      ctx.translate(x, tY(chartY0 - padding * 3));
      // ctx.translate(x, tY(chartY0));

      ctx.fillText(label, 0, 0);
      ctx.restore();
    }
  }

  if (shouldTickMarksYDraw) {
    ctx.textAlign = "right";
    const TOP_SHIFT = 10;
    for (
      let y = chartY0, i = 0;
      y <= chartY0 + chartHeight + TOP_SHIFT;
      y += intervalY, i += 1
    ) {
      // const label = ((y0 + y) / scaleY).toFixed(2).toString();

      const label = (minYLabel + i * intervalYLabel)
        .toExponential(2)
        .toString();

      ctx.save();
      ctx.translate(chartX0 - padding * 2, tY(y));
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }
  }
};
