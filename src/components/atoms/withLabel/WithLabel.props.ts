import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface WithLabelProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  labelText: string;
}
