import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LabContentType, LabNames } from 'types/types'

import type { AppState } from '../store'


export interface LabTypeState {
    labName: LabNames,
    labContentType: LabContentType
}


const initialState: LabTypeState = {
    labName: LabNames.LAB_3D,
    labContentType: LabContentType.EXPERIMENT,
}


export const labTypeSlice = createSlice({
    name: 'labType',
    initialState,
    reducers: {
        setLabName: (state, action: PayloadAction<LabNames>) => {
            state.labName = action.payload
        },
        setLabContentType: (state, action: PayloadAction<LabContentType>) => {
            state.labContentType = action.payload
        },
    },
})

export const { setLabName, setLabContentType } = labTypeSlice.actions


export const selectLabName = (state: AppState) => state.labType.labName;
export const selectLabContentType = (state: AppState) => state.labType.labContentType;

export default labTypeSlice.reducer