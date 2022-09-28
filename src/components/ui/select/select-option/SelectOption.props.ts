import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ISelectOptionProps extends DetailedHTMLProps<HTMLAttributes<HTMLOptionElement>, HTMLOptionElement> {
    children: ReactNode | ReactNode[];
    value: string;
    path: string;
}
