

export type pointType = [number, number, number];

export class heatmap {

    private grad: Uint8ClampedArray | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private width: number = 0;
    private height: number = 0;

    brushRadius: number = 25;

    _max: number = 1;
    _min: number = -1;
    _data: pointType[] = [[0, 0, 0]];

    dataX: number[] = [];
    dataY: number[] = [];
    dataVal: number[] = []

    constructor(private readonly canvas: HTMLCanvasElement, private readonly brushCanvas: HTMLCanvasElement, private readonly gradientCanvas: HTMLCanvasElement) {

        this.ctx = canvas.getContext('2d') || null;
        this.width = canvas.width;
        this.height = canvas.height;


        // this.max(1);
        // this.data([]);
    }

    newData(dataX: number[], dataY: number[], dataVal: number[]) {
        this.dataX = dataX;
        this.dataY = dataY;
        this.dataVal = dataVal;
        return this;
    }

    defaultRadius = 25;

    // defaultGradient: { [key: string]: string } = {
    //     0.4: 'blue',
    //     0.6: 'cyan',
    //     0.7: 'lime',
    //     0.8: 'yellow',
    //     1.0: 'red',
    // }

    defaultGradient: { [key: string]: string } = {
        // 0: 'blue',
        // 0.4: 'cyan',
        // 0.5: 'lime',
        // 0.6: 'yellow',
        // 1.0: 'red',
        0: 'red',
        0.5: 'white',
        1: 'blue',
    }

    data(newData: pointType[]) {
        this._data = newData;
        return this;
    }

    max(max: number) {
        this._max = max;
        return this;
    }

    min(min: number) {
        this._min = min;
        return this;
    }

    add(point: pointType) {
        this._data.push(point);
        return this;
    }

    clear() {
        this._data = [[0, 0, 0]];
        return this;
    }

    radius(r: number, blur: number) {

        blur = blur === undefined ? 15 : blur;

        // create a grayscale blurred circle image that we'll use for drawing points
        let circle = this.brushCanvas;
        let ctx = circle.getContext('2d');
        let r2 = (this.brushRadius = r + blur);
        if (ctx) {
            circle.width = circle.height = r2 * 2;

            ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
            ctx.shadowBlur = blur;
            ctx.shadowColor = 'black';

            ctx.beginPath();
            ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
        return this;
    }

    resize() {
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    gradient(grad: {
        [key: string]: string;
    }) {
        // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
        let canvas = this.gradientCanvas;
        let ctx = canvas.getContext('2d');

        if (ctx) {
            let gradient = ctx.createLinearGradient(0, 0, 0, 256);

            canvas.width = 1;
            canvas.height = 256;

            for (let i in grad) {
                gradient.addColorStop(+i, grad[i]);
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1, 256);

            this.grad = ctx.getImageData(0, 0, 1, 256).data;
        }
        return this;
    }

    draw(minOpacity: number = 0.05) {
        // if (!this._circle) this.radius(this.defaultRadius);
        if (!this.grad) this.gradient(this.defaultGradient);

        let ctx = this.ctx;

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
                    Math.max(
                        p / Math.abs(this._max - this._min),
                        minOpacity
                    ),
                    1
                );
                ctx.drawImage(this.brushCanvas, this.dataX[i] - this.brushRadius, this.dataY[i] - this.brushRadius);
            }

            // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
            let colored = ctx.getImageData(0, 0, this.width, this.height);

            this.colorize(colored.data, this.grad);
            ctx.putImageData(colored, 0, 0);

        }
        return this;
    }

    private colorize(pixels: Uint8ClampedArray, gradient: Uint8ClampedArray | null) {
        for (let i = 0, len = pixels.length, j; i < len; i += 4) {
            j = pixels[i + 3] * 4; // get gradient color from opacity value

            if (j && gradient) {
                pixels[i] = gradient[j];
                pixels[i + 1] = gradient[j + 1];
                pixels[i + 2] = gradient[j + 2];
            }
        }
    }

};