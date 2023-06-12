import React from "react";
import { defaultData } from "./data";
import { HeatMapBuilder } from "./heatmap-builder";
import { IHeatMapProps } from "./HeatMap.props";

export const HeatMap = ({
  minVal = -1,
  maxVal = 1,
  dataX = [],
  dataY = [],
  dataVal = [],
  width,
  height,
  srcPositionRelativeX = 0,
  srcPositionRelativeY = 0,
  withOptions = false,
}: IHeatMapProps): JSX.Element => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasBrushRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasGradientRef = React.useRef<HTMLCanvasElement | null>(null);

  const radiusInitial = 2.6;
  let blurInitial = radiusInitial * 1.4 + 0.1;
  // blurInitial = 0.1;
  blurInitial = 0.01;

  const [radius, setRadius] = React.useState<number>(radiusInitial);
  const [blur, setBlur] = React.useState<number>(blurInitial);

  const [heatMap, setHeatMap] = React.useState<HeatMapBuilder | null>(null);

  const init = () => {
    if (
      canvasRef.current &&
      canvasBrushRef.current &&
      canvasGradientRef.current
    ) {
      const canvas = canvasRef.current;
      const canvasBrush = canvasBrushRef.current;
      const canvasGradient = canvasGradientRef.current;

      const gridSizeFromBackend = 220;

      canvas.width = width;
      canvas.height = height;

      // canvas.width = gridSizeFromBackend;
      // canvas.height = gridSizeFromBackend;

      let data: [number[], number[], number[]] = [[], [], []];

      // console.log(width);

      if (dataVal.length == 0) {
        // if (true) {
        // for (let i = 0; i < 8e3; ++i) {
        //   data[0].push(Math.random() * width);
        //   data[1].push(Math.random() * height);
        //   data[2].push(Math.random() * 0.2);
        // }
        const coef = 0.9;
        const coef2 = 0.1;
        for (let i = 0; i < 3e5; ++i) {
          data[0].push(
            Math.ceil(
              gridSizeFromBackend * coef +
                Math.random() * gridSizeFromBackend * coef2
            )
          );
          data[0].push(Math.ceil(Math.random() * gridSizeFromBackend * coef2));

          data[1].push(
            Math.ceil(
              gridSizeFromBackend * coef +
                Math.random() * gridSizeFromBackend * coef2
            )
          );
          data[1].push(Math.ceil(Math.random() * gridSizeFromBackend * coef2));
          data[2].push(Math.random() * 2 - 1);
          data[2].push(Math.random() * 2 - 1);
        }
        // for (let i = 0; i < defaultData.length; ++i) {
        //   data[0].push(defaultData[i][0]);
        //   data[1].push(defaultData[i][1]);
        //   data[2].push(defaultData[i][2]);
        // }
      } else {
        data = [dataX, dataY, dataVal];
      }

      // console.log(data);

      // const gridSizeFromBackend = 220;

      // const scaleX = width / gridSizeFromBackend;
      // const scaleY = height / gridSizeFromBackend;
      // const trData = [[], [], []] as [[number], [number], [number]];
      // for (let i = 0; i <= data[0].length; ++i) {
      //   trData[0][i] = Math.ceil(data[0][i] * scaleX);
      //   trData[1][i] = Math.ceil(data[1][i] * scaleY);
      //   trData[2][i] = data[2][i];
      // }

      // console.log(width/gridSizeFromBackend-0.7)
      // console.log("width", width);
      // console.log("dataVal.length", dataVal.length);
      const heatMap = new HeatMapBuilder(canvas, canvasBrush, canvasGradient)
        .newData(...data)
        .min(minVal)
        .max(maxVal)
        .min(-1)
        .max(1)
        // .radius(radius, blur)
        // .radius((width/gridSizeFromBackend)*0.92, blur)
        .realGridSize(gridSizeFromBackend)
        .setSourcePosition(srcPositionRelativeX, srcPositionRelativeY)
        // .draw();
        // .drawNew(canvas);
        .drawNew2(canvas);

      setHeatMap(heatMap);
    }
  };

  React.useEffect(() => {
    init();
  }, [dataVal, width, height]);

  // React.useEffect(() => {
  //   if (heatMap) {
  //     heatMap
  //       .setSourcePosition(srcPositionRelativeX, srcPositionRelativeY)
  //       .draw();
  //   }
  // }, [srcPositionRelativeX, srcPositionRelativeY]);

  const radiusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(+e.target.value);
    init();
  };

  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlur(+e.target.value);
    init();
  };

  return (
    <div>
      <canvas style={{ display: "none" }} ref={canvasBrushRef} />
      <canvas style={{ display: "none" }} ref={canvasGradientRef} />
      {/* <canvas width={60} height={height} /> */}
      <canvas ref={canvasRef} />

      {withOptions && (
        <div>
          <label>Radius </label>
          <input
            onChange={radiusHandler}
            type="range"
            id="radius"
            value={radius}
            step={0.02}
            min={radiusInitial - 2.2}
            max={radiusInitial + 2.2}
          />
          <br />
          <label>Blur </label>
          <input
            onChange={blurHandler}
            type="range"
            id="blur"
            value={blur}
            step={0.02}
            min={0}
            max={blurInitial + 2.2}
          />
        </div>
      )}
    </div>
  );
};
