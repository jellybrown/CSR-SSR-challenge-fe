import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from 'pages/api/fecher';

type Post = {
  title: string;
  content: string;
};

const Post = () => {
  const { data, error } = useSWR('/api/posts', fetcher);

  const router = useRouter();
  const handleClick = (title: string) => {
    router.push(`posts/${title}`);
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      {data?.titles.map((title: string) => (
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

export default Post;
