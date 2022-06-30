import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.props";
import cn from "clsx";

const Button = ({
  appearance = "primary",
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
    </button>
  );
};

export default Button;
