import React from "react";
import { ContentType, SimulationDimension } from "libs/types/types";
import { useAppDispatch } from "store/hooks";
import { setSimulationDimension } from "store/slices/app-config.slice";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { MainLayout } from "components/layouts/main-layout/MainLayout";
import { Simulation } from "components/page-components/simulation/Simulation";

export interface ISimulationPageProps extends Record<string, unknown> {
  currentSimulationDimension: SimulationDimension;
}

const SimulationPage: React.FC<ISimulationPageProps> = ({
  currentSimulationDimension,
}) => {
  const dispatch = useAppDispatch();
  dispatch(setSimulationDimension(currentSimulationDimension));

  return (
    <MainLayout>
      <Simulation currentSimulationDimension={currentSimulationDimension} />
    </MainLayout>
  );
};

export default SimulationPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: {
    params: {
      dimension: SimulationDimension;
    };
  }[] = [];

  (Object.values(SimulationDimension) as Array<SimulationDimension>).map(
    (dimension) => {
      paths.push({
        params: {
          dimension,
        },
      });
    }
  );

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ISimulationPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (typeof params?.dimension === "string") {
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
