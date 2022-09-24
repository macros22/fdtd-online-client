import { defaultGradient } from "libs/utils/default-gradient";

export type Point = [number, number, number];

export class HeatMapBuilder {
  private grad: Uint8ClampedArray | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private width = 0;
  private height = 0;

  private srcPositionRelativeX = 0;
  private srcPositionRelativeY = 0;

  brushRadius = 25;

  _max = 1;
  _min = -1;

  // For scaling data.
  _realGridSize = 240;

  dataX: number[] = [];
  dataY: number[] = [];
  dataVal: number[] = [];

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly brushCanvas: HTMLCanvasElement,
    private readonly gradientCanvas: HTMLCanvasElement
  ) {
    this.ctx = canvas.getContext("2d") || null;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  newData(dataX: number[], dataY: number[], dataVal: number[]): this {
    this.dataX = dataX;
    this.dataY = dataY;
    this.dataVal = dataVal;
    return this;
  }

  defaultRadius = 25;

  defaultGradient: { [key: string]: string } = defaultGradient || {
    // 0: 'red',
    // 0.5: 'white',
    // 1: 'blue',
    0.0: "red",
    0.25: "orange",
    0.45: "yellow",
    0.55: "green",
    0.75: "blu",
    1: "violet",
  };

  // For scaling data.
  realGridSize(gridSize: number): this {
    this._realGridSize = gridSize;
    return this;
  }

  // For scaling data.
  getRealX(x: number) {
    return (x * this.width) / this._realGridSize;
  }

  // For scaling data.
  getRealY(y: number) {
    return (y * this.height) / this._realGridSize;
  }

  max(max: number): this {
    this._max = max;
    return this;
  }

  min(min: number): this {
    this._min = min;
    return this;
  }

  addPoint(point: Point): this {
    this.dataX.push(point[0]);
    this.dataY.push(point[1]);
    this.dataVal.push(point[2]);
    return this;
  }

  clear(): this {
    this.dataX = [];
    this.dataY = [];
    this.dataVal = [];
    return this;
  }

  radius(r: number, blur: number): this {
    blur = blur === undefined ? 15 : blur;

    // create a grayscale blurred circle image that we'll use for drawing points
    const circle = this.brushCanvas;
    const ctx = circle.getContext("2d");
    this.brushRadius = r + blur;
    if (ctx) {
      circle.width = circle.height = this.brushRadius * 2;

      ctx.shadowOffsetX = ctx.shadowOffsetY = this.brushRadius * 2;
      ctx.shadowBlur = blur;
      ctx.shadowColor = "black";

      ctx.beginPath();
      ctx.arc(-this.brushRadius, -this.brushRadius, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }
    return this;
  }

  resize() {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  setSourcePosition(
    srcPositionRelativeX: number,
    srcPositionRelativeY: number
  ): this {
    this.srcPositionRelativeX = srcPositionRelativeX;
    this.srcPositionRelativeY = srcPositionRelativeY;
    return this;
  }

  gradient(grad: { [key: string]: string }): this {
    // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
    const canvas = this.gradientCanvas;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 256);

      canvas.width = 1;
      canvas.height = 256;

      for (const i in grad) {
        gradient.addColorStop(+i, grad[i]);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1, 256);

      this.grad = ctx.getImageData(0, 0, 1, 256).data;
    }
    return this;
  }

  draw(minOpacity = 0.05): this {
    // if (!this._circle) this.radius(this.defaultRadius);
    if (!this.grad) this.gradient(this.defaultGradient);

    const ctx = this.ctx;

    if (ctx) {
      ctx.clearRect(0, 0, this.width, this.height);

      // draw a grayscale heatmap by putting a blurred circle at each data point
      // for (let i = 0, len = this._data.length, p; i < len; i++) {
      //     p = this._data[i];
      //     p[2] += Math.abs(this._min)
      //     ctx.globalAlpha = Math.min(
      //         Math.max(
      //             p[2] / Math.abs(this._max - this._min),
      //             // (p[2] + Math.abs(- this._min)) / (this._max + Math.abs(- this._min)),
      //             minOpacity
      //         ),
      //         1
      //     );
      //     ctx.drawImage(this.brushCanvas, p[0] - this.brushRadius, p[1] - this.brushRadius);
      // }
      for (let i = 0, len = this.dataVal.length; i < len; i++) {
        const p = this.dataVal[i] + Math.abs(this._min);
        ctx.globalAlpha = Math.min(
          Math.max(p / Math.abs(this._max - this._min), minOpacity),
          1
        );
        ctx.drawImage(
          this.brushCanvas,
          this.getRealX(this.dataX[i]) - this.brushRadius,
          this.getRealX(this.dataY[i]) - this.brushRadius
        );
      }

      // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
      const colored = ctx.getImageData(0, 0, this.width, this.height);

      this.colorize(colored.data, this.grad);
      ctx.putImageData(colored, 0, 0);

      // Draw source position.
      // ctx.beginPath();
      // ctx.fillStyle = "blue";
      // ctx.globalAlpha= 0.65;
      // const radius = 14;
      // ctx.arc(this.width*this.srcPositionRelativeX, this.height - this.height*this.srcPositionRelativeY, radius, 0, 2 * Math.PI);
      // ctx.fill();
      // ctx.closePath();
    }
    return this;
  }

  private colorize(
    pixels: Uint8ClampedArray,
    gradient: Uint8ClampedArray | null
  ) {
    for (let i = 0, len = pixels.length, j; i < len; i += 4) {
      j = pixels[i + 3] * 4; // get gradient color from opacity value

      if (j && gradient) {
        pixels[i] = gradient[j]; // red
        pixels[i + 1] = gradient[j + 1]; // green
        pixels[i + 2] = gradient[j + 2]; // blue
      }
    }
  }
}
