import React, { isValidElement, Component, PropTypes } from 'react';
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
    const { tagName, params, defaultValue, className, props = {} } = this.props;

    const path = this.getPath();

    const { translate } = this.context;

    const currentProps = params || this.props;
    const updatedProps = prepareProps(currentProps, translate);
    const text = translate.get(path, updatedProps, defaultValue);

    if (className && !props.className) {
      props.className = className;
    }

    return React.createElement(tagName, props, text);
  }
}
