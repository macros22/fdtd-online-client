import cn from "clsx";
import styles from "./Tag.module.scss";
import { ITagProps } from "./Tag.props";

export const Tag = ({
  size = "sm",
  children,
  color = "ghost",
  href,
  fullWidth = false,
  className,
  ...props
}: ITagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.sm]: size == "sm",
        [styles.md]: size == "md",
        [styles.lg]: size == "lg",
        [styles.ghost]: color == "ghost",
        [styles.success]: color == "success",
        [styles.primary]: color == "primary",
        [styles.fullWidth]: fullWidth == true,
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
