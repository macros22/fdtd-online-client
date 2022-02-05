import * as React from 'react';
import classes from './TextInput.module.scss';
import { TextInputProps } from './TextInput.props';

const TextInput: React.FC<TextInputProps> = ({
  value,
  label,
  onChange,
  readOnly = false,
}) => {
  return (
    <div className={classes.formGroup}>
      <input
        type='input'
        onChange={onChange}
        className={classes.formField}
        placeholder={label}
        value={value}
        name='name'
        id='name'
        readOnly={readOnly}
        required
      />
      <label htmlFor='name' className={classes.formLabel}>
        {label}
      </label>
    </div>
  );
};

export default TextInput;
