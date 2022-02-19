import * as React from 'react';
import WithLabel from '../WithLabel/WithLabel';
import styles from './NumberInput.module.scss';
import { NumberInputProps } from './NumberInput.props';

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  label,
  onChange,
  readOnly = false,
}) => {
  return (
    <WithLabel labelText={label}>
      <input
        type='number'
        onChange={onChange}
        className={styles.formField}
        placeholder={label}
        value={value}
        name='name'
        min='0'
        max='100'
        readOnly={readOnly}
        required
      />
    </WithLabel>
  );
};

export default NumberInput;
