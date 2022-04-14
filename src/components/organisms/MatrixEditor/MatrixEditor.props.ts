import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MatrixEditorProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setIsOpend: (value: React.SetStateAction<boolean>) => void;
}