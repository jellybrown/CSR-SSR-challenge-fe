import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import fetcher from 'pages/api/fecher';
import Image from 'next/image';

const PostDetail = () => {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.slug && `/api/posts/${query.slug}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <article>
        <h1>{data.frontMatter.title}</h1>
      </article>
      <div dangerouslySetInnerHTML={{ __html: data.html || '' }}></div>
    </div>
  );
};

export default PostDetail;
