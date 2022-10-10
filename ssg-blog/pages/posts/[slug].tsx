import React from 'react';
import fs from 'fs';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getParsedFileContentBySlug,
  MarkdonwRenderingResult,
  markdownToHtml,
} from 'lib';

interface PostProps extends ParsedUrlQuery {
  slug: string;
}

const POSTS_PATH = join(process.cwd(), '__posts');

const PostDetail = ({ frontMatter, html }: MarkdonwRenderingResult) => {
  return (
    <div>
      <article>
        <h1>{frontMatter.title}</h1>
      </article>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<MarkdonwRenderingResult> = async ({
  params,
}: {
  params: PostProps;
}) => {
  const markdonwContent = getParsedFileContentBySlug(params.slug, POSTS_PATH);
  const renderedHTML = await markdownToHtml(markdonwContent.content);

  return {
    props: {
      frontMatter: markdonwContent.frontMatter,
      html: renderedHTML,
    },
  };
};

export const getStaticPaths: GetStaticPaths<PostProps> = async () => {
  const paths = fs
    .readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.md$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostDetail;
