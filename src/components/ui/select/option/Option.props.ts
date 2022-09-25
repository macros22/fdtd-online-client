import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IOptionProps extends DetailedHTMLProps<HTMLAttributes<HTMLOptionElement>, HTMLOptionElement> {
    children: ReactNode | ReactNode[];
    value: string;
    path: string;
}
