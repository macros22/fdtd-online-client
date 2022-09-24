import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentType, SimulationDimension } from "libs/types/types";

import type { AppState } from "../store";

export interface AppConfigState {
  simulationDimension: SimulationDimension;
  contentType: ContentType;
}

const initialState: AppConfigState = {
  simulationDimension: SimulationDimension.SIMULATION_1D,
  contentType: ContentType.SIMULATION,
};

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    setSimulationDimension: (
      state,
      action: PayloadAction<SimulationDimension>
    ) => {
      state.simulationDimension = action.payload;
    },
    setContentType: (state, action: PayloadAction<ContentType>) => {
      state.contentType = action.payload;
    },
  },
});

export const { setSimulationDimension, setContentType } =
  appConfigSlice.actions;

export const selectCurrentSimulationDimension = (state: AppState) =>
  state.appConfig.simulationDimension;
export const selectCurrentContentType = (state: AppState) =>
  state.appConfig.contentType;

export default appConfigSlice.reducer;
