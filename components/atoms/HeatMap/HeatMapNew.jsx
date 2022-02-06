function simpleheat(canvas, brushCanvas, gradientCanvas) {
  if (!(this instanceof simpleheat))
    return new simpleheat(canvas, brushCanvas, gradientCanvas);

  this._canvas = canvas;
  this._brushCanvas = brushCanvas;
  this._gradientCanvas = gradientCanvas;

  this._ctx = canvas.getContext('2d');
  this._width = canvas.width;
  this._height = canvas.height;

  this._max = 1;
  this._data = [];
}

simpleheat.prototype = {
  defaultRadius: 25,

  defaultGradient: {
    0.4: 'blue',
    0.6: 'cyan',
    0.7: 'lime',
    0.8: 'yellow',
    1.0: 'red',
  },

  data: function (data) {
    this._data = data;
    return this;
  },

  max: function (max) {
    this._max = max;
    return this;
  },

  add: function (point) {
    this._data.push(point);
    return this;
  },

  clear: function () {
    this._data = [];
    return this;
  },

  radius: function (r, blur) {
    blur = blur === undefined ? 15 : blur;

    // create a grayscale blurred circle image that we'll use for drawing points
    var circle = (this._circle = this._brushCanvas);
    let ctx = circle.getContext('2d'),
      r2 = (this._r = r + blur);

    circle.width = circle.height = r2 * 2;

    ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
    ctx.shadowBlur = blur;
    ctx.shadowColor = 'black';

    ctx.beginPath();
    ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    return this;
  },

  resize: function () {
    this._width = this._canvas.width;
    this._height = this._canvas.height;
  },

  gradient: function (grad) {
    // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
    var canvas = this._gradientCanvas,
      ctx = canvas.getContext('2d'),
      gradient = ctx.createLinearGradient(0, 0, 0, 256);

    canvas.width = 1;
    canvas.height = 256;

    for (var i in grad) {
      gradient.addColorStop(+i, grad[i]);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 256);

    this._grad = ctx.getImageData(0, 0, 1, 256).data;

    return this;
  },

  draw: function (minOpacity) {
    if (!this._circle) this.radius(this.defaultRadius);
    if (!this._grad) this.gradient(this.defaultGradient);

    var ctx = this._ctx;

    ctx.clearRect(0, 0, this._width, this._height);

    // draw a grayscale heatmap by putting a blurred circle at each data point
    for (var i = 0, len = this._data.length, p; i < len; i++) {
      p = this._data[i];
      ctx.globalAlpha = Math.min(
        Math.max(
          p[2] / this._max,
          minOpacity === undefined ? 0.05 : minOpacity
        ),
        1
      );
      ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
    }

    // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
    var colored = ctx.getImageData(0, 0, this._width, this._height);
    this._colorize(colored.data, this._grad);
    ctx.putImageData(colored, 0, 0);

    return this;
  },

  _colorize: function (pixels, gradient) {
    for (var i = 0, len = pixels.length, j; i < len; i += 4) {
      j = pixels[i + 3] * 4; // get gradient color from opacity value

      if (j) {
        pixels[i] = gradient[j];
        pixels[i + 1] = gradient[j + 1];
        pixels[i + 2] = gradient[j + 2];
      }
    }
  },
};

import { data } from './data';

import React from 'react';

import styles from './NewHeatMap.module.scss';

const NewHeatMap = () => {
  const canvasRef = React.useRef(null);
  const canvasBrushRef = React.useRef(null);
  const canvasGradientRef = React.useRef(null);

  const [radius, setRadius] = React.useState(25);
  const [blur, setBlur] = React.useState(15);

  const init = () => {
    setTimeout(() => {
      console.log(
        !!(
          canvasRef.current &&
          canvasBrushRef.current &&
          canvasGradientRef.current
        )
      );
      let canvas = canvasRef.current;
      let canvasBrush = canvasBrushRef.current;
      let canvasGradient = canvasGradientRef.current;

      canvas.width = 400;
      canvas.height = 400;

      var heat = simpleheat(canvas, canvasBrush, canvasGradient)
        .data(data)
        .max(18)
        .radius(radius, blur);
      heat.draw();
      //   console.log(heat._data);
    }, 0);
  };

  React.useEffect(() => {
    init();
  }, []);

  const radiusHandler = (e) => {
    console.log(e.target.value);
    setRadius(e.target.value);
    init();
  };

  const blurHandler = (e) => {
    console.log(e.target.value);
    setBlur(e.target.value);
    init();
  };

  return (
    <React.Fragment>
      <canvas style={{ display: 'none' }} ref={canvasBrushRef} />
      <canvas style={{ display: 'none' }} ref={canvasGradientRef} />
      <canvas ref={canvasRef} />

      <div className={styles.options}>
        <label>Radius </label>
        <input
          onChange={radiusHandler}
          type='range'
          id='radius'
          value={radius}
          min='10'
          max='50'
        />
        <br />
        <label>Blur </label>
        <input
          onChange={blurHandler}
          type='range'
          id='blur'
          value={blur}
          min='10'
          max='50'
        />
      </div>
    </React.Fragment>
  );
};

export default NewHeatMap;
