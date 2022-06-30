import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MatrixEditorProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setIsOpened: (value: React.SetStateAction<boolean>) => void;
  srcPositionRelativeX: number;
  srcPositionRelativeY: number;
}
