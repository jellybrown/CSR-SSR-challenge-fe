import React from 'react';
import useRouter from '../hooks/useRouter';

const About = () => {
  const { push } = useRouter();

  return (
    <div>
      <h1>about</h1>
      <button onClick={() => push('/')}>root</button>
    </div>
  );
};

export default About;
