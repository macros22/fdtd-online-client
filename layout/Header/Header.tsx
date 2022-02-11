import React from 'react';
import Link from 'next/link';

import cn from 'clsx';

const WAVE_OPTICS_NAME = 'ВОЛНОВАЯ ОПТИКА';

import {
  LAB_1_NAME,
  LAB_2_NAME,
  LAB_3_NAME,
  LAB_4_NAME,
  LAB_5_NAME,
} from 'names/navbar.name';

const sections = [
  { title: LAB_1_NAME, url: '/lab1' },
  { title: LAB_2_NAME, url: '/lab2' },
  { title: LAB_3_NAME, url: '/lab3' },
  { title: LAB_4_NAME, url: '/lab4' },
  { title: LAB_5_NAME, url: '/lab5' },
];

import styles from './Header.module.scss';
import Dropdown from 'components/molecules/Dropdown';
import {
  selectLabContentType,
  selectLabName,
  setLabContentType,
} from 'app/reducers/labTypeSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { LabContentType } from 'types/types';

export default function Header(): JSX.Element {
  const currentLabTitle =
    'Моделирование явления интерференции электромагнитных волн';

  const currentLabContentType = useAppSelector(selectLabContentType);
  const currentLabName = useAppSelector(selectLabName);

  const dispatch = useAppDispatch();

  return (
    <>
      <nav className={styles.headerUp}>
        <Link href='/'>
          <a className={styles.logo}>{WAVE_OPTICS_NAME}</a>
        </Link>

        <div className={styles.labContentType}>
          <Link href={`/${currentLabName}/${LabContentType.THEORY}`}>
            <a
              onClick={() => dispatch(setLabContentType(LabContentType.THEORY))}
              className={cn({
                [styles.activeLabContentType]:
                  currentLabContentType === LabContentType.THEORY,
              })}
            >
              Теория
            </a>
          </Link>
          <div className={styles.verticalLine}></div>
          <Link href={`/${currentLabName}/${LabContentType.EXPERIMENT}`}>
            <a
              onClick={() =>
                dispatch(setLabContentType(LabContentType.EXPERIMENT))
              }
              className={cn(styles.labContentType, {
                [styles.activeLabContentType]:
                  currentLabContentType == LabContentType.EXPERIMENT,
              })}
            >
              Модель
            </a>
          </Link>
        </div>

        <Dropdown />
      </nav>

      <div className={styles.headerDown}>
        <h2>{currentLabTitle}</h2>
      </div>
    </>
  );
}
