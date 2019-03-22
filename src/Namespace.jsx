// @flow
import React, { useContext, type Node } from 'react';
import NamespaceContext from './NamespaceContext';

type Props = {
  path?: string,
  compose?: boolean,
  children: Node,
};

function computePath(path, compose, namespace) {
  if (!compose) {
    return path;
  }

  return namespace && compose
    ? `${namespace}.${path}`
    : path;
}

export default function Namespace(props: Props) {
  const { path, compose, children } = props;
  const namespace = useContext(NamespaceContext);
  const currentPath = computePath(path, compose, namespace);

  return (
    <NamespaceContext.Provider value={currentPath}>
      {children}
    </NamespaceContext.Provider>
  );
}

Namespace.defaultProps = {
  path: undefined,
  compose: false,
};
