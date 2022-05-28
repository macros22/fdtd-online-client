import * as React from 'react';
import WithLabel from '../WithLabel/WithLabel';
import styles from './NumberInput.module.scss';
import { NumberInputProps } from './NumberInput.props';

// How to style arrows.
// https://snipp.ru/html-css/input-type-number
// https://codepen.io/komarovdesign/pen/PPRbgb

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  label,
  onChange,
  readOnly = false,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const plusBtnHandler = () => {
    if (inputRef.current) {
      inputRef.current.stepUp();
    }
  };

  const minusBtnHandler = () => {
    if (inputRef.current) {
      inputRef.current.stepDown();
    }
  };

  return (
    <WithLabel labelText={label} >
    <div className={styles.wrapper}>
  
      <input

        ref={inputRef}
        type='number'
        onChange={onChange}
        placeholder={label}
        value={value}
        name='name'
        min='0'
        max='100'
        readOnly={readOnly}
        required
      />
      <div className={styles.btns}>
        <button onClick={plusBtnHandler} className={styles.btn + ' ' + styles.btnPlus}>+</button>
        <button onClick={minusBtnHandler} className={styles.btn + ' ' + styles.btnMinus}>-</button>
      </div>
    </div>
    </ WithLabel>
  );
};

export default NumberInput;
