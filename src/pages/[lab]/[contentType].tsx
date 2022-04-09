import React from 'react';
import { Lab2D, Theory } from 'components';

import { withLayout } from 'layout/MainLayout';
import { LabContentType, LabNames } from 'types/types';

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { useAppDispatch } from 'app/hooks';
import { setLabContentType, setLabName } from 'app/reducers/labTypeSlice';

//@ts-ignore
import { serialize } from 'next-mdx-remote/serialize';
//@ts-ignore
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdown from 'remark-parse';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Lab3D } from 'components';

const LabPage: React.FC<ILabPageProps> = ({
  currentLabName,
  currentLabContentType,
  // frontMatter: { title, date },
  mdxSource,
}) => {
  const dispatch = useAppDispatch();
  dispatch(setLabName(currentLabName));
  dispatch(setLabContentType(currentLabContentType));

  switch (currentLabContentType) {
    case LabContentType.THEORY:
      return (
        <Theory>
          <MDXRemote {...mdxSource} />
        </Theory>
      );
    case LabContentType.EXPERIMENT:
      switch (currentLabName) {
        case LabNames.LAB_2D:
          return (
            <>
              <Lab2D />
            </>
          );
        default:
          return (
            <>
              <Lab3D currentLabName={currentLabName}/>
            </>
          );
      }
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

  // console.log(paths);

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
        const files = fs.readdirSync(path.join('src/components/templates/theory-posts'));

        const markdownWithMeta = fs.readFileSync(
          path.join('src/components/templates/theory-posts', currentLabName + '.mdx'),
          'utf-8'
        );

        const { data: frontMatter, content } = matter(markdownWithMeta);
        const mdxSource = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [markdown, remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        });

        return {
          props: {
            currentLabName,
            currentLabContentType,
            frontMatter,
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
  frontMatter?: any;
  mdxSource?: any;
}
