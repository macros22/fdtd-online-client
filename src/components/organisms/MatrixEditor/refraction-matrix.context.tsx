import React from 'react';
import { LabNames } from 'types/types';

let defaultMatrix: number[][] = [];
const rIndexes = [1, 1.5, 2];

const n = 50;

const width = 400;
// const height = 400;

const rectHeight: number = width / n;
const rectWidth = rectHeight;

const setInitialMatrix = (currentLabName: LabNames) => {
  switch (currentLabName) {
    case LabNames.DIFRACTION:
      for (let i = 0; i < n; i++) {
        defaultMatrix[i] = [];
        for (let j = 0; j < n; j++) {
          defaultMatrix[i][j] = rIndexes[0];
        }
      }
      for (let j = 0; j < n; j += 2) {
        defaultMatrix[Math.floor(n / 6)][j] = rIndexes[1];
      }
      break;
    case LabNames.BORDER:
      for (let i = 0; i < n; i++) {
        defaultMatrix[i] = [];
        for (let j = 0; j < n; j++) {
          if (i < j) {
            defaultMatrix[i][j] = rIndexes[0];
          } else {
            defaultMatrix[i][j] = rIndexes[1];
          }
        }
      }

      break;
    default:
      for (let i = 0; i < n; i++) {
        defaultMatrix[i] = [];
        for (let j = 0; j < n; j++) {
          defaultMatrix[i][j] = rIndexes[0];
        }
      }
  }
};

interface IReturnObject {
  rectWidth: number;
  rectHeight: number;
  rIndexes: number[];
  n: number;
}

const returnObj: IReturnObject = {
  rectWidth,
  rectHeight,
  rIndexes,
  n,
};

export interface IContext {
  matrix: number[][];
  setMatrix: React.Dispatch<React.SetStateAction<number[][]>>;
  resetMatrix: () => void;
  returnObj: IReturnObject;
}

const RefractionMatrixContext = React.createContext<IContext | null>(null);

type RefractionMatrixProviderProps = { currentLabName: LabNames };

export const RefractionMatrixProvider: React.FC<
  RefractionMatrixProviderProps
> = ({ children, currentLabName }) => {
  // setInitialMatrix(LabNames.LAB_3D);
  setInitialMatrix(currentLabName);
  const [matrix, setMatrix] = React.useState(defaultMatrix);

  const resetMatrix = () => {
    setInitialMatrix(LabNames.LAB_3D);
    setMatrix(defaultMatrix);
  };

  // const value = React.useMemo(() => [matrix, setMatrix], [matrix]);

  return (
    <RefractionMatrixContext.Provider
      value={{ matrix, setMatrix, resetMatrix, returnObj }}
    >
      {children}
    </RefractionMatrixContext.Provider>
  );
};

// currentLabName: LabNames
export const useRefractionMatrix = () => {
  const context = React.useContext(RefractionMatrixContext);
  if (!context) {
    throw new Error(`useCount must be used within a RefractionMatrixProvider`);
  }
  return context;
};
