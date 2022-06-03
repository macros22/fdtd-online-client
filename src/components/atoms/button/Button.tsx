import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.props";
// import ArrowIcon from './arrow.svg';
import cn from "clsx";

const Button = ({
  appearance = "primary",
  arrow = "none",
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance == "primary",
        [styles.ghost]: appearance == "ghost",
        [styles.outline]: appearance == "outline",
      })}
      disabled={appearance == "ghost"}
      {...props}
    >
      {children}
      {arrow != "none" && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow == "down",
          })}
        >
          {/* <ArrowIcon /> */}
        </span>
      )}
    </button>
  );
};

export default Button;
