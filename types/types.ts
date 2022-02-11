export type dataType = {
  dataX: number[];
  dataY: number[];
  dataVal: number[];
  row: number;
  col: number;
  step: number;
};

export enum LabNames {
  LAB_2D = '2D',
  LAB_3D = '3D',
  DIFRACTION = 'DIFRACTION',
  INTERFERENCE = 'INTERFERENCE',
  BORDER = 'BORDER',
}

export enum LabContentType {
  THEORY = 'THEORY',
  EXPERIMENT = 'EXPERIMENT',
}