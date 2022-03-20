import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LabNames } from 'types/types'

import type { AppState } from '../store'


export interface IEpsilonMatrixState {
    epsilon1D: number[],
    rectWidth1D: number,
    rectHeight1D: number,
    epsilonVectorSize1D: number;

    epsilon2D: number[][],
    rectWidth: number;
    rectHeight: number;
    rIndexes: number[];
    readonly epsilonMatrixSize2D: number;
}


const rIndexes = [1, 4, 6];

const epsilonVectorSize1D = 10;
const epsilonMatrixSize2D = 50;

const width = 400;

const make2DEpsilonMatrixEmpty = () => {

  let eps: number[][] = [];

  for (let i = 0; i < epsilonMatrixSize2D; i++) {
    eps[i] = [];
    for (let j = 0; j < epsilonMatrixSize2D; j++) {
      eps[i][j] = rIndexes[0];
    }
  }
  return eps;
}

const make2DEpsilonMatrixBorder = () => {

  let eps: number[][] = [];

  for (let i = 0; i < epsilonMatrixSize2D; i++) {
    eps[i] = [];
    for (let j = 0; j < epsilonMatrixSize2D; j++) {
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

  for (let i = 0; i < epsilonMatrixSize2D; i++) {
    eps[i] = [];
    for (let j = 0; j < epsilonMatrixSize2D; j++) {
      eps[i][j] = rIndexes[0];
    }
  }
  for (let j = 0; j < epsilonMatrixSize2D; j += 3) {
    eps[Math.floor(epsilonMatrixSize2D / 6)][j] = rIndexes[1];
  }
  return eps;
}


const initialState: IEpsilonMatrixState = {
    epsilon1D: [],
    epsilonVectorSize1D,
    rectWidth1D: width / epsilonVectorSize1D,
    rectHeight1D: width / epsilonVectorSize1D,
    epsilon2D: [],
    epsilonMatrixSize2D,
    rectWidth: width / epsilonMatrixSize2D,
    rectHeight: width / epsilonMatrixSize2D,
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
        
            let eps: number[] = [];

            for (let i = 0; i < epsilonMatrixSize2D; i++) {
                if(i < epsilonMatrixSize2D/2) {
                    eps[i] = rIndexes[0]; 
                } else {
                    eps[i] = rIndexes[1]; 
                }
            }
            state.epsilon1D = eps;            

        },
        updateEpsilonMatrix1D: (state, action: PayloadAction<IUpdateEpslonMatrix1D>) => {
            // if(state.epsilon1D[action.payload.i, action.payload.j] !== action.payload.newEpsilonValue) {

            // }
            state.epsilon1D[action.payload.i] = action.payload.newEpsilonValue;
            
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
            
            state.epsilon2D = eps;
        },
        updateEpsilonMatrix2D: (state, action: PayloadAction<IUpdateEpslonMatrix2D>) => {
            state.epsilon2D[action.payload.i][action.payload.j] = action.payload.newEpsilonValue;
        },
    },
})

export const { updateEpsilonMatrix1D, updateEpsilonMatrix2D, setEpsilonMatrix1D, setEpsilonMatrix2D} = epsilonMatrixSlice.actions;


export const selectEpsilonMatrix1D = (state: AppState) => state.epsilonMatrix.epsilon1D;
export const selectEpsilonMatrix2D = (state: AppState) => state.epsilonMatrix.epsilon2D;

export const selectEpsilonMatrixSize2D = (state: AppState) => state.epsilonMatrix.epsilonMatrixSize2D || epsilonMatrixSize2D;
export const selectEpsilonMatrixValues = (state: AppState) => state.epsilonMatrix.rIndexes;
export const selectEpsilonMatrixRectSize = (state: AppState) => state.epsilonMatrix.rectWidth;

export default epsilonMatrixSlice.reducer;