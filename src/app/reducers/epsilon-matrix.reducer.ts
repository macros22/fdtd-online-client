import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LabNames } from 'types/types'

import type { AppState } from '../store'


export interface IEpsilonMatrixState {
    epsilonMatrix: number[][],
    rectWidth: number;
    rectHeight: number;
    rIndexes: number[];

    // Epsilon matrix size.
    countX: number;
    countY: number;
}


const rIndexes = [1, 4, 6];

// Epsilon matrix sizes.
const countX = 50;
const countY = 25;

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
}

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
}

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
}


const initialState: IEpsilonMatrixState = {
    epsilonMatrix: [],
    countX,
    countY,
    rectWidth,
    rectHeight,
    rIndexes,
}

interface IUpdateEpslonMatrix1D {
  i: number;
  newEpsilonValue: number;
}

interface IUpdateEpslonMatrix2D {
  i: number;
  j: number;
  newEpsilonValue: number;
}


export const epsilonMatrixSlice = createSlice({
    name: 'epsilonMatrix',
    initialState,
    reducers: {
        setEpsilonMatrix1D: (state) => {
        
            let eps: number[][] = [];

            for (let j = 0; j < countY; j++) {
                if(j < countY/2) {
                    eps[0][j] = rIndexes[0]; 
                } else {
                    eps[0][j] = rIndexes[1]; 
                }
            }
            state.epsilonMatrix = eps;            

        },
        updateEpsilonMatrix1D: (state, action: PayloadAction<IUpdateEpslonMatrix1D>) => {
            // if(state.epsilon1D[action.payload.i, action.payload.j] !== action.payload.newEpsilonValue) {

            // }
            state.epsilonMatrix[0][action.payload.i] = action.payload.newEpsilonValue;
            
        },
        setEpsilonMatrix2D: (state, action: PayloadAction<LabNames>) => {

            let eps: number[][] = [];
            switch (action.payload) {
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
        updateEpsilonMatrix2D: (state, action: PayloadAction<IUpdateEpslonMatrix2D>) => {
            state.epsilonMatrix[action.payload.i][action.payload.j] = action.payload.newEpsilonValue;
        },
    },
})

export const { updateEpsilonMatrix1D, updateEpsilonMatrix2D, setEpsilonMatrix1D, setEpsilonMatrix2D} = epsilonMatrixSlice.actions;


export const selectEpsilonMatrix = (state: AppState) => state.epsilonMatrix.epsilonMatrix;

export const selectEpsilonMatrixCountX = (state: AppState) => state.epsilonMatrix.countX;
export const selectEpsilonMatrixCountY = (state: AppState) => state.epsilonMatrix.countY;
export const selectEpsilonMatrixValues = (state: AppState) => state.epsilonMatrix.rIndexes;
export const selectEpsilonMatrixRectWidth = (state: AppState) => state.epsilonMatrix.rectWidth;
export const selectEpsilonMatrixRectHeight = (state: AppState) => state.epsilonMatrix.rectHeight;

export default epsilonMatrixSlice.reducer;