import { useAppDispatch, useAppSelector } from 'store/hooks';
import styles from './MatrixEditor.module.scss';
import {
  selectMaterialMatrix,
  setCurrentMaterialMatrix,
  setMaterialMatrixSize,
} from 'store/reducers/material-matrix.reducer';
import React from 'react';
import MatrixEditor from './MatrixEditor';
import PreviewMatrix from './PreviewMatrixEditor';
import { selectCurrentSimulationDimension } from 'store/reducers/app-config.reducer';
import { SimulationDimension } from 'types/types';
import { Button } from 'components';

type PreviewMatrixSidebarProps = {};

const PreviewMatrixSidebar: React.FC<PreviewMatrixSidebarProps> = () => {
  const dispatch = useAppDispatch();

  const currentSimulationDimension = useAppSelector(
    selectCurrentSimulationDimension
  );

  const materialMatrix = useAppSelector(selectMaterialMatrix);

  React.useEffect(() => {
    if (currentSimulationDimension == SimulationDimension.SIMULATION_1D) {
      dispatch(setMaterialMatrixSize({ newCountRow: 1, newCountCol: 40 }));
    } else {
      dispatch(setMaterialMatrixSize({ newCountRow: 55, newCountCol: 55 }));
    }
    dispatch(setCurrentMaterialMatrix({ currentMaterialMatrixConfigInSet: 0 }));
  }, [currentSimulationDimension]);

  const [isOpened, setIsOpend] = React.useState<boolean>(false);

  return (
    <>
      <PreviewMatrix
        simulationDimension={currentSimulationDimension}
        materialMatrix={materialMatrix}
      />
      <Button
        className={styles.triggerMatrixBtn}
        onClick={() => setIsOpend(true)}
      >
        Edit material
      </Button>

      {isOpened && <MatrixEditor setIsOpened={setIsOpend} />}
    </>
  );
};

export default PreviewMatrixSidebar;
