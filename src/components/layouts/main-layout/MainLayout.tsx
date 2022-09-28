import * as React from "react";
import Head from "next/head";
import styles from "./MainLayout.module.scss";
import { IMainLayoutProps } from "./MainLayout.props";
import { Header } from "../header/Header";

export const MainLayout = ({
  children,
  title,
  description,
  keywords,
}: IMainLayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title || "FDTD"}</title>
        <meta name="description" content={`FDTD.` + description} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || "physics, wave, optics, finite difference time domain"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.wrapper}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
};