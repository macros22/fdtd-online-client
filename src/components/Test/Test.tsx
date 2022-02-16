import React from 'react';
import { withLayout } from 'layout/MainLayout';
import styles from './Test.module.scss';
import { Button } from 'components';

const Test = () => {
  return (
    <>
      <h1 className={styles.title}>Волновая оптика</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <Button>Button</Button>
    </>
  );
};

export default Test;
