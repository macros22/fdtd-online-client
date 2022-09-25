import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimulationDimension } from "libs/types/types";
import type { AppState } from "../store";

export type Material = {
  name: string;
  color: string;
  id: number;

  // Electric permittivity.
  eps: number;

  // Permeability.
  mu: number;

  // Conductivity.
  sigma: number;
};

export const makeMatrixEmpty = (
  countRow: number,
  countCol: number,
  materials: Material[]
) => {
  const materialMatrix: number[][] = [[]];

  for (let i = 0; i < countRow; i++) {
    materialMatrix[i] = [];
    for (let j = 0; j < countCol; j++) {
      materialMatrix[i][j] = materials[0].id;
    }
  }
  return materialMatrix;
};

export const makeMatrixBorder = (
  countRow: number,
  countCol: number,
  materials: Material[]
) => {
  const materialMatrix: number[][] = [];

  for (let i = 0; i < countRow; i++) {
    materialMatrix[i] = [];
    for (let j = 0; j < countCol; j++) {
      if (i > j) {
        materialMatrix[i][j] = materials[0].id;
      } else {
        materialMatrix[i][j] = materials[1].id;
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
  const materialMatrix: number[][] = [];

  for (let i = 0; i < countRow; i++) {
    materialMatrix[i] = [];
    for (let j = 0; j < countCol; j++) {
      materialMatrix[i][j] = materials[0].id;
    }
  }
  const difractionGridPosition = Math.floor(countRow / 8);

  for (let i = 0; i < countRow; i++) {
    materialMatrix[i][difractionGridPosition] = materials[1].id;
  }
  for (let i = 0; i < countRow; i += 3) {
    materialMatrix[i][difractionGridPosition] = materials[0].id;
  }
  return materialMatrix;
};

export const makeWaveGuide = (
  countRow: number,
  countCol: number,
  materials: Material[]
) => {
  const materialMatrix: number[][] = [];

  // Empty material matrix(only with base material).
  for (let i = 0; i < countRow; i++) {
    materialMatrix[i] = [];
    for (let j = 0; j < countCol; j++) {
      materialMatrix[i][j] = materials[0].id;
    }
  }

  // Make wave guide borders
  for (let j = 0; j < countCol; j++) {
    const upBorder = Math.floor(countRow * 0.4);
    const downBorder = Math.floor(countRow * 0.6);
    materialMatrix[upBorder][j] = materials[2].id;
    materialMatrix[downBorder][j] = materials[2].id;
  }

  return materialMatrix;
};

export const makeBarrier = (
  countRow: number,
  countCol: number,
  materials: Material[]
) => {
  const materialMatrix: number[][] = [];

  for (let i = 0; i < countRow; i++) {
    materialMatrix[i] = [];
    for (let j = 0; j < countCol; j++) {
      if (j > countCol * 0.5 && j < countCol * 0.75) {
        materialMatrix[i][j] = materials[1].id;
      } else {
        materialMatrix[i][j] = materials[0].id;
      }
    }
  }
  return materialMatrix;
};

export type SourcePosition = {
  // 0 < x, y < 1.
  relativeX: number;
  relativeY: number;
};

export type ConfigMaterial = {
  name: string;
  materialMatrix: number[][];
  simulationDimension: SimulationDimension;
  sourcePosition: SourcePosition[];
};

export interface IMaterialMatrixState {
  // Material matrix sizes.
  countRow: number;
  countCol: number;

  materials: Material[];

  // Material id matrix.
  materialMatrix: number[][];

  // Set of functions, that fill material matrix.
  configMaterialSet: ConfigMaterial[];

  currentMaterialMatrixConfigInSet: number;
}

const fillMaterialMatrixes2D = (
  countRow: number,
  countCol: number,
  materials: Material[]
): ConfigMaterial[] => {
  return [
    {
      name: "Default(empty)",
      simulationDimension: SimulationDimension.SIMULATION_2D,
      sourcePosition: [{ relativeX: 0.5, relativeY: 0.2 }],
      materialMatrix: makeMatrixEmpty(countRow, countCol, materials),
    },
    {
      name: "Wave guide",
      simulationDimension: SimulationDimension.SIMULATION_2D,
      sourcePosition: [
        { relativeX: 0.5, relativeY: 0.2 },
        { relativeX: 0.3, relativeY: 0.5 },
      ],
      materialMatrix: makeWaveGuide(countRow, countCol, materials),
    },
    {
      name: "Difraction",
      simulationDimension: SimulationDimension.SIMULATION_2D,
      sourcePosition: [{ relativeX: 0.5, relativeY: 0.2 }],
      materialMatrix: makeMatrixDifraction(countRow, countCol, materials),
    },
    {
      name: "Material border",
      simulationDimension: SimulationDimension.SIMULATION_2D,
      sourcePosition: [{ relativeX: 0.5, relativeY: 0.2 }],
      materialMatrix: makeMatrixBorder(countRow, countCol, materials),
    },
  ];
};

const fillMaterialMatrixes1D = (
  countRow: number,
  countCol: number,
  materials: Material[]
): ConfigMaterial[] => {
  return [
    {
      name: "Default(empty)",
      simulationDimension: SimulationDimension.SIMULATION_1D,
      sourcePosition: [{ relativeX: 0.5, relativeY: 0 }],
      materialMatrix: makeMatrixEmpty(1, countCol, materials),
    },
    {
      name: "Barrier",
      simulationDimension: SimulationDimension.SIMULATION_1D,
      sourcePosition: [{ relativeX: 0.1, relativeY: 0.2 }],
      materialMatrix: makeBarrier(countRow, countCol, materials),
    },
  ];
};

const initialMatrixSize = 10;

const materials = [
  {
    name: "Free space",
    id: 0,
    eps: 1,
    mu: 1,
    sigma: 0.0,
    color: "#fafafa",
  },
  {
    name: "Material 2",
    id: 1,
    eps: 2.3,
    mu: 1,
    sigma: 0,
    color: "tomato",
  },
  {
    name: "Argentum",
    id: 2,
    eps: 40.6,
    mu: 1,
    sigma: 0.02,
    color: "#1a52aa",
  },
  {
    name: "Aurum",
    id: 3,
    eps: 10.9,
    mu: 3,
    sigma: 0.01,
    color: "#1b21cc",
  },
];

const configMaterialSet = fillMaterialMatrixes2D(
  initialMatrixSize,
  initialMatrixSize,
  materials
);

const currentMaterialMatrixConfigInSet = 0;
const initialState: IMaterialMatrixState = {
  countRow: initialMatrixSize,
  countCol: initialMatrixSize,
  materials,
  materialMatrix:
    configMaterialSet[currentMaterialMatrixConfigInSet].materialMatrix,
  configMaterialSet,
  currentMaterialMatrixConfigInSet,
};

interface UpdateEpslonMatrix {
  // Row index.
  i: number;
  // Column index.
  j: number;

  newMaterialId: number;
}

interface UpdateMaterialName {
  materialId: number;
  newName: string;
}

interface UpdateMaterialEps {
  materialId: number;
  newEps: number;
}

interface UpdateMaterialMu {
  materialId: number;
  newMu: number;
}

interface UpdateMaterialSigma {
  materialId: number;
  newSigma: number;
}

export const materialMatrixSlice = createSlice({
  name: "materialMatrix",
  initialState,
  reducers: {
    setMaterialMatrixSize: (
      state,
      action: PayloadAction<{
        newCountRow: number;
        newCountCol: number;
      }>
    ) => {
      state.countCol = action.payload.newCountCol;
      state.countRow = action.payload.newCountRow;

      // Check 1D case.
      if (state.countRow == 1) {
        state.configMaterialSet = fillMaterialMatrixes1D(
          action.payload.newCountRow,
          action.payload.newCountCol,
          state.materials
        );
      }
      // Check 2D case.
      else {
        state.configMaterialSet = fillMaterialMatrixes2D(
          action.payload.newCountRow,
          action.payload.newCountCol,
          state.materials
        );
      }
    },

    setCurrentMaterialMatrix: (
      state,
      action: PayloadAction<{
        currentMaterialMatrixConfigInSet: number;
      }>
    ) => {
      state.currentMaterialMatrixConfigInSet =
        action.payload.currentMaterialMatrixConfigInSet;
      state.materialMatrix =
        state.configMaterialSet[
          action.payload.currentMaterialMatrixConfigInSet
        ].materialMatrix;
    },

    updateMaterialMatrix: (
      state,
      action: PayloadAction<UpdateEpslonMatrix>
    ) => {
      if (state.materialMatrix[action.payload.i]) {
        state.materialMatrix[action.payload.i][action.payload.j] =
          action.payload.newMaterialId;
      }
    },

    updateMaterialName: (state, action: PayloadAction<UpdateMaterialName>) => {
      const materialIndex = state.materials.findIndex(
        (material) => material.id === action.payload.materialId
      );
      state.materials[materialIndex].name = action.payload.newName;
    },
    updateMaterialEps: (state, action: PayloadAction<UpdateMaterialEps>) => {
      const materialIndex = state.materials.findIndex(
        (material) => material.id === action.payload.materialId
      );
      console.log("index", materialIndex);
      state.materials[materialIndex].eps = action.payload.newEps;
    },

    updateMaterialMu: (state, action: PayloadAction<UpdateMaterialMu>) => {
      const materialIndex = state.materials.findIndex(
        (material) => material.id === action.payload.materialId
      );
      state.materials[materialIndex].mu = action.payload.newMu;
    },

    updateMaterialSigma: (
      state,
      action: PayloadAction<UpdateMaterialSigma>
    ) => {
      const materialIndex = state.materials.findIndex(
        (material) => material.id === action.payload.materialId
      );
      state.materials[materialIndex].sigma = action.payload.newSigma;
    },
  },
});

export const {
  updateMaterialMatrix,
  updateMaterialName,
  updateMaterialEps,
  updateMaterialMu,
  updateMaterialSigma,
  setCurrentMaterialMatrix,
  setMaterialMatrixSize,
} = materialMatrixSlice.actions;

export const selectMaterialMatrix = (state: AppState) =>
  state.materialMatrix.materialMatrix;

export const selectConfigMaterialSet = (state: AppState) =>
  state.materialMatrix.configMaterialSet;

export const selectMaterialMatrixCountRow = (state: AppState) =>
  state.materialMatrix.countRow;

export const selectCurrentMaterialMatrixConfigInSet = (state: AppState) =>
  state.materialMatrix.currentMaterialMatrixConfigInSet;

export const selectMaterialMatrixCountCol = (state: AppState) =>
  state.materialMatrix.countCol;

export const selectMaterials = (state: AppState) =>
  state.materialMatrix.materials;

export default materialMatrixSlice.reducer;
