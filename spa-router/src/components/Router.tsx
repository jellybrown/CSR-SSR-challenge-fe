import React from 'react';
import useRouter from '../hooks/useRouter';

type Props = {
  children: JSX.Element[];
};

const Router = ({ children }: Props) => {
  const { nextPath } = useRouter();
  const [elment, setElement] = React.useState<JSX.Element | null>(null);

  if (!children) {
    throw new Error('Router에 Route를 설정했는지 확인해주세요.');
  }

  const check = () => {
    if (!location) return;

    const el = children.find(
      (child) =>
        child.props.path === nextPath ||
        child.props.path === window.location.pathname
    );

    if (!el) {
      throw new Error('해당하는 페이지가 없습니다.');
    }

    setElement(el);
  };

  React.useEffect(() => {
    check();
  }, [window.location.pathname]);

  return <div>{elment}</div>;
};

export default Router;
