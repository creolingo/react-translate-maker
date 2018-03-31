import React, { isValidElement, Component } from 'react';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';
import forEach from 'lodash/forEach';
import LocaleProvider from './LocaleProvider';

export function prepareProps(props, localeProvider) {
  const newProps = {};
  let changed = false;

  forEach(props, (value, key) => {
    const isReactElement = isValidElement(value);
    if (!isReactElement) {
      newProps[key] = value;
      return;
    }

    changed = true;
    const { children, locale, ...rest } = localeProvider.props;
    newProps[key] = renderToStaticMarkup((
      <LocaleProvider {...rest}>
        {value}
      </LocaleProvider>
    ));
  });

  return changed ? newProps : props;
}

export default class Translate extends Component {
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
    render: PropTypes.func,
  };

  static defaultProps = {
    tagName: 'span',
    defaultValue: undefined,
    description: undefined,
    className: undefined,
    params: undefined,
    props: undefined,
    children: undefined,
    render: undefined,
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
    const {
      tagName,
      params,
      children,
      defaultValue = children,
      className,
      render,
      props = {},
    } = this.props;

    const path = this.getPath();

    const { translate } = this.context;

    const currentProps = params || this.props;
    const updatedProps = prepareProps(currentProps, translate);
    const text = translate.get(path, updatedProps, defaultValue);

    if (typeof render === 'function') {
      return render({ text });
    } else if (typeof children === 'function') {
      return children({ text });
    }

    if (className && !props.className) {
      props.className = className;
    }

    return React.createElement(tagName, props, text);
  }
}
