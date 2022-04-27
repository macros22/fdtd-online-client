import React from 'react';

import { withLayout } from 'layout/MainLayout';
import { LabContentType, SimulationDimension } from 'types/types';

import { useAppDispatch } from 'app/hooks';

import Simulation from 'components/templates/Simulation/Simulation';
import { setSimDimension } from 'app/reducers/simulation-dimension.reducer';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

export interface ISimulationPageProps extends Record<string, unknown> {
  currentSimulationDimension: SimulationDimension;
}

const SimulationPage: React.FC<ISimulationPageProps> = ({
  currentSimulationDimension,
}) => {
  const dispatch = useAppDispatch();
  dispatch(setSimDimension(currentSimulationDimension));
  return (
    <>
      <Simulation currentSimulationDimension={currentSimulationDimension} />
    </>
  );
};

export default withLayout(SimulationPage);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: {
    params: {
      dimension: SimulationDimension;
    };
  }[] = [];

  (Object.values(SimulationDimension) as Array<SimulationDimension>).map((dimension) => {
    paths.push({
      params: {
        dimension
      },
    });
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ISimulationPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (typeof params?.dimension === 'string') {
    const currentSimulationDimension: SimulationDimension | null =
      Object.values(SimulationDimension).find(
        (l) => l == params.dimension?.toString().toUpperCase()
      ) || null;

    if (currentSimulationDimension) {
      return {
        props: {
          currentSimulationDimension,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};
