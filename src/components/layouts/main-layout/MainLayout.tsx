import * as React from "react";
import Head from "next/head";
import styles from "./MainLayout.module.scss";
import { MainLayoutProps } from "./MainLayout.props";
import { Header } from "../header/Header";

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <Head>
        <title>{title || "Wave optics"}</title>
        <meta name="description" content={`Wave optics.` + description} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || "physics, wave, optics"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.wrapper}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
};