import React, { Component, PropTypes } from 'react';
import LocaleProvider from './LocaleProvider';

export default class Translate extends Component {
  static contextTypes = {
    ...LocaleProvider.childContextTypes,
    namespace: PropTypes.object,
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    params: PropTypes.object,
    props: PropTypes.object,
  };

  static defaultProps = {
    tagName: 'span',
  };

  getPath() {
    const { path } = this.props;
    const { namespace } = this.context;
    if (!namespace) {
      return path;
    }

    const parentPath = namespace.getPath();
    if (!parentPath) {
      return path;
    }

    return `${parentPath}.${path}`;
  }

  render() {
    const { tagName, params, defaultValue, props = {} } = this.props;

    const path = this.getPath();

    const translate = this.context.translate;
    const text = translate.get(path, params || this.props, defaultValue);

    if (typeof tagName !== 'string') {
      return tagName(props, text);
    }

    return React.createElement(tagName, props, text);
  }
}
