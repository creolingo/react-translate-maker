// @flow
import React, {
  forwardRef, isValidElement, Component, type Node,
} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import LocaleProvider, { LocaleProviderContext } from './LocaleProvider';
import { NamespaceContext } from './Namespace';

type Props = {
  path: string,
  $namespace?: Node,
  $localeProvider: Node,
  defaultValue?: string,
  params?: Object,
  children?: Function | string,
  html?: boolean,
};

export function prepareParams(params: Object, localeProvider: Node) {
  const newParams = {};
  let changed = false;

  Object.keys(params).forEach((key) => {
    const value = params[key];
    const isReactElement = isValidElement(value);
    if (!isReactElement) {
      newParams[key] = value;
    } else {
      changed = true;

      const { children, locale, ...rest } = localeProvider.props;

      newParams[key] = renderToStaticMarkup((
        <LocaleProvider {...rest}>
          {value}
        </LocaleProvider>
      ));
    }
  });

  return changed ? newParams : params;
}

class Translate extends Component<Props> {
  static defaultProps = {
    defaultValue: undefined,
    description: undefined,
    params: undefined,
    children: undefined,
    $namespace: undefined,
    html: false,
  };

  getPath() {
    const { path, $namespace } = this.props;
    if (!$namespace) {
      return path;
    }

    const parentPath = $namespace.getPath();
    if (!parentPath) {
      return path;
    }

    return `${parentPath}.${path}`;
  }

  render() {
    const {
      path,
      $namespace,
      $localeProvider,
      defaultValue,
      params,
      children,
      html,
      ...rest
    } = this.props;

    const updatedDefaultValue = !defaultValue && typeof children !== 'function'
      ? children
      : defaultValue;

    const updatedParams = prepareParams(params || rest, $localeProvider);
    const text = $localeProvider.get(this.getPath(), updatedParams, updatedDefaultValue);

    if (typeof children === 'function') {
      return children(text);
    }

    if (html) {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      );
    }

    return text;
  }
}

export default forwardRef((props, ref) => (
  <LocaleProviderContext.Consumer>
    {({ localeProvider }) => (
      <NamespaceContext.Consumer>
        {({ namespace }) => (
          <Translate
            {...props}
            $localeProvider={localeProvider}
            $namespace={namespace}
            ref={ref}
          />
        )}
      </NamespaceContext.Consumer>
    )}
  </LocaleProviderContext.Consumer>
));
