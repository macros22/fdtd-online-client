import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IColorBarProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> {
  gradientWidth: number;
  gradientHeight: number;
  maxVal?: number;
  minVal?: number;
};
