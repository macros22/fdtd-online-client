import * as React from 'react';
import classes from './textinput.module.scss';



const TextInput: React.FC = () => {
  return (
    <div className={classes.formGroup}>
      <input type="input" className={classes.formField} placeholder="Name" name="name" id='name' required/>
      <label htmlFor="name" className={classes.formLabel}>Name</label>
    </div>
  );
}

export default TextInput;
