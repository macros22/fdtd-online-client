import React from 'react';
import { Theory } from 'components';

import { withLayout } from 'layout/MainLayout';
import { ContentType} from 'types/types';

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { useAppDispatch } from 'app/hooks';


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



const TheoryPage: React.FC<ITheoryPageProps> = ({
  
  // frontMatter: { title, date },
  mdxSource,
}) => {
  const dispatch = useAppDispatch();

//   dispatch(setLabContentType(currentLabContentType));


  return (<Theory>
  <MDXRemote {...mdxSource} />
  </Theory>);
  
};

export default withLayout(TheoryPage);



const postNames = [
  'one-dimension',
  'two-dimension',
  'interference',
  'difraction',
  'border',
]

export const getStaticPaths: GetStaticPaths = async () => {

  
  const paths: {
    params: {
      post: string;
    };
  }[] = [];

  (postNames).map((postName) => {
    paths.push({
      params: {
        post: postName
      },
    });
  });

  console.log(paths);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ITheoryPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (
    typeof params?.post === 'string' 
  ) {
    const currentPostName: string | null =
      postNames.find(
        (l) => l == params.post
      ) || null;


    if (currentPostName ) {
      
        const files = fs.readdirSync(path.join('src/components/templates/theory-posts'));

        const markdownWithMeta = fs.readFileSync(
          path.join('src/components/templates/theory-posts', currentPostName + '.mdx'),
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
            currentPostName,
            frontMatter,
            mdxSource,
          },
        };
      

    }
  }

  return {
    notFound: true,
  };
};

export interface ITheoryPageProps extends Record<string, unknown> {
  currentPostName: string;
  frontMatter?: any;
  mdxSource?: any;
}
