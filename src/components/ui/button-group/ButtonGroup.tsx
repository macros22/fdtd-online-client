import styles from "./ButtonGroup.module.scss";
import { IButtonGroupProps } from "./ButtonGroup.props";
import cn from "clsx";
import React from "react";

export const ButtonGroup = ({
  children,
  className,
  activeButton,
  ...props
}: IButtonGroupProps): JSX.Element => {
  const wrapChildren = () => {
    return React.Children.map(children, (child, index) =>
      //@ts-ignore
      React.cloneElement(child, {
        //@ts-ignore
        className: `${child.props.className} ${index === activeButton ? styles.active : ""
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
