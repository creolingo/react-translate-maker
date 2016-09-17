import React, { Component, PropTypes } from 'react';
import LocaleProvider from './LocaleProvider';
import { prepareProps } from './Translate';

export default class TranslateHTML extends Component {
  static contextTypes = {
    ...LocaleProvider.childContextTypes,
    namespace: PropTypes.object,
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
    params: PropTypes.object,
    props: PropTypes.object,
    children: PropTypes.node,
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
    const { tagName, params, defaultValue, props = {}, children, className } = this.props;

    const path = this.getPath();
    const { translate } = this.context;

    const currentProps = params || this.props;
    const updatedProps = prepareProps(currentProps, translate);
    const text = translate.get(path, updatedProps, defaultValue);

    const elementProps = {
      className,
      ...props,
      dangerouslySetInnerHTML: {
        __html: text,
      },
    };

    return React.createElement(tagName, elementProps, children);
  }
}
