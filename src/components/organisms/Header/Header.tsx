import React from 'react';
import cn from 'clsx';
import { Select, Option } from 'components';
import { labTitles } from 'names/navbar.name';
import { LabContentType, LabNames } from 'types/types';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  selectLabContentType,
  selectLabName,
  setLabContentType,
} from 'app/reducers/labTypeSlice';
// import { StyledHamburger } from "./Hamburger.styled";
import styles from './Header.module.scss';
import Link from 'next/link';
export type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};
// import styles from './Hamburger.module.scss';

// props: Props
const Header = () => {
  const WAVE_OPTICS_NAME = 'ВОЛНОВАЯ ОПТИКА';
  const currentLabContentType = useAppSelector(selectLabContentType);
  const currentLabName = useAppSelector(selectLabName);

  const currentLabTitle =
    Object.values(labTitles)[Object.values(LabNames).indexOf(currentLabName)];

  const dispatch = useAppDispatch();
  const [opened, setOpened] = React.useState(false);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerBody}>
            <Link href='/'>
              <a className={styles.logo}>{WAVE_OPTICS_NAME}</a>
            </Link>

            <div
              onClick={() => setOpened((prev) => !prev)}
              className={cn(styles.headerBurger, {
                [styles.active]: opened,
              })}
            >
              <span></span>
            </div>
            <nav
              className={cn(styles.headerMenu, {
                [styles.headerMenuActive]: opened,
              })}
            >
              {/* <ul 
              className={styles.headerList}
              > */}
                <li>
                  <Link href={`/${currentLabName}/${LabContentType.THEORY}`}>
                    <a
                      onClick={() =>
                        dispatch(setLabContentType(LabContentType.THEORY))
                      }
                      className={cn(styles.labContentType, {
                        [styles.activeLabContentType]:
                          currentLabContentType === LabContentType.THEORY,
                      })}
                    >
                      Теория
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentLabName}/${LabContentType.EXPERIMENT}`}
                  >
                    <a
                      onClick={() =>
                        dispatch(setLabContentType(LabContentType.EXPERIMENT))
                      }
                      className={cn(styles.labContentType, {
                        [styles.activeLabContentType]:
                          currentLabContentType == LabContentType.EXPERIMENT,
                      })}
                    >
                      Эксперимент
                    </a>
                  </Link>
                </li>
              {/* </ul> */}
            </nav>
          </div>
        </div>
      </header>
      <header className={styles.headerDown}>
        <div className={styles.container}>
          <div className={styles.headerBodyDown}>
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
        </div>
      </header>
    </>
  );
};

export default Header;
