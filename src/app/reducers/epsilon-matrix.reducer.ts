import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LabNames } from 'types/types';
import type { AppState } from '../store';

export interface IEpsilonMatrixState {
  epsilonMatrix: number[][];
  rIndexes: number[];

  // Epsilon matrix size
  countRow: number;
  countCol: number;
}

const rIndexes = [1, 4, 6];

// Epsilon matrix sizes.
const countRow = 5;
const countCol = 5;

const make2DEpsilonMatrixEmpty = (countRow: number, countCol: number) => {
  let eps: number[][] = [];

  for (let i = 0; i < countRow; i++) {
    eps[i] = [];
    for (let j = 0; j < countCol; j++) {
      eps[i][j] = rIndexes[0];
    }
  }
  return eps;
};

const make1DEpsilonMatrixEmpty = (countCol: number) => {
  let eps: number[][] = [];
  eps[0] = [];
  for (let j = 0; j < countCol; j++) {
    if (j < countCol / 2) {
      eps[0][j] = rIndexes[0];
    } else {
      eps[0][j] = rIndexes[1];
    }
  }
  return eps;
};

const make2DEpsilonMatrixBorder = (countRow: number, countCol: number) => {
  let eps: number[][] = [];

  for (let i = 0; i < countRow; i++) {
    eps[i] = [];
    for (let j = 0; j < countCol; j++) {
      if (i > j) {
        eps[i][j] = rIndexes[0];
      } else {
        eps[i][j] = rIndexes[1];
      }
    }
  }
  return eps;
};

const make2DEpsilonMatrixDifraction = (countRow: number, countCol: number) => {
  let eps: number[][] = [];

  for (let i = 0; i < countRow; i++) {
    eps[i] = [];
    for (let j = 0; j < countCol; j++) {
      eps[i][j] = rIndexes[0];
    }
  }
  for (let i = 0; i < countRow; i += 3) {
    eps[i][Math.floor(countRow / 6)] = rIndexes[1];
  }
  return eps;
};

const initialState: IEpsilonMatrixState = {
  epsilonMatrix: [],
  countRow,
  countCol,
  rIndexes,
};

interface IUpdateEpslonMatrix {
  // Row index.
  i: number;
  // Column index.
  j: number;
  newEpsilonValue: number;
}

export const epsilonMatrixSlice = createSlice({
  name: 'epsilonMatrix',
  initialState,
  reducers: {
    setEpsilonMatrix: (
      state,
      action: PayloadAction<{
        currentLabName: LabNames;
        newCountRow?: number;
        newCountCol?: number;
      }>
    ) => {
      // console.log("sdasd", action.payload.newcountRow)
      if (action.payload.newCountRow && action.payload.newCountCol) {
        state.countRow = action.payload.newCountRow;
        state.countCol = action.payload.newCountCol;
      }

      let eps: number[][] = [];
      switch (action.payload.currentLabName) {
        case LabNames.LAB_2D:
          eps = make1DEpsilonMatrixEmpty(state.countRow);
          console.log('epsL', eps, state.countRow);
          break;
        case LabNames.DIFRACTION:
          eps = make2DEpsilonMatrixDifraction(state.countRow, state.countCol);
          break;
        case LabNames.BORDER:
          eps = make2DEpsilonMatrixBorder(state.countRow, state.countCol);
          break;
        default:
          eps = make2DEpsilonMatrixEmpty(state.countRow, state.countCol);
      }

      state.epsilonMatrix = eps;
    },
    updateEpsilonMatrix: (
      state,
      action: PayloadAction<IUpdateEpslonMatrix>
    ) => {
      console.log("Adasdqdqd", action.payload.i)
      if (state.epsilonMatrix[action.payload.i]) {
        state.epsilonMatrix[action.payload.i][action.payload.j] =
          action.payload.newEpsilonValue;
      }
    }
  },
});

export const { updateEpsilonMatrix, setEpsilonMatrix } =
  epsilonMatrixSlice.actions;

export const selectEpsilonMatrix = (state: AppState) =>
  state.epsilonMatrix.epsilonMatrix;

export const selectEpsilonMatrixCountRow = (state: AppState) =>
  state.epsilonMatrix.countRow;
export const selectEpsilonMatrixCountCol = (state: AppState) =>
  state.epsilonMatrix.countCol;
export const selectEpsilonMatrixValues = (state: AppState) =>
  state.epsilonMatrix.rIndexes;

export default epsilonMatrixSlice.reducer;
