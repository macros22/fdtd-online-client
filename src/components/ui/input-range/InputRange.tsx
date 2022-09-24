import { InputRangeProps } from "./InputRange.props";
import styles from "./InputRange.module.scss";
import React from "react";
import cn from "clsx";

const InputRange = ({
  className,
  value,
  setValue,
  ...props
}: InputRangeProps): JSX.Element => {
  return (
    <div className={cn(styles.sliderContainer, className)}>
      <input
        type="range"
        min="0.00"
        max="1.00"
        step={"0.01"}
        value={value}
        onChange={(event) => setValue(Number(event.target.value) || 0)}
        className={styles.slider}
        id="customRange"
        {...props}
      />
    </div>
  );
};

export default InputRange;
