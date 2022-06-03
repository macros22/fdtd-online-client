import { DataChartType } from "types/lab1";

export type Plot1DProps = {
    data: DataChartType;
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    WIDTH: number;
    HEIGHT: number;
    epsilonData: number[];
    srcPositionRelative: number;
  };