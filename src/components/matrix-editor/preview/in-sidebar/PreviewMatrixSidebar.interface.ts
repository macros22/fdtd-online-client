import React, { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IPreviewMatrixSidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  srcPositionRelativeX: number;
  srcPositionRelativeY: number;
}
