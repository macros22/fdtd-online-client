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
      <label htmlFor='name' className={classes.label}>
        {label}
      </label>
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
    </div>
  );
};

export default TextInput;
