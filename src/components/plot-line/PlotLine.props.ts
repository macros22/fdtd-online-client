import { DetailedHTMLProps, HTMLAttributes } from "react";
import { DataChartType } from "libs/types/lab1";
import { DrawType } from "./PlotLine.interface";

export interface IPlotLineProps extends DetailedHTMLProps<HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
  data: DataChartType;
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
  WIDTH: number;
  HEIGHT: number;
  epsilonData: number[];
  srcPositionRelative: number;
}


export interface ICanvasProps extends DetailedHTMLProps<HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
  draw: DrawType;
  width: number;
  height: number;
}

