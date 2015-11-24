import React, { Component, PropTypes } from 'react';
import Provider from './Provider';

export default class Translate extends Component {
  static contextTypes = {
    ...Provider.childContextTypes,
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    className: PropTypes.string,
    params: PropTypes.object,
  };

  static defaultProps = {
    tagName: 'span',
  };

  render() {
    const { path, tagName, params } = this.props;
    const translate = this.context.translate;
    const text = translate.get(path, params || this.props);

    const elementProps = {
      className: this.props.className,
    };

    return React.createElement(tagName, elementProps, text);
  }
}
