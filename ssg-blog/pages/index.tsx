import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/posts');
  }, [router]);

  return <div></div>;
};

export default Home;
