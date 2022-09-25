import { IDividerProps } from "./Divider.props";
import styles from "./Divider.module.scss";
import cn from "clsx";

export const Divider = ({ className, ...props }: IDividerProps): JSX.Element => {
  return (
    <hr className={cn(styles.divider, className)} {...props} />
  );
};

