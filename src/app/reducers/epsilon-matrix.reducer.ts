import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LabNames } from 'types/types';
import type { AppState } from '../store';

export interface IEpsilonMatrixState {
  epsilonMatrix: number[][];
  rectWidth: number;
  rectHeight: number;
  rIndexes: number[];

  // Epsilon matrix size.
  countX: number;
  countY: number;
}

const rIndexes = [1, 4, 6];

// Epsilon matrix sizes.
const countX = 15;
const countY = 1;

const width = 400;
const height = 400;
const rectWidth = width / countX;
const rectHeight = height / countY;

const make2DEpsilonMatrixEmpty = () => {
  let eps: number[][] = [];

  for (let i = 0; i < countX; i++) {
    eps[i] = [];
    for (let j = 0; j < countY; j++) {
      eps[i][j] = rIndexes[0];
    }
  }
  return eps;
};

const make1DEpsilonMatrixEmpty = () => {
  let eps: number[][] = [];

  for (let j = 0; j < countY; j++) {
    if (j < countY / 2) {
      eps[0][j] = rIndexes[0];
    } else {
      eps[0][j] = rIndexes[1];
    }
  }
  return eps;
};

const make2DEpsilonMatrixBorder = () => {
  let eps: number[][] = [];

  for (let i = 0; i < countX; i++) {
    eps[i] = [];
    for (let j = 0; j < countY; j++) {
      if (i < j) {
        eps[i][j] = rIndexes[0];
      } else {
        eps[i][j] = rIndexes[1];
      }
    }
  }
  return eps;
};

const make2DEpsilonMatrixDifraction = () => {
  let eps: number[][] = [];

  for (let i = 0; i < countX; i++) {
    eps[i] = [];
    for (let j = 0; j < countY; j++) {
      eps[i][j] = rIndexes[0];
    }
  }
  for (let j = 0; j < countX; j += 3) {
    eps[Math.floor(countX / 6)][j] = rIndexes[1];
  }
  return eps;
};

const initialState: IEpsilonMatrixState = {
  epsilonMatrix: [],
  countX,
  countY,
  rectWidth,
  rectHeight,
  rIndexes,
};

interface IUpdateEpslonMatrix {
  i: number;
  j: number;
  newEpsilonValue: number;
}

export const epsilonMatrixSlice = createSlice({
  name: 'epsilonMatrix',
  initialState,
  reducers: {
    setEpsilonMatrix: (state, action: PayloadAction<LabNames>) => {
      let eps: number[][] = [];
      switch (action.payload) {
        case LabNames.LAB_2D:
          eps = make1DEpsilonMatrixEmpty();
          break;
        case LabNames.DIFRACTION:
          eps = make2DEpsilonMatrixDifraction();
          break;
        case LabNames.BORDER:
          eps = make2DEpsilonMatrixBorder();
          break;
        default:
          eps = make2DEpsilonMatrixEmpty();
      }

      state.epsilonMatrix = eps;
    },
    updateEpsilonMatrix: (
      state,
      action: PayloadAction<IUpdateEpslonMatrix>
    ) => {
      state.epsilonMatrix[action.payload.i][action.payload.j] =
        action.payload.newEpsilonValue;
    },
  },
});

export const { updateEpsilonMatrix, setEpsilonMatrix } =
  epsilonMatrixSlice.actions;

export const selectEpsilonMatrix = (state: AppState) =>
  state.epsilonMatrix.epsilonMatrix;

export const selectEpsilonMatrixCountX = (state: AppState) =>
  state.epsilonMatrix.countX;
export const selectEpsilonMatrixCountY = (state: AppState) =>
  state.epsilonMatrix.countY;
export const selectEpsilonMatrixValues = (state: AppState) =>
  state.epsilonMatrix.rIndexes;
export const selectEpsilonMatrixRectWidth = (state: AppState) =>
  state.epsilonMatrix.rectWidth;
export const selectEpsilonMatrixRectHeight = (state: AppState) =>
  state.epsilonMatrix.rectHeight;

export default epsilonMatrixSlice.reducer;
