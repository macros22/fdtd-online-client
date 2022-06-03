import { Material } from 'store/reducers/material-matrix.reducer';

// export const make1DMatrixEmpty = (countRow: number, countCol: number, materials: Material[]) => {
//   let materialMatrix: string[][] = [[]];

//   for (let j = 0; j < countCol; j++) {
//     if (j < countCol / 2) {
//       materialMatrix[0][j] = materials[0].name;
//     } else {
//       materialMatrix[0][j] = materials[1].name;
//     }
//   }
//   materialMatrix[0][countCol - 1] = materials[0].name;
//   return materialMatrix;
// };

export const makeMatrixEmpty = (
  countRow: number,
  countCol: number,
  materials: Material[]
) => {
  let materialMatrix: string[][] = [[]];

  for (let i = 0; i < countRow; i++) {
    materialMatrix[i] = [];
    for (let j = 0; j < countCol; j++) {
      materialMatrix[i][j] = materials[0].name;
    }
  }
  return materialMatrix;
};

export const makeMatrixBorder = (
  countRow: number,
  countCol: number,
  materials: Material[]
) => {
  let materialMatrix: string[][] = [];

  for (let i = 0; i < countRow; i++) {
    materialMatrix[i] = [];
    for (let j = 0; j < countCol; j++) {
      if (i > j) {
        materialMatrix[i][j] = materials[0].name;
      } else {
        materialMatrix[i][j] = materials[1].name;
      }
    }
  }
  return materialMatrix;
};

export const makeMatrixDifraction = (
  countRow: number,
  countCol: number,
  materials: Material[]
) => {
  let materialMatrix: string[][] = [];

  for (let i = 0; i < countRow; i++) {
    materialMatrix[i] = [];
    for (let j = 0; j < countCol; j++) {
      materialMatrix[i][j] = materials[0].name;
    }
  }
  const difractionGridPosition = Math.floor(countRow / 8);

  for (let i = 0; i < countRow; i++) {
    materialMatrix[i][difractionGridPosition] = materials[1].name;
  }
  for (let i = 0; i < countRow; i += 3) {
    materialMatrix[i][difractionGridPosition] = materials[0].name;
  }
  return materialMatrix;
};
