import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import styles from "../../editor/EditorModal.module.scss";
import {
  selectMaterialMatrix,
  setCurrentMaterialMatrix,
  setMaterialMatrixSize,
} from "store/slices/material-matrix.slice";
import { selectCurrentSimulationDimension } from "store/slices/app-config.slice";
import { SimulationDimension } from "libs/types/types";
import { Button, EditorModal } from "components";
import { IPreviewMatrixSidebarProps } from "./PreviewMatrixSidebar.interface";
import { PreviewMatrix } from "../in-editor/PreviewMatrixEditor";

export const PreviewMatrixSidebar = ({
  isModalOpen,
  setIsModalOpen,
  srcPositionRelativeX,
  srcPositionRelativeY,
}: IPreviewMatrixSidebarProps): JSX.Element => {
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
        Edit materials
      </Button>

      {isModalOpen && (
        <EditorModal
          setIsModalOpen={setIsModalOpen}
          srcPositionRelativeX={srcPositionRelativeX}
          srcPositionRelativeY={srcPositionRelativeY}
        />
      )}
    </>
  );
};
