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

// export enum LabNames {
//   LAB_2D = '2D',
//   LAB_1D_ZEBRA = 'ZEBRA',
//   LAB_3D = '3D',
//   DIFRACTION = 'DIFRACTION',
//   INTERFERENCE = 'INTERFERENCE',
//   BORDER = 'BORDER',
// }

export enum SimulationDimension {
  SIMULATION_1D = "1D",
  SIMULATION_2D = "2D",
}

export enum ContentType {
  THEORY = "THEORY",
  SIMULATION = "SIMULATION",
}
