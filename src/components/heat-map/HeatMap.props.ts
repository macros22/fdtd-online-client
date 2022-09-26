import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IHeatMapProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
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
