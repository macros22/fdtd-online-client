import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps extends
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: ReactNode;
	width?: 'content' | 'maxWidth'
	appearance?: 'primary' | 'ghost' | 'outline';
	arrow?: 'right' | 'down' | 'none';
}