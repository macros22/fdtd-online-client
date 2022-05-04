// import { data } from './data';

import React from 'react';

import styles from './HeatMap.module.scss';
import { heatmap } from 'utils/heatmap';
import { HeatMapProps } from './HeatMap.props';

const NewHeatMap: React.FC<HeatMapProps> = ({
  minVal = -1,
  maxVal = 1,
  dataX = [],
  dataY = [],
  dataVal = [],
  width,
  height,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasBrushRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasGradientRef = React.useRef<HTMLCanvasElement | null>(null);

  // let radiusInitial = width / 120 + 0.1;
  let radiusInitial = 2.6;
  let blurInitial = radiusInitial * 1.4 + 0.1;
  blurInitial = 0.1;
  // let radiusInitial = 8;
  // let blurInitial = radiusInitial * 1.45;

  // console.log('radiusInitial', radiusInitial);

  const [radius, setRadius] = React.useState<number>(radiusInitial);
  const [blur, setBlur] = React.useState<number>(blurInitial);

  const init = () => {
    if (
      canvasRef.current &&
      canvasBrushRef.current &&
      canvasGradientRef.current
    ) {
      let canvas = canvasRef.current;
      let canvasBrush = canvasBrushRef.current;
      let canvasGradient = canvasGradientRef.current;

      canvas.width = width;
      canvas.height = height;

      let data: [number[], number[], number[]] = [[], [], []];

      if (dataVal.length == 0) {
        for (let i = 0; i < 3e3; ++i) {
          data[0].push(Math.random() * width);
          data[1].push(Math.random() * height);
          data[2].push(Math.random() * 0.5);
        }
      } else {
        data = [dataX, dataY, dataVal];
      }

      const gridSizeFromBackend = 200;

      let heat = new heatmap(canvas, canvasBrush, canvasGradient)
        .newData(...data)
        .min(minVal)
        .max(maxVal)
        .radius(radius, blur)
        .realGridSize(gridSizeFromBackend);
      heat.draw();
    }
  };

  React.useEffect(() => {
    init();
  }, [dataVal, width, height]);

  const radiusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(+e.target.value);
    init();
  };

  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlur(+e.target.value);
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
          step={0.02}
          min={radiusInitial - 2.2}
          max={radiusInitial + 2.2}
        />
        <br />
        <label>Blur </label>
        <input
          onChange={blurHandler}
          type='range'
          id='blur'
          value={blur}
          step={0.02}
          min={0}
          max={blurInitial + 2.2}
        />
      </div>
    </React.Fragment>
  );
};

export default NewHeatMap;
