import { DrawType } from "components/plot-line/PlotLine.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ICanvasProps extends DetailedHTMLProps<HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
    draw: DrawType;
    width: number;
    height: number;
}