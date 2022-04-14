import * as React from 'react';
import styles from './MatrixEditor.module.scss';
import { MatrixEditorProps } from './MatrixEditor.props';
import { Button } from 'components';
import MatrixEditorNew from './MatrixEditorNew';

const PreviewMatrixEditor: React.FC = () => {
    const [isOpened, setIsOpend] = React.useState<boolean>(false);
  
    return (
      <>
        {/* <!-- Button trigger modal -->*/}
        <svg className={styles.matrixPreview} />
        <Button onClick={() => setIsOpend(true)}>Edit material</Button>
  
        {isOpened && ( 
            <MatrixEditorNew setIsOpend={setIsOpend}/>
        )}
      </>
    );
  };
  
  export default PreviewMatrixEditor;