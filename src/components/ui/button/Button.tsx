import styles from "./Button.module.scss";
import { IButtonProps } from "./Button.props";
import cn from "clsx";

export const Button = ({
  variant = "primary",
  children,
  className,
  ...props
}: IButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: variant == "primary",
        [styles.ghost]: variant == "ghost",
        [styles.outline]: variant == "outline",
      })}
      disabled={variant == "ghost"}
      {...props}
    >
      {children}
    </button>
  );
};

