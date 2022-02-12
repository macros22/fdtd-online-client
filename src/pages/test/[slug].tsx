//@ts-ignore
import { serialize } from 'next-mdx-remote/serialize';
//@ts-ignore
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import { withLayout } from 'layout/MainLayout';

import markdown from 'remark-parse';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// import SyntaxHighlighter from 'react-syntax-highlighter';

// import { Nav, Button } from '../../components';

const Nav = () => {
  return <p>asdas</p>;
};

const components = { Nav };

//@ts-ignore
const PostPage = ({ frontMatter: { title, date }, mdxSource }) => {
  return (
    <div className='mt-4'>
      <h1>{title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
};
//@ts-ignore
export default withLayout(PostPage);

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('src/theory-posts'));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps: GetStaticProps<IPageProps> = async ({
  //@ts-ignore
  params: { slug },
}) => {
  console.log(path.join('src/theory-posts'));

  const markdownWithMeta = fs.readFileSync(
    path.join('src/theory-posts', slug + '.mdx'),
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
      frontMatter,
      slug,
      mdxSource,
    },
  };
};

export interface IPageProps extends Record<string, unknown> {
  frontMatter: any;
  slug: any;
  mdxSource: any;
}

export { getStaticProps, getStaticPaths };
