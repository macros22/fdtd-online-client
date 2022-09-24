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
