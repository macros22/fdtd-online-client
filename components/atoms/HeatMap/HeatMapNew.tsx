import { data } from './data';

import React from 'react';

import styles from './NewHeatMap.module.scss';
import { heatmap } from 'utils/heatmap';

type HeatMapProps = {
  minVal: number;
  maxVal: number;
  dataX: number[];
  dataY: number[];
  dataVal: number[];
  width?: number;
  height?: number;
};

const NewHeatMap: React.FC<HeatMapProps> = ({
  minVal = -1,
  maxVal = 1,
  dataX = [],
  dataY = [],
  dataVal = [],
  width = 400,
  height = 400,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasBrushRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasGradientRef = React.useRef<HTMLCanvasElement | null>(null);

  let radiusInitial = width / 185;
  let blurInitial = radiusInitial * 1.15;

  console.log('radiusInitial', radiusInitial);

  const [radius, setRadius] = React.useState<number>(radiusInitial);
  const [blur, setBlur] = React.useState<number>(blurInitial);

  const init = () => {
    // setTimeout(() => {
    if (
      canvasRef.current &&
      canvasBrushRef.current &&
      canvasGradientRef.current
    ) {
      let canvas = canvasRef.current;
      let canvasBrush = canvasBrushRef.current;
      let canvasGradient = canvasGradientRef.current;

      canvas.width = 400;
      canvas.height = 400;

      let heat = new heatmap(canvas, canvasBrush, canvasGradient)
        // .data(data)
        .newData(dataX, dataY, dataVal)
        .min(minVal)
        .max(maxVal)
        .radius(radius, blur);
      heat.draw();
    }
    // }, 0);
  };

  React.useEffect(() => {
    init();
  }, [dataVal]);

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
          min={radiusInitial - 0.2}
          max={radiusInitial + 0.2}
        />
        <br />
        <label>Blur </label>
        <input
          onChange={blurHandler}
          type='range'
          id='blur'
          value={blur}
          step={0.02}
          min={blurInitial - 0.2}
          max={blurInitial + 0.2}
        />
      </div>
    </React.Fragment>
  );
};

export default NewHeatMap;
