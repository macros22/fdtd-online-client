import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IPaperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
