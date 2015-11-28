import React, { Component, PropTypes } from 'react';
import LocaleProvider from './LocaleProvider';

export default class Translate extends Component {
  static contextTypes = {
    ...LocaleProvider.childContextTypes,
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    className: PropTypes.string,
    params: PropTypes.object,
    props: PropTypes.object,
  };

  static defaultProps = {
    tagName: 'span',
  };

  render() {
    const { path, tagName, params, props = {} } = this.props;

    const translate = this.context.translate;
    const text = translate.get(path, params || this.props);

    return React.createElement(tagName, props, text);
  }
}
