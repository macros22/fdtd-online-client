import React from 'react';
import { Experiment } from 'components';

import { withLayout } from 'layout/MainLayout';
import { LabContentType, LabNames } from 'types/types';

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { useAppDispatch } from 'app/hooks';
import { setLabContentType, setLabName } from 'app/reducers/labTypeSlice';
import { data2D } from 'theory-posts/2D';

const LabPage: React.FC<ILabPageProps> = ({
  currentLabName,
  currentLabContentType,
}) => {
  const dispatch = useAppDispatch();
  dispatch(setLabName(currentLabName));
  dispatch(setLabContentType(currentLabContentType));

  switch (currentLabContentType) {
    case LabContentType.THEORY:
      return <>theory</>;
    case LabContentType.EXPERIMENT:
      return (
        <>
          <Experiment
            currentLabName={currentLabName}
            currentLabContentType={currentLabContentType}
          />
        </>
      );
  }

  return <>Loading...</>;
};

export default withLayout(LabPage);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: {
    params: {
      lab: LabNames;
      contentType: LabContentType;
    };
  }[] = [];

  (Object.values(LabNames) as Array<LabNames>).map((labName) => {
    paths.push({
      params: {
        lab: labName,
        contentType: LabContentType.EXPERIMENT,
      },
    });
    paths.push({
      params: {
        lab: labName,
        contentType: LabContentType.THEORY,
      },
    });
  });

  console.log(paths);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ILabPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (
    typeof params?.lab === 'string' &&
    typeof params?.contentType === 'string'
  ) {
    const currentLabName: LabNames | null =
      Object.values(LabNames).find(
        (l) => l == params.lab?.toString().toUpperCase()
      ) || null;

    const currentLabContentType: LabContentType | null =
      Object.values(LabContentType).find(
        (l) => l == params.contentType?.toString().toUpperCase()
      ) || null;

    if (currentLabName && currentLabContentType) {
      if (currentLabContentType == LabContentType.THEORY) {
        const data = data2D;

        const mdxSource = await serialize(data, {
          mdxOptions: {
            remarkPlugins: [markdown, remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        });

        return {
          props: {
            mdxSource,
          },
        };
      }

      return {
        props: {
          currentLabName,
          currentLabContentType,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};

export interface ILabPageProps extends Record<string, unknown> {
  currentLabName: LabNames;
  currentLabContentType: LabContentType;
}
