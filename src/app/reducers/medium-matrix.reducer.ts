import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LabNames } from 'types/types';
import type { AppState } from '../store';

export interface IMediumMatrixState {
  // Electric permittivity.
  epsilonMatrix: number[][];

  // Conductivity.
  omegaMatrix: number[][];

  omegas: number[];
  rIndexes: number[];

  // Epsilon matrix size
  countRow: number;
  countCol: number;

  // sourcePositionRelativeX: number;
  // sourcePositionRelativeY: number;
}

const rIndexes = [4.85418e-12, (4.85418e-12)*3, (4.85418e-12)*5];

// Conductivity
const omegas = [0, 0.04, 0.01];
// const rIndexes = [1,2,4];

// Epsilon matrix sizes.
const countRow = 5;
const countCol = 5;
// const sourcePositionRelativeX = 0.2;
// const sourcePositionRelativeY = 0;


const make1DEpsilonMatrixEmpty = (countCol: number, rIndexes: number[] ) => {
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

const make1DOmegaMatrixEmpty = (countCol: number ) => {
  let omega: number[][] = [];
  omega[0] = [];
  for (let j = 0; j < countCol; j++) {
    if (j < countCol / 2) {
      omega[0][j] = omegas[0];
    } else {
      omega[0][j] = omegas[1];
    }
  }
  return omega;
};



const make2DEpsilonMatrixEmpty = (countRow: number, countCol: number, rIndexes: number[]) => {
  let eps: number[][] = [];

  for (let i = 0; i < countRow; i++) {
    eps[i] = [];
    for (let j = 0; j < countCol; j++) {
      eps[i][j] = rIndexes[0];
    }
  }
  return eps;
};

const make2DOmegaMatrixEmpty = (countRow: number, countCol: number) => {
  let omega: number[][] = [];

  for (let i = 0; i < countRow; i++) {
    omega[i] = [];
    for (let j = 0; j < countCol; j++) {
      omega[i][j] = omegas[0];
    }
  }
  return omega;
};


const make2DEpsilonMatrixBorder = (countRow: number, countCol: number, rIndexes: number[]) => {
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

const make2DEpsilonMatrixDifraction = (countRow: number, countCol: number, rIndexes: number[]) => {
  let eps: number[][] = [];

  for (let i = 0; i < countRow; i++) {
    eps[i] = [];
    for (let j = 0; j < countCol; j++) {
      eps[i][j] = rIndexes[0];
    }
  }
  const difractionGridPosition = Math.floor(countRow / 8);

  for (let i = 0; i < countRow; i++) {
    eps[i][difractionGridPosition] = rIndexes[1];
  }
  for (let i = 0; i < countRow; i += 3) {
    eps[i][difractionGridPosition] = rIndexes[0];
  }
  return eps;
};

const initialState: IMediumMatrixState = {
  epsilonMatrix: [],
  omegaMatrix: [],
  countRow,
  countCol,
  // sourcePositionRelativeX,
  // sourcePositionRelativeY,
  omegas,
  rIndexes,
};

interface IUpdateEpslonMatrix {
  // Row index.
  i: number;
  // Column index.
  j: number;
  newEpsilonValue: number;
  newOmegaValue: number;
}

export const mediumMatrixesSlice = createSlice({
  name: 'mediumMatrixes',
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
      let omega: number[][] = [];
      switch (action.payload.currentLabName) {
        case LabNames.LAB_2D:
          eps = make1DEpsilonMatrixEmpty(state.countCol, state.rIndexes);
          omega = make1DOmegaMatrixEmpty(state.countCol);
          // console.log('epsL', eps, state.countCol);
          break;
        case LabNames.DIFRACTION:
          eps = make2DEpsilonMatrixDifraction(state.countRow, state.countCol, state.rIndexes);
          omega = make2DOmegaMatrixEmpty(state.countRow, state.countCol);
          break;
        case LabNames.BORDER:
          eps = make2DEpsilonMatrixBorder(state.countRow, state.countCol, state.rIndexes);
          omega = make2DOmegaMatrixEmpty(state.countRow, state.countCol);
          break;
        default:
          eps = make2DEpsilonMatrixEmpty(state.countRow, state.countCol, state.rIndexes);
          omega = make2DOmegaMatrixEmpty(state.countRow, state.countCol);
      }

      state.epsilonMatrix = eps;
      state.omegaMatrix = omega;
    },
    updateMediumMatrixes: (
      state,
      action: PayloadAction<IUpdateEpslonMatrix>
    ) => {
      // console.log("Adasdqdqd", action.payload.i)
      if (state.epsilonMatrix[action.payload.i]) {
        state.epsilonMatrix[action.payload.i][action.payload.j] =
          action.payload.newEpsilonValue;
        state.omegaMatrix[action.payload.i][action.payload.j] =
          action.payload.newOmegaValue;
      }
    },
    setRefractiveIndexes: (
      state,
      action: PayloadAction<number[]>
    ) => {
      state.rIndexes = action.payload;
    }
  },
});

export const { updateMediumMatrixes, setEpsilonMatrix, setRefractiveIndexes } =
  mediumMatrixesSlice.actions;

export const selectEpsilonMatrix = (state: AppState) =>
  state.mediumMatrixes.epsilonMatrix;

export const selectEpsilonMatrixCountRow = (state: AppState) =>
  state.mediumMatrixes.countRow;
export const selectEpsilonMatrixCountCol = (state: AppState) =>
  state.mediumMatrixes.countCol;
export const selectEpsilonMatrixValues = (state: AppState) =>
  state.mediumMatrixes.rIndexes;
  export const selectOmegaMatrixValues = (state: AppState) =>
  state.mediumMatrixes.omegas;

export default mediumMatrixesSlice.reducer;
