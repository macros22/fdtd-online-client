import { InputHTMLAttributes } from "react";

export interface NumberInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  value: number | string;
  label: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}
