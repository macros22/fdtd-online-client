import { MaterialForBackend } from "libs/utils/transform-materials-array";

export type DataType = {
  dataX: number[];
  dataY: number[];
  dataVal: number[];
  row: number;
  col: number;
  step: number;
  max: number;
  min: number;
};

export enum SimulationDimension {
  SIMULATION_1D = "1D",
  SIMULATION_2D = "2D",
}

export enum ContentType {
  THEORY = "THEORY",
  SIMULATION = "SIMULATION",
}

export interface IPoint {
  x: number;
  y: number;
}

export type EventType = "start" | "pause" | "continue" | "close";

type SimulationType = SimulationDimension | "2D_TFSF";

export type SourceType = "sin" | "gaussian";

export type MessageToBackend = {
  event: EventType;
  type: SimulationType;
  dataToReturn: number;
  condition: [number, number];
  materialMatrix: number[][];
  materials: MaterialForBackend[];
  srcPositionRelative: IPoint[];
  srcType: number;
};
