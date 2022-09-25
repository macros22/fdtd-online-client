import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ISelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    children: ReactNode | ReactNode[];
    defaultValue?: string;
    placeholder?: string;
}
