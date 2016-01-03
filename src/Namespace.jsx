import { Component, PropTypes, Children } from 'react';

export default class LocaleProvider extends Component {
  static propTypes = {
    namespace: PropTypes.string,
    replace: PropTypes.bool,
  };

  static childContextTypes = {
    namespace: PropTypes.object.isRequired,
  };

  static contextTypes = {
    namespace: PropTypes.object,
  };

  getNamespace() {
    const { namespace, replace } = this.props;
    if (replace || !namespace) {
      return namespace;
    }

    if (this.context.namespace) {
      const parentNamespace = this.context.namespace.getNamespace();
      if (parentNamespace) {
        return `${parentNamespace}.${namespace}`;
      }
    }

    return namespace;
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
