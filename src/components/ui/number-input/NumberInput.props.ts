import { InputHTMLAttributes } from "react";

export interface INumberInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  value: number | string;
  label: string;
  readOnly?: boolean;
}
