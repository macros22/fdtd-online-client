import { useAppDispatch, useAppSelector } from "store/hooks";
import styles from "./MatrixEditor.module.scss";
import {
  selectMaterialMatrix,
  setCurrentMaterialMatrix,
  setMaterialMatrixSize,
} from "store/reducers/material-matrix.reducer";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import MatrixEditor from "./MatrixEditor";
import PreviewMatrix from "./PreviewMatrixEditor";
import { selectCurrentSimulationDimension } from "store/reducers/app-config.reducer";
import { SimulationDimension } from "types/types";
import { Button } from "components";

export interface PreviewMatrixSidebarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  srcPositionRelativeX: number;
  srcPositionRelativeY: number;
}

const PreviewMatrixSidebar: React.FC<PreviewMatrixSidebarProps> = ({
  srcPositionRelativeX,
  srcPositionRelativeY,
}) => {
  const dispatch = useAppDispatch();

  const currentSimulationDimension = useAppSelector(
    selectCurrentSimulationDimension
  );

  const materialMatrix = useAppSelector(selectMaterialMatrix);

  React.useEffect(() => {
    if (currentSimulationDimension == SimulationDimension.SIMULATION_1D) {
      dispatch(setMaterialMatrixSize({ newCountRow: 1, newCountCol: 50 }));
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
        srcPositionRelativeX={srcPositionRelativeX}
        srcPositionRelativeY={srcPositionRelativeY}
      />
      <Button
        className={styles.triggerMatrixBtn}
        onClick={() => setIsOpend(true)}
      >
        Edit material
      </Button>

      {isOpened && (
        <MatrixEditor
          setIsOpened={setIsOpend}
          srcPositionRelativeX={srcPositionRelativeX}
          srcPositionRelativeY={srcPositionRelativeY}
        />
      )}
    </>
  );
};

export default PreviewMatrixSidebar;
