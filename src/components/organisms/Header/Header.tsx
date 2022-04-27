import React from 'react';
import cn from 'clsx';
import { Select, Option } from 'components';
import { simulationTitles} from 'names/navbar.name';
import { ContentType, SimulationDimension } from 'types/types';
import { useAppSelector, useAppDispatch } from 'app/hooks';

// import { StyledHamburger } from "./Hamburger.styled";
import styles from './Header.module.scss';
import Link from 'next/link';
import { selectCurrentContentType, selectCurrentSimulationDimension, setContentType } from 'app/reducers/app-config.reducer';
export type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};
// import styles from './Hamburger.module.scss';

// props: Props
const Header = () => {
  const WAVE_OPTICS_NAME = 'WAVE OPTICS';
  const currentContentType = useAppSelector(selectCurrentContentType);
  const currentSimDimension = useAppSelector(selectCurrentSimulationDimension);

  const currentSimDimensionTitle =
    Object.values(simulationTitles)[Object.values(SimulationDimension).indexOf(currentSimDimension)];

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
              // className={styles.headerList}
              >  */}
                <li>
                  <Link href={`/theory/`}>
                    <a
                      onClick={() =>
                        dispatch(setContentType(ContentType.THEORY))
                      }
                      className={cn(styles.labContentType, {
                        [styles.activeLabContentType]:
                          currentContentType === ContentType.THEORY,
                      })}
                    >
                      Theory
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/simulation/${currentSimDimension}`}
                  >
                    <a
                      onClick={() =>
                        dispatch(setContentType(ContentType.SIMULATION))
                      }
                      className={cn(styles.labContentType, {
                        [styles.activeLabContentType]:
                        currentContentType === ContentType.SIMULATION,
                      })}
                    >
                      Simulation
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
            <Select placeholder={currentSimDimensionTitle}>
              {Object.values(SimulationDimension).map((simDimension, index) => {
                return (
                  <Option key={simDimension} value={simDimension}>
                    {Object.values(simulationTitles)[index]}
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
