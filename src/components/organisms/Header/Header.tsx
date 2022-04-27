import React from 'react';
import cn from 'clsx';
import { Select, Option } from 'components';
import { simulationTitles} from 'names/navbar.name';
import { SimulationDimension } from 'types/types';
import { useAppSelector, useAppDispatch } from 'app/hooks';

// import { StyledHamburger } from "./Hamburger.styled";
import styles from './Header.module.scss';
import Link from 'next/link';
import { selectCurrentSimDimension } from 'app/reducers/simulation-dimension.reducer';
export type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};
// import styles from './Hamburger.module.scss';

// props: Props
const Header = () => {
  const WAVE_OPTICS_NAME = 'WAVE OPTICS';
  // const currentLabContentType = useAppSelector(selectLabContentType);
  const currentSimDimension = useAppSelector(selectCurrentSimDimension);

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
                {/* <li>
                  <Link href={`/${currentsimDimension}/${LabContentType.THEORY}`}>
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
                </li> */}
                <li>
                  <Link
                    href={`/simulation/${currentSimDimension}`}
                  >
                    <a
                      // onClick={() =>
                      //   dispatch(setLabContentType(LabContentType.EXPERIMENT))
                      // }
                      // className={cn(styles.labContentType, {
                      //   [styles.activeLabContentType]:
                      //     currentLabContentType == LabContentType.EXPERIMENT,
                      // })}
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
