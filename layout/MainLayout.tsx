import * as React from 'react';
import Head from 'next/head';
import Header from './Header/Header';
import styles from './MainLayout.module.scss';
import { MainLayoutProps } from './MainLayout.props';
import { RefractionMatrixProvider } from 'store/refraction-matrix.context';

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <Head>
        <title>{title || 'Wave optics'}</title>
        <meta name='description' content={`Wave optics.` + description} />
        <meta name='robots' content='index, follow' />
        <meta name='keywords' content={keywords || 'physics, wave, optics'} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div className={styles.container}>
        <Header />

        <main>{children}</main>
      </div>
    </>
  );
};

export type MetaPropsType = Omit<MainLayoutProps, 'children'>;

export const withLayout = <T extends Record<string, unknown>>(
  Component: React.FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    const metaProps: MetaPropsType = {
      title: `Wave optics | Lab ${
        (props?.currentLabName as string)?.toLowerCase() || ''
      }`,
      description: (props?.currentLabName as string)?.toLowerCase() || '',
    };

    return (
      <RefractionMatrixProvider>
        <MainLayout {...metaProps}>
          <Component {...props} />
        </MainLayout>
      </RefractionMatrixProvider>
    );
  };
};
