import { SimulationDimension } from "libs/types/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface IPreviewMatrixProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    simulationDimension: SimulationDimension;
    materialMatrix: number[][];
    srcPositionRelativeX: number;
    srcPositionRelativeY: number;
}