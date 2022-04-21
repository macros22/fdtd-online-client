import { DetailedHTMLProps, HTMLAttributes, MutableRefObject, ReactNode, RefObject } from 'react';

export interface WithLabelProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
    labelText: string;
    ref?: MutableRefObject<HTMLDivElement>;
}