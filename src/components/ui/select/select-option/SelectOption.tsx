import React from "react";
import styles from "./SelectOption.module.scss";
import { useRouter } from "next/router";
import { ISelectOptionProps } from "./SelectOption.props";

export const Option = ({ children, value, path }: ISelectOptionProps): JSX.Element => {
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
