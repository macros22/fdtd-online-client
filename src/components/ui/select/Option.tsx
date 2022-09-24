import React, { ReactNode } from "react";
import styles from "./Option.module.scss";

import { useRouter } from "next/router";

const Option: React.FC<{
  children: ReactNode | ReactNode[];
  value: string;
  path: string;
}> = ({ children, value, path }) => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(`${path}/${value}`);
  };

  return (
    <li className={styles.selectOption} onClick={clickHandler}>
      {children}
    </li>
  );
};

export default Option;
