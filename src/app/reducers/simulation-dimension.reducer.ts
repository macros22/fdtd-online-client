import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SimulationDimension } from 'types/types'

import type { AppState } from '../store'


export interface SimulationDimensionState {
    simulationDimension: SimulationDimension,
}


const initialState: SimulationDimensionState = {
    simulationDimension: SimulationDimension.SIMULATION_1D,
}


export const simulationDimensionSlice = createSlice({
    name: 'simulationDimension',
    initialState,
    reducers: {
        setSimDimension: (state, action: PayloadAction<SimulationDimension>) => {
            state.simulationDimension = action.payload
        },
    },
})

export const { setSimDimension } = simulationDimensionSlice.actions


export const selectCurrentSimDimension = (state: AppState) => state.simulationDimension.simulationDimension;


export default simulationDimensionSlice.reducer