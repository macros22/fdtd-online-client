import { useAppDispatch, useAppSelector } from "store/hooks";
import styles from "../../editor/MatrixEditor.module.scss";
import {
  selectMaterialMatrix,
  setCurrentMaterialMatrix,
  setMaterialMatrixSize,
} from "store/reducers/material-matrix.reducer";
import React from "react";
import MatrixEditor from "../../editor/MatrixEditor";
import PreviewMatrix from "../in-editor/PreviewMatrixEditor";
import { selectCurrentSimulationDimension } from "store/reducers/app-config.reducer";
import { SimulationDimension } from "libs/types/types";
import { Button } from "components";
import { IPreviewMatrixSidebarProps } from "./PreviewMatrixSidebar.interface";


export const PreviewMatrixSidebar: React.FC<IPreviewMatrixSidebarProps> = ({
  isModalOpen,
  setIsModalOpen,
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
        onClick={() => setIsModalOpen(true)}
      >
        Edit material
      </Button>

      {isModalOpen && (
        <MatrixEditor
          setIsModalOpen={setIsModalOpen}
          srcPositionRelativeX={srcPositionRelativeX}
          srcPositionRelativeY={srcPositionRelativeY}
        />
      )}
    </>
  );
};
