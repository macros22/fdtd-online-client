import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ISidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}
