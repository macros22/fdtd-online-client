import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface PProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  color?: "ghost" | "success" | "primary";
  href?: string;
  fullWidth?: boolean;
}
