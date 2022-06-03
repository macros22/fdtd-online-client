// https://github.com/mlaursen/react-md/blob/main/packages/divider/src/Divider.tsx

import { DividerProps } from "./Divider.props";
import styles from "./Divider.module.scss";
import cn from "clsx";

const Divider = ({ className }: DividerProps): JSX.Element => {
  return (
    <>
      <hr className={cn(styles.divider, className)} />
    </>
  );
};

export default Divider;
