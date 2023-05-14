import { color } from "html2canvas/dist/types/css/types/color";
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
    0: 'red',
    0.5: 'white',
    1: 'blue',
    // 0.0: "red",
    // 0.25: "orange",
    // 0.45: "yellow",
    // 0.55: "green",
    // 0.75: "blue",
    // 1: "violet",
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
    this.brushRadius = r;
    if (ctx) {
      // circle.width = circle.height = this.brushRadius * 2;

      // ctx.shadowOffsetX = ctx.shadowOffsetY = this.brushRadius;
      // ctx.shadowBlur = blur/2;
      // ctx.shadowColor = "black";

      // circle.width = circle.height = this.brushRadius;
      ctx.globalCompositeOperation = "copy";
      // remove anti-aliasing for drawImage
      ctx.imageSmoothingEnabled = false;
      ctx.beginPath();
      // ctx.arc(-this.brushRadius, -this.brushRadius, r, 0, Math.PI * 2, true);
      ctx.rect(0, 0, this.brushRadius, this.brushRadius);
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

      // this.colorize(colored.data, this.grad);
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

  drawNew(canvas): this {

    // if (!this._circle) this.radius(this.defaultRadius);
    if (!this.grad) this.gradient(this.defaultGradient);

    // const ctx = this.ctx;

    if (this.ctx) {
      // this.ctx.clearRect(0, 0, this.width, this.height);
      // In case we draw again, reset all to defaults
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.globalCompositeOperation = "source-over";

      const img = this.ctx.createImageData(this.width, this.height);
      // wrap it inside an Uint32Array so that we can work on it faster

      // const arrayBuffer = new ArrayBuffer(WIDTH * HEIGHT * 4);
      const pixels = new Uint8ClampedArray(img.data.buffer);
      // const pixels = new Uint32Array(img.data.buffer);
      // we could have worked directly with the Uint8 version
      // but our loop would have needed to iterate 4 pixels every time

      // just to draw a radial-gradient
      const rad = (this.width * Math.random()) / 5;

      // for (let x = 0; x < this._realGridSize; x++) {
      //   for (let y = 0; y < this._realGridSize; y++) {
      //     // make a radial-gradient
      // const dist = Math.min(Math.hypot(rad - x, rad - y), rad);
      // const color = 0xff * ((rad - dist) / rad) + 0xff000000;
      // pixels[y * this.width + x] = color;
      //   }
      // }
      const minOpacity = 0.15;
      for (let i = 0, len = this.dataVal.length; i < len; i++) {
        const p = this.dataVal[i] + Math.abs(this._min);
        const alpha = Math.min(
          Math.max(p / Math.abs(this._max - this._min), minOpacity),
          1
        );
        // const color = `rgba(255, 255, 255, ${alpha})`;
        // const color = `rgb(255, 255, 220)`;

        const dist = Math.min(
          Math.hypot(rad - this.dataX[i], rad - this.dataY[i]),
          rad
        );
        // const color = 0xff * ((rad - dist) / rad) + 0xff000000;

        // const color = -0xff * alpha + 0xff000000;
        // const color = RGBAToHexA(140,140,140,alpha) + 0xff000000
        // console.log(color)
        // pixels[] = color;
        const k = (this.dataY[i] * this.width + this.dataX[i]) * 4;
        pixels[k  ] = 0;   // red
        pixels[k+1] = 0;   // green
        pixels[k+2] = 0;   // blue
        pixels[k+3] = Math.floor(255*alpha); // alpha
      }

      // here we are still at 50x50 pixels
      // const colored = this.ctx.getImageData(0, 0, this.width, this.height);
      this.colorize(pixels, this.grad);
      this.ctx.putImageData(img, 0, 0);
      // this.ctx.putImageData(colored, 0, 0);
      // in case we had transparency, this composite mode will ensure
      // that only what we draw after is kept on the canvas
      this.ctx.globalCompositeOperation = "copy";
      // remove anti-aliasing for drawImage
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.scale(this.width/this._realGridSize, this.height/this._realGridSize);
      // draw the canvas over itself
      this.ctx.drawImage(canvas, 0, 0);
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
