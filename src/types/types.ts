export type dataType = {
  dataX: number[];
  dataY: number[];
  dataVal: number[];
  row: number;
  col: number;
  step: number;
  max: number;
  min: number;
};

export enum LabNames {
  LAB_2D = '2D',
  LAB_1D_ZEBRA = 'ZEBRA',
  LAB_3D = '3D',
  DIFRACTION = 'DIFRACTION',
  INTERFERENCE = 'INTERFERENCE',
  BORDER = 'BORDER',
}



export enum LabContentType {
  THEORY = 'THEORY',
  EXPERIMENT = 'EXPERIMENT',
}