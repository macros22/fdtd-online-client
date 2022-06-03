import { InputRangeProps } from './InputRange.props';
import styles from './InputRange.module.scss';
import React from 'react';
// import cn from 'classnames';
// import { ForwardedRef, forwardRef } from 'react';

 const InputRange = ({
  className,
  value,
  setValue,
  ...props
}: InputRangeProps): JSX.Element => {


  return (
    <div className={styles.slideContainer}>
      {/* <p>Custom range slider: {value}</p> */}
      <input
        type='range'
        min='0.00'
        max='1.00'
        step={'0.01'}
        value={value}
        onChange={(event) => setValue(+event.target.value || 0)}
        className={styles.slider}
        id='myRange'
        {...props}
      />
    </div>
  );
};

export default InputRange;