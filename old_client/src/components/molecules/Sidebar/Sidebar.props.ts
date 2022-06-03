import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
}