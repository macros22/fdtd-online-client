import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps extends
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: ReactNode;
	appearance?: 'primary' | 'ghost' | 'outline';
	arrow?: 'right' | 'down' | 'none';
	className?: string;
}