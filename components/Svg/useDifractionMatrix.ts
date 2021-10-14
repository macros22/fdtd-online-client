import * as React from 'react';

export const useDifractionMatrix = (width = 400, height = 400) => {
  // Refraction indexes.
  const rIndex1 = 1;
  const rIndex2 = 1.5;

  const count = 14;
  const n = count * 2;
  const rectHeight: number = height / (count * 2);
  const rectWidth = rectHeight;

  let matrix: number[][] = [];
  for (let i = 0; i < n; i++) {
    //matrix.push([]);
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      matrix[i][j] = rIndex1;
    }
  }

  for (let i = 0; i < n; i += 2) {
    matrix[i][5] = rIndex2;
  }

  const [matrix2, setMatrix] = React.useState(matrix);

  return {
    matrix: matrix2,
    setMatrix,
    rectWidth,
    rectHeight,
    rIndex2,
    n,
  };
};
