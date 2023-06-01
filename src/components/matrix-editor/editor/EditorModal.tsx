// https://codesandbox.io/s/blov5kowy?file=/index.js:0-1633
import * as React from "react";
import styles from "./EditorModal.module.scss";
import { IEditorModalProps } from "./EditorModal.props";
import {
  ButtonGroup,
  Divider,
  Modal,
  NumberInput,
  WithLabel,
} from "components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { SimulationDimension } from "libs/types/types";
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
  updateMaterialMatrixWithLine,
  updateMaterialMu,
  updateMaterialSigma,
} from "store/slices/material-matrix.slice";
import { selectCurrentSimulationDimension } from "store/slices/app-config.slice";
import { colors, gridSizes1D, gridSizes2D } from "../constants";
import { EditorCanvas } from "../editor-canvas/EditorCanvas";
import { PreviewMatrix } from "../preview/in-editor/PreviewMatrixEditor";
import { Line } from "libs/types/lab2";

export const EditorModal = ({
  setIsModalOpen,
  srcPositionRelativeX,
  srcPositionRelativeY,
}: IEditorModalProps): JSX.Element => {
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

  const [lines, setLines] = React.useState<Line[]>([
    {
      x1: 5,
      y1: 5,
      x2: 50,
      y2: 50,
    },
  ]);

  // Handlers.
  const resetMatrix = (currentSimulationDimension: SimulationDimension) => {
    dispatch(setCurrentMaterialMatrix({ currentMaterialMatrixConfigInSet: 0 }));
  };
  // onChangeLineCoords
  const onChangeLineCoords =
    (lineIndex: number, lineCoord: "x1" | "x2" | "y1" | "y2") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLines((prevLines) => {
        const newLines = [...prevLines];
        newLines[lineIndex][lineCoord] = Number(event.target.value);
        return newLines;
      });
    };
  const onClickSaveLine = (lineIndex: number) => () => {
    const { x1, x2, y1, y2 } = lines[lineIndex];
    dispatch(
      updateMaterialMatrixWithLine({
        x1,
        y1,
        x2,
        y2,
        newMaterialId: materials[currentMaterial].id,
        width: 3,
      })
    );
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
    <Modal onClose={() => setIsModalOpen(false)}>
      <div className={styles.nonScrollableContent}>
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
            <EditorCanvas
              width={500}
              height={500}
              currentMaterial={currentMaterial}
              srcPositionRelativeX={srcPositionRelativeX}
              srcPositionRelativeY={srcPositionRelativeY}
            />

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
            {currentSimulationDimension === SimulationDimension.SIMULATION_2D &&
              lines.map(({ x1, x2, y1, y2 }, index) => (
                <div key={x1 + x2}>
                  <span>line 1</span>
                  <div>
                    <span>x1:</span>{" "}
                    <input
                      value={x1}
                      onChange={onChangeLineCoords(index, "x1")}
                    />
                    <span>y1:</span>{" "}
                    <input
                      value={y1}
                      onChange={onChangeLineCoords(index, "y1")}
                    />
                  </div>
                  <div>
                    <span>x2:</span>{" "}
                    <input
                      value={x2}
                      onChange={onChangeLineCoords(index, "x2")}
                    />
                    <span>y2:</span>{" "}
                    <input
                      value={y2}
                      onChange={onChangeLineCoords(index, "y2")}
                    />
                  </div>
                  <button onClick={onClickSaveLine(index)}>save</button>
                </div>
              ))}
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
                            border: `${
                              index == currentMaterial ? "8" : "0"
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
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
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
  );
};
