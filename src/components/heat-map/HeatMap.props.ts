import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeatMapProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > {
  minVal: number;
  maxVal: number;
  dataX: number[];
  dataY: number[];
  dataVal: number[];
  width: number;
  height: number;
  srcPositionRelativeX: number;
  srcPositionRelativeY: number;
  withOptions?: boolean;
}
