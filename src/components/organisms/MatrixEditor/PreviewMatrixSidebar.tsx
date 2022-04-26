import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectLabName } from 'app/reducers/labTypeSlice';
import styles from './MatrixEditor.module.scss';
import {
  selectMediumMatrix,
  selectMediumMatrixCountCol,
  selectMediumMatrixCountRow,
  selectMediums,
  setCurrentMediumMatrix,
  setMediumMatrix,
  updateMediumMatrix,
} from 'app/reducers/medium-matrix.reducer';
import { drawType } from 'components/molecules/Canvas/useCanvas';
import React from 'react';
import { Button } from 'react-bootstrap';
import { LabNames } from 'types/types';
import MatrixEditor from './MatrixEditor';
import PreviewMatrix from './PreviewMatrixEditor';

type PreviewMatrixSidebarProps = {
  width: number;
  height: number;
};

const PreviewMatrixSidebar: React.FC<PreviewMatrixSidebarProps> = ({
  width,
  height,
}) => {

  const dispatch = useAppDispatch();


  const currentLabName = useAppSelector(selectLabName);



  const mediumMatrix = useAppSelector(selectMediumMatrix);



 
 
  React.useEffect(() => {
    if (currentLabName == LabNames.LAB_2D) {
      dispatch(setMediumMatrix({newCountRow: 1, newCountCol: 25 }));
    } else {
      dispatch(setMediumMatrix({newCountRow: 25, newCountCol: 25 }));
    }
    dispatch(setCurrentMediumMatrix({ currentLabName }));
  }, [currentLabName]);

  const [isOpened, setIsOpend] = React.useState<boolean>(false);




  return (
    <>
      <PreviewMatrix width={width} height={height} labName={currentLabName} mediumMatrix={mediumMatrix}/>
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

