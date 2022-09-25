import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IWithLabelProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  labelText: string;
}
