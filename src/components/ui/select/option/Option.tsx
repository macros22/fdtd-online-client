import React from "react";
import styles from "./Option.module.scss";
import { useRouter } from "next/router";
import { IOptionProps } from "./Option.props";

export const Option = ({ children, value, path }: IOptionProps): JSX.Element => {
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
