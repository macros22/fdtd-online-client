import { DividerProps } from "./Divider.props";
import styles from "./Divider.module.scss";
import cn from "clsx";

const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
  return (
    <>
      <hr className={cn(styles.divider, className)} {...props} />
    </>
  );
};

export default Divider;
