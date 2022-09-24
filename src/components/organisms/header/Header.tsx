import React from "react";
import cn from "clsx";
import { Select, Option } from "components";
import { simulationTitles } from "names/navbar.name";
import { ContentType, SimulationDimension } from "types/types";
import { useAppSelector, useAppDispatch } from "store/hooks";

import styles from "./Header.module.scss";
import Link from "next/link";
import {
  selectCurrentContentType,
  selectCurrentSimulationDimension,
  setContentType,
} from "store/reducers/app-config.reducer";
export type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const postNames = [
  "one-dimension",
  "two-dimension",
  "interference",
  "difraction",
  "border",
];

// props: Props
const Header = () => {
  const LOGO_TEXT = "FDTD";
  const currentContentType = useAppSelector(selectCurrentContentType);
  const currentSimDimension = useAppSelector(selectCurrentSimulationDimension);

  const currentSimDimensionTitle =
    Object.values(simulationTitles)[
      Object.values(SimulationDimension).indexOf(currentSimDimension)
    ];

  const dispatch = useAppDispatch();
  const [opened, setOpened] = React.useState(false);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerBody}>
            <Link href="/">
              <a className={styles.logo}>{LOGO_TEXT}</a>
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
                <Link href={`/theory/`}>
                  <a
                    onClick={() => dispatch(setContentType(ContentType.THEORY))}
                    className={cn(styles.labContentType, {
                      [styles.activeLabContentType]:
                        currentContentType === ContentType.THEORY,
                    })}
                  >
                    Theory
                  </a>
                </Link>
              </li> */}
              <li>
                <Link href={`/simulation/${currentSimDimension}`}>
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
            {currentContentType === ContentType.SIMULATION ? (
              <Select placeholder={currentSimDimensionTitle}>
                {Object.values(SimulationDimension).map(
                  (simDimension, index) => {
                    return (
                      <Option
                        key={simDimension}
                        path={"/simulation"}
                        value={simDimension}
                      >
                        {Object.values(simulationTitles)[index]}
                      </Option>
                    );
                  }
                )}
              </Select>
            ) : (
              <Select placeholder={"asdas"}>
                {postNames.map((postName, index) => {
                  return (
                    <Option path={"/theory"} key={postName} value={postName}>
                      {postNames[index]}
                    </Option>
                  );
                })}
              </Select>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
