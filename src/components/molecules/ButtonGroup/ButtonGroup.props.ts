import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ButtonGroupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
    color?: 'ghost' | 'outline' | 'primary';
    activeButton: number;
}