import React from 'react';

type Props = {
  path: string;
  component: JSX.Element;
};

const Route = ({ component }: Props) => {
  return component;
};

export default Route;
