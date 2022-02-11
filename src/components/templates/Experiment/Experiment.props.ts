import { LabContentType, LabNames } from 'types/types';

export interface IExperimentProps extends Record<string, unknown> {
    currentLabName: LabNames;
    currentLabContentType: LabContentType;
}
