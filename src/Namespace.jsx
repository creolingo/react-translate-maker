// @flow
import React, {
  forwardRef, createContext, Component, type Node,
} from 'react';

const { Provider, Consumer } = createContext({});

export const NamespaceConsumer = Consumer;

type Props = {
  path?: string,
  compose?: boolean,
  children: Node,
  namespace?: Node,
};

class Namespace extends Component<Props> {
  static defaultProps = {
    path: undefined,
    compose: undefined,
    namespace: undefined,
  };

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
      <Provider value={{ namespace: this }}>
        {children}
      </Provider>
    );
  }
}

export default forwardRef((props, ref) => (
  <Consumer>
    {({ namespace }) => (
      <Namespace
        {...props}
        namespace={namespace}
        ref={ref}
      />
    )}
  </Consumer>
));
