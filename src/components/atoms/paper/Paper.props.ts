import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface PaperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
