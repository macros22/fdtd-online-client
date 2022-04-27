// https://codesandbox.io/s/blov5kowy?file=/index.js:0-1633

import * as React from 'react';
import styles from './MatrixEditor.module.scss';
import { MatrixEditorProps } from './MatrixEditor.props';
import { Button, NumberInput } from 'components';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { SimulationDimension } from 'types/types';

// import DragAndDrop from './DragAndDrop';

import EditorCanvas from './EditorCanvas';
import {
  ConfigMedium,
  selectConfigMediumSet,
  selectMediumMatrixCountCol,
  selectMediumMatrixCountRow,
  selectMediums,
  setCurrentMediumMatrix,
} from 'app/reducers/medium-matrix.reducer';
import PreviewMatrix from './PreviewMatrixEditor';
import { selectCurrentSimDimension } from 'app/reducers/simulation-dimension.reducer';

const colors = ['#eddede', 'tomato', '#1a52aa'];

const MatrixEditor: React.FC<MatrixEditorProps> = ({ setIsOpened }) => {
  const dispatch = useAppDispatch();
  const currentSimulationDimension = useAppSelector(selectCurrentSimDimension);

  const mediums = useAppSelector(selectMediums);

  const countRow = useAppSelector(selectMediumMatrixCountRow);
  const countCol = useAppSelector(selectMediumMatrixCountCol);

  // Handlers.
  const resetMatrix = (currentSimulationDimension: SimulationDimension) => {
    dispatch(setCurrentMediumMatrix({ currentMediumMatrixConfigInSet: 0 }))
  };

  const previewMediumConfigHandler = (mediumMatrixConfigInSet: number) => {
    dispatch(setCurrentMediumMatrix({ currentMediumMatrixConfigInSet: mediumMatrixConfigInSet }))
    console.log("DAPKUNAITE", mediumMatrixConfigInSet)
  }

  const [currentMedium, setCurrentMedium] = React.useState(1);

  const configMediumSet: ConfigMedium[] = useAppSelector(selectConfigMediumSet);

  return (
    <>
      <div className={styles.substrate}></div>

      <div className={styles.modalWrapper}>
        <div className={styles.matrixPicker}>
          <h2>Matrix picker</h2>

          <div className={styles.matrixPreview}>
          {/* <div > */}
            {configMediumSet.map((medium, index) => (
              
              <div onClick={() => previewMediumConfigHandler(index)}>
              {/* { index > 0 && */}
              <>
                <h4>{medium.name}</h4>
                <PreviewMatrix
                  key={index + medium.simulationDimension}
                  width={100}
                  height={100}
                  simulationDimension={medium.simulationDimension}
                  mediumMatrix={medium.mediumMatrix}
                  
                />
                </>
              {/* // } */}
              </ div>
            
            ))}
          </div>
        </div>
        <div className={styles.editor}>
          <h2>Editor</h2>
          {/* Editor start */}
          <hr />
          <EditorCanvas
            width={400}
            height={400}
            currentMedium={currentMedium}
          />
          {/* Editor end */}

          <div className={styles.buttons}>
            <Button onClick={() => resetMatrix(currentSimulationDimension)}>Reset</Button>
            <Button onClick={() => setIsOpened(false)}>Back</Button>
          </div>
        </div>
        <div className={styles.materialPicker}>
          <h2>Material picker</h2>

          <hr />

          {mediums.map((material, index) => {
            return (
              <div className={styles.oneMaterialPanel} key={index}>
                <div className={styles.material}>
                  <svg
                    onClick={() => setCurrentMedium(index)}
                    width={'65px'}
                    height={'65px'}
                    style={{
                      background: colors[index],
                      border: `${
                        index == currentMedium ? '5' : '0'
                      }px solid black`,
                    }}
                  />
                  <h3>{material.name}</h3>
                </div>
                <hr />
                <div className={styles.materialNumberInputs}>
                  <NumberInput
                    value={material.eps}
                    label={'permittivity'}
                    // onChange={(e) => setLambda(+e.target.value)}
                  />
                  <NumberInput
                    value={material.mu}
                    label={'permiability'}
                    // onChange={(e) => setLambda(+e.target.value)}
                  />
                  <NumberInput
                    value={material.sigma}
                    label={'condictivity'}
                    // onChange={(e) => setLambda(+e.target.value)}
                  />
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        {/* <DragAndDrop WIDTH={400} HEIGHT={400} /> */}
      </div>
    </>
  );
};

export default MatrixEditor;
