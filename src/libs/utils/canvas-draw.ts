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
  

