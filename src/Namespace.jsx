// @flow
import React, { forwardRef, createContext, Component, type Node } from 'react';

export const NamespaceContext = createContext();

type Props = {
  path?: string,
  compose?: boolean,
  children: Node,
  namespace?: Node,
};

class Namespace extends Component<Props> {
  getPath() {
    const { path, compose, namespace } = this.props;
    if (!compose || !path) {
      return path;
    }

    if (namespace) {
      const parentPath = namespace.getPath();
      if (parentPath) {
        return `${parentPath}.${path}`;
      }
    }

    return path;
  }

  render() {
    const { children } = this.props;

    return (
      <NamespaceContext.Provider value={this}>
        {children}
      </NamespaceContext.Provider>
    );
  }
}

export default forwardRef((props, ref) => (
  <NamespaceContext.Consumer>
    {namespace => (
      <Namespace
        {...props}
        namespace={namespace}
        ref={ref}
      />
    )}
  </NamespaceContext.Consumer>
));
