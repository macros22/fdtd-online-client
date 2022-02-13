import React, { ReactNode } from 'react';
import { useSelectContext } from './selectContext';
import styles from './Option.module.scss';
import { selectLabContentType, selectLabName } from 'app/reducers/labTypeSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import { useRouter } from 'next/router';

const Option: React.FC<{
  children: ReactNode | ReactNode[];
  value: string;
}> = ({ children, value }) => {
  const currentLabContentType = useAppSelector(selectLabContentType);

  const router = useRouter();

  const clickHandler = () => {
    router.push(`/${value}/${currentLabContentType}`);
  };

  return (
    <li className={styles.selectOption} onClick={clickHandler}>
      {children}
    </li>
  );
};

export default Option;
