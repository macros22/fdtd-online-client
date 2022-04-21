import styles from './WithLabel.module.scss';
import { WithLabelProps } from './WithLabel.props';
import React from 'react';
import cn from 'clsx';

const WithLabel = React.forwardRef(
  ({
    children,
    className,
    labelText,
    ref,
    ...props
  }: WithLabelProps): JSX.Element => {
    return (
      <div ref={ref} className={cn(styles.wrapper, className)} {...props}>
        <label htmlFor='name' className={styles.label}>
          {labelText}
        </label>
        <span id='name'>{children}</span>
      </div>
    );
  }
);

export default WithLabel;
