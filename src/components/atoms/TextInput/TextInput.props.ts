export type TextInputProps = {
    value: number | string;
    label: string;
    onChange?: (e: any) => void;
    readOnly?: boolean;
};