import React from 'react';

const useRouter = () => {
  const [nextPath, setNextPath] = React.useState<string | null>(null);

  const push = (nextPath: string) => {
    const currPath = window.location.pathname;
    history.pushState({ path: currPath }, '', nextPath);
    setNextPath(nextPath);
  };

  return { nextPath, push };
};

export default useRouter;
