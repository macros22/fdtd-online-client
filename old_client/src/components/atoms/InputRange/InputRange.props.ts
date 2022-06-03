import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface InputRangeProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    setValue: React.Dispatch<React.SetStateAction<number>>
    value: number;
}