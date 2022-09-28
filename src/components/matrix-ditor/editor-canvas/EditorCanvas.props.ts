import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IEditorCanvasProps extends DetailedHTMLProps<HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
  width: number;
  height: number;
  currentMaterial: number;
  srcPositionRelativeX: number;
  srcPositionRelativeY: number;
};