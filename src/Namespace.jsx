import { Component, PropTypes, Children } from 'react';

export default class LocaleProvider extends Component {
  static propTypes = {
    path: PropTypes.string,
    compose: PropTypes.bool,
  };

  static childContextTypes = {
    namespace: PropTypes.object.isRequired,
  };

  static contextTypes = {
    namespace: PropTypes.object,
  };

  getPath() {
    const { path, compose } = this.props;
    if (!compose || !path) {
      return path;
    }

    if (this.context.namespace) {
      const parentPath = this.context.namespace.getPath();
      if (parentPath) {
        return `${parentPath}.${path}`;
      }
    }

    return path;
  }

  getChildContext() {
    return {
      namespace: this,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
