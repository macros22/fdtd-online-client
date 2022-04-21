import * as React from 'react';
import styles from './MatrixEditor.module.scss';
import { MatrixEditorProps } from './MatrixEditor.props';
import { Button, Tag } from 'components';
import MatrixEditorNew from './MatrixEditorNew';
import { RefObject } from 'react';

type PreviewMatrixProps = {
  width: number;
  height: number;
};

const PreviewMatrixEditor: React.FC<PreviewMatrixProps> = ({
  width,
  height,
}) => {
  const [isOpened, setIsOpend] = React.useState<boolean>(false);

  console.log('~~Q~~', width);

  return (
    <>
      {/* <!-- Button trigger modal -->*/}
      <svg
        className={styles.matrixPreview}
        style={{
          width: width + 'px',
          height: width + 'px',
        }}
      />
      <Button
        className={styles.triggerMatrixBtn}
        onClick={() => setIsOpend(true)}
      >
        Edit material
      </Button>

      {isOpened && <MatrixEditorNew setIsOpend={setIsOpend} />}
    </>
  );
};

export default PreviewMatrixEditor;
