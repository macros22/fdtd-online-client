import styles from './ButtonGroup.module.scss';
import { ButtonGroupProps } from './ButtonGroup.props';
// import ArrowIcon from './arrow.svg';
import cn from 'clsx';
import React from 'react';

const ButtonGroup = ({
  children,
  className,
  activeButton,
  ...props
}: ButtonGroupProps): JSX.Element => {
  const wrapChildren = () => {
    return React.Children.map(children, (child, index) =>
      //@ts-ignore
      React.cloneElement(child, {
        //@ts-ignore
        className: `${child.props.className} ${
          index === activeButton ? styles.active : ''
        }`,
      })
    );
  };

  return (
    <div className={cn(styles.buttonGroup, className)} {...props}>
      {wrapChildren()}
    </div>
  );
};

export default ButtonGroup;
