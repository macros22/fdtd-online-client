import React from 'react';
import Link from 'next/link';

import cn from 'classnames';

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

export default function Header(): JSX.Element {
  const currentLabName =
    'Моделирование явления интерференции электромагнитных волн';

  enum LabContentKind {
    MODEL = 'MODEL',
    THEORY = 'THEORY',
  }

  const [currentLabContent, setCurrentLabContent] =
    React.useState<LabContentKind>(LabContentKind.MODEL);

  return (
    <>
      <nav className={styles.headerUp}>
        <Link href='/'>
          <a className={styles.logo}>{WAVE_OPTICS_NAME}</a>
        </Link>

        <div className={styles.labContentType}>
          <Link href='#'>
            <a
              onClick={() => setCurrentLabContent(LabContentKind.THEORY)}
              className={cn({
                [styles.activeLabContentType]:
                  currentLabContent == LabContentKind.THEORY,
              })}
            >
              Теория
            </a>
          </Link>
          <div className={styles.verticalLine}></div>
          <Link href='#'>
            <a
              onClick={() => setCurrentLabContent(LabContentKind.MODEL)}
              className={cn(styles.labContentType, {
                [styles.activeLabContentType]:
                  currentLabContent == LabContentKind.MODEL,
              })}
            >
              Модель
            </a>
          </Link>
        </div>

        <Dropdown />
      </nav>

      <div className={styles.headerDown}>
        <h2>{currentLabName}</h2>
      </div>
    </>
  );
}
