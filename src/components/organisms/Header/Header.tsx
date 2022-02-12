import React from 'react';
import Link from 'next/link';

import cn from 'clsx';

const WAVE_OPTICS_NAME = 'ВОЛНОВАЯ ОПТИКА';

import styles from './Header.module.scss';

import {
  selectLabContentType,
  selectLabName,
  setLabContentType,
} from 'app/reducers/labTypeSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { LabContentType, LabNames } from 'types/types';
import { Select, Option } from 'components';
import { labTitles } from 'names/navbar.name';

export default function Header(): JSX.Element {
  const currentLabContentType = useAppSelector(selectLabContentType);
  const currentLabName = useAppSelector(selectLabName);

  const currentLabTitle =
    Object.values(labTitles)[Object.values(LabNames).indexOf(currentLabName)];

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
      </nav>

      <div className={styles.headerDown}>
        <Select placeholder={currentLabTitle}>
          {Object.values(LabNames).map((labName, index) => {
            return (
              <Option key={labName} value={labName}>
                {Object.values(labTitles)[index]}
              </Option>
            );
          })}
        </Select>
      </div>
    </>
  );
}
