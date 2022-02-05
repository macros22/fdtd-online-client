import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface PProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	size?: 's' | 'm' | 'l';
	children: ReactNode;
	color?: 'ghost' | 'success' | 'primary';
	href?: string;
}