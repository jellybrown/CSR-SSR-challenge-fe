import React from 'react';
import fs from 'fs';
import { join } from 'path';
import { GetStaticProps } from 'next';
import { MarkdonwRenderingResult } from 'lib';
import { useRouter } from 'next/router';

const Post = ({ postTitles }: { postTitles: string[] }) => {
  const router = useRouter();
  const handleClick = (title: string) => {
    router.push(`posts/${title}`);
  };

  return (
    <div>
      {postTitles.map((title) => (
        <a
          style={{ cursor: 'pointer' }}
          key={title}
          onClick={() => handleClick(title)}
        >
          <h1>{title}</h1>
        </a>
      ))}
    </div>
  );
};

const POSTS_PATH = join(process.cwd(), '__posts');

export const getStaticProps: GetStaticProps<{
  postTitles: string[];
}> = async () => {
  const titles = fs
    .readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.md$/, ''));

  return {
    props: {
      postTitles: titles,
    },
  };
};

export default Post;
