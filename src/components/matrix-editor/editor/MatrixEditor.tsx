// https://codesandbox.io/s/blov5kowy?file=/index.js:0-1633

import * as React from "react";
import styles from "./MatrixEditor.module.scss";
import { MatrixEditorProps } from "./MatrixEditor.props";
import { Button, ButtonGroup, NumberInput, WithLabel } from "components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { SimulationDimension } from "libs/types/types";

import EditorCanvas from "../EditorCanvas";
import {
  ConfigMaterial,
  selectConfigMaterialSet,
  selectCurrentMaterialMatrixConfigInSet,
  selectMaterialMatrixCountCol,
  selectMaterialMatrixCountRow,
  selectMaterials,
  setCurrentMaterialMatrix,
  setMaterialMatrixSize,
  updateMaterialEps,
  updateMaterialMu,
  updateMaterialSigma,
} from "store/reducers/material-matrix.reducer";
import PreviewMatrix from "../preview/in-editor/PreviewMatrixEditor";
import { selectCurrentSimulationDimension } from "store/reducers/app-config.reducer";
import { colors } from "../colors";
import Modal from "../../ui/modal/Modal";
import Divider from "components/ui/divider/Divider";

const gridSizes1D = [5, 50, 100, 200];
const gridSizes2D = [11, 55, 110, 220];

const MatrixEditor: React.FC<MatrixEditorProps> = ({
  setIsModalOpen,
  srcPositionRelativeX,
  srcPositionRelativeY,
}) => {
  const [currentMatrixSizeIndex, setCurrentMatrixSizeIndex] = React.useState(1);

  const dispatch = useAppDispatch();
  const currentSimulationDimension = useAppSelector(
    selectCurrentSimulationDimension
  );

  const materials = useAppSelector(selectMaterials);

  const currentMaterialMatrixConfigInSet = useAppSelector(
    selectCurrentMaterialMatrixConfigInSet
  );

  const countRow = useAppSelector(selectMaterialMatrixCountRow);
  const countCol = useAppSelector(selectMaterialMatrixCountCol);

  // Handlers.
  const resetMatrix = (currentSimulationDimension: SimulationDimension) => {
    dispatch(setCurrentMaterialMatrix({ currentMaterialMatrixConfigInSet: 0 }));
  };

  const previewMaterialConfigHandler = (materialMatrixConfigInSet: number) => {
    dispatch(
      setCurrentMaterialMatrix({
        currentMaterialMatrixConfigInSet: materialMatrixConfigInSet,
      })
    );
  };

  const [currentMaterial, setCurrentMaterial] = React.useState(1);

  const configMaterialSet: ConfigMaterial[] = useAppSelector(
    selectConfigMaterialSet
  );

  return (
    <>
      <Modal onClose={() => setIsModalOpen(false)}>
        <div className={styles.nonScrollableContent}>
          {/* <p>This short title <b>IS NOT</b> scrollable</p> */}
          <h2 className={styles.matrixPickerTitle}>Matrix picker</h2>
          <h2 className={styles.editorTitle}>Editor</h2>
          <h2 className={styles.materialPickerTitle}>Material picker</h2>
        </div>
        <div className={styles.scrollableContent}>
          <div className={styles.modalContent}>
            <div className={styles.matrixPicker}>
              <div className={styles.scrollPanel}>
                {configMaterialSet.map((material, index) => (
                  <>
                    <div
                      onClick={() => previewMaterialConfigHandler(index)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <h4>{material.name}</h4>
                      <div style={{ width: 280 }}>
                        <PreviewMatrix
                          key={index + material.simulationDimension}
                          simulationDimension={material.simulationDimension}
                          materialMatrix={material.materialMatrix}
                          srcPositionRelativeX={srcPositionRelativeX}
                          srcPositionRelativeY={srcPositionRelativeY}
                        />
                      </div>
                    </div>
                    <Divider className={styles.divider} />
                  </>
                ))}
              </div>
            </div>
            <div className={styles.editor}>
              {/* Editor start */}

              <EditorCanvas
                width={400}
                height={400}
                currentMaterial={currentMaterial}
                srcPositionRelativeX={srcPositionRelativeX}
                srcPositionRelativeY={srcPositionRelativeY}
              />
              {/* Editor end */}

              <div className={styles.buttons}>
                <WithLabel labelText="Choose matrix size:">
                  <ButtonGroup activeButton={currentMatrixSizeIndex}>
                    {currentSimulationDimension ===
                      SimulationDimension.SIMULATION_1D
                      ? gridSizes1D.map((size, index) => {
                        return (
                          <button
                            key={size}
                            onClick={() => {
                              setCurrentMatrixSizeIndex(index);
                              dispatch(
                                setMaterialMatrixSize({
                                  newCountRow: 1,
                                  newCountCol: size,
                                })
                              );
                              dispatch(
                                setCurrentMaterialMatrix({
                                  currentMaterialMatrixConfigInSet,
                                })
                              );
                            }}
                          >
                            {size}
                          </button>
                        );
                      })
                      : gridSizes2D.map((size, index) => {
                        return (
                          <button
                            key={size}
                            onClick={() => {
                              setCurrentMatrixSizeIndex(index);
                              dispatch(
                                setMaterialMatrixSize({
                                  newCountRow: size,
                                  newCountCol: size,
                                })
                              );
                              dispatch(
                                setCurrentMaterialMatrix({
                                  currentMaterialMatrixConfigInSet,
                                })
                              );
                            }}
                          >
                            {size}
                          </button>
                        );
                      })}
                  </ButtonGroup>
                </WithLabel>
              </div>
            </div>

            <div className={styles.materialPicker}>
              <div className={styles.scrollPanel}>
                {materials.map((material, index) => {
                  return (
                    <>
                      <div className={styles.oneMaterialPanel} key={index}>
                        <div className={styles.material}>
                          <svg
                            onClick={() => setCurrentMaterial(index)}
                            width={"65px"}
                            height={"65px"}
                            style={{
                              background: colors[index],
                              border: `${index == currentMaterial ? "8" : "0"
                                }px solid rgba(0,0,0,0.35)`,
                            }}
                          />
                          <h3>{material.name}</h3>
                        </div>

                        <div className={styles.materialNumberInputs}>
                          <NumberInput
                            value={material.eps}
                            label={"permittivity"}
                            onChange={(e) =>
                              dispatch(
                                updateMaterialEps({
                                  materialId: material.id,
                                  newEps: Number(e.target.value),
                                })
                              )
                            }
                          />
                          <NumberInput
                            value={material.mu}
                            label={"permiability"}
                            onChange={(e) =>
                              dispatch(
                                updateMaterialMu({
                                  materialId: material.id,
                                  newMu: Number(e.target.value),
                                })
                              )
                            }
                          />
                          <NumberInput
                            value={material.sigma}
                            label={"conductivity"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              dispatch(
                                updateMaterialSigma({
                                  materialId: material.id,
                                  newSigma: Number(e.target.value),
                                })
                              );
                            }}
                          />
                        </div>

                      </div>
                      <Divider className={styles.divider} />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MatrixEditor;
