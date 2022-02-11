import React, { PropsWithChildren } from 'react';

let defaultMatrix: number[][] = [];
const rIndexes = [1, 1.5, 2];

const n = 40;

const width = 400;
// const height = 400;

const rectHeight: number = width / n;
const rectWidth = rectHeight;

function initiAlFillMatrix() {
  for (let i = 0; i < n; i++) {
    defaultMatrix[i] = [];
    for (let j = 0; j < n; j++) {
      defaultMatrix[i][j] = rIndexes[0];
    }
  }
}

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

// function RefractionMatrixProvider({ children }: IContext & { children: ReactNode }) {
function RefractionMatrixProvider({ children }: PropsWithChildren<{}>) {
  initiAlFillMatrix();
  const [matrix, setMatrix] = React.useState(defaultMatrix);

  const resetMatrix = () => {
    initiAlFillMatrix();
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
}

// function RefractionMatrixProvider(props: any) {
//   const [matrix, setMatrix] = React.useState(defaultMatrix);

//   // const value = React.useMemo(() => [matrix, setMatrix], [matrix]);

//   return <RefractionMatrixContext.Provider value={{ matrix, setMatrix, returnObj }} {...props} />;
// }

//function useRefractionMatrix(currentLabName: LabNames) {
function useRefractionMatrix() {
  const context = React.useContext(RefractionMatrixContext);
  if (!context) {
    throw new Error(`useCount must be used within a RefractionMatrixProvider`);
  }
  return context;
}

export { RefractionMatrixProvider, useRefractionMatrix };
