import { medium } from 'app/reducers/medium-matrix.reducer';

// export const make1DMatrixEmpty = (countRow: number, countCol: number, mediums: medium[]) => {
//   let mediumMatrix: string[][] = [[]];

//   for (let j = 0; j < countCol; j++) {
//     if (j < countCol / 2) {
//       mediumMatrix[0][j] = mediums[0].name;
//     } else {
//       mediumMatrix[0][j] = mediums[1].name;
//     }
//   }
//   mediumMatrix[0][countCol - 1] = mediums[0].name;
//   return mediumMatrix;
// };

export const makeMatrixEmpty = (
  countRow: number,
  countCol: number,
  mediums: medium[]
) => {
  let mediumMatrix: string[][] = [[]];

  for (let i = 0; i < countRow; i++) {
    mediumMatrix[i] = [];
    for (let j = 0; j < countCol; j++) {
      mediumMatrix[i][j] = mediums[0].name;
    }
  }
  return mediumMatrix;
};

export const makeMatrixBorder = (
  countRow: number,
  countCol: number,
  mediums: medium[]
) => {
  let mediumMatrix: string[][] = [];

  for (let i = 0; i < countRow; i++) {
    mediumMatrix[i] = [];
    for (let j = 0; j < countCol; j++) {
      if (i > j) {
        mediumMatrix[i][j] = mediums[0].name;
      } else {
        mediumMatrix[i][j] = mediums[1].name;
      }
    }
  }
  return mediumMatrix;
};

export const makeMatrixDifraction = (
  countRow: number,
  countCol: number,
  mediums: medium[]
) => {
  let mediumMatrix: string[][] = [];

  for (let i = 0; i < countRow; i++) {
    mediumMatrix[i] = [];
    for (let j = 0; j < countCol; j++) {
      mediumMatrix[i][j] = mediums[0].name;
    }
  }
  const difractionGridPosition = Math.floor(countRow / 8);

  for (let i = 0; i < countRow; i++) {
    mediumMatrix[i][difractionGridPosition] = mediums[1].name;
  }
  for (let i = 0; i < countRow; i += 3) {
    mediumMatrix[i][difractionGridPosition] = mediums[0].name;
  }
  return mediumMatrix;
};
