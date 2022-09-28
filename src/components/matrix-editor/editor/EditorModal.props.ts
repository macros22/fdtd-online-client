import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IEditorModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  srcPositionRelativeX: number;
  srcPositionRelativeY: number;
}
