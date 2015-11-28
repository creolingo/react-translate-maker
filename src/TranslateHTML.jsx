import React, { Component, PropTypes } from 'react';
import Provider from './Provider';

export default class TranslateHTML extends Component {
  static contextTypes = {
    ...Provider.childContextTypes,
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    className: PropTypes.string,
    params: PropTypes.object,
    props: PropTypes.object,
    children: PropTypes.node,
  };

  static defaultProps = {
    tagName: 'span',
  };

  render() {
    const { path, tagName, params, props = {}, children } = this.props;

    const translate = this.context.translate;
    const text = translate.get(path, params || this.props);

    const elementProps = {
      ...props,
      dangerouslySetInnerHTML: {
        __html: text,
      }
    };

    return React.createElement(tagName, elementProps, children);
  }
}
