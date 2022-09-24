import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface TheoryProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
