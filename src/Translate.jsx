// @flow
import React, { useContext, isValidElement, type Node } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import LocaleProvider from './LocaleProvider';
import NamespaceContext from './NamespaceContext';
import TranslateContext from './TranslateContext';

type Props = {
  path: string,
  $namespace?: Node,
  $localeProvider: Node,
  defaultValue?: string,
  params?: Object,
  children?: Function | string,
  html?: boolean,
};

function prepareParams(params: Object, translate: Object) {
  const newParams = {};
  let changed = false;

  Object.keys(params).forEach((key) => {
    const value = params[key];
    const isReactElement = isValidElement(value);
    if (!isReactElement) {
      newParams[key] = value;
    } else {
      changed = true;

      newParams[key] = renderToStaticMarkup((
        <LocaleProvider translate={translate}>
          {value}
        </LocaleProvider>
      ));
    }
  });

  return changed
    ? newParams
    : params;
}

export default function Translate(props: Props) {
  const {
    path,
    description,
    defaultValue,
    params,
    children,
    html,
    ...rest
  } = props;

  const namespace = useContext(NamespaceContext);
  const translate = useContext(TranslateContext);
  const finallPath = namespace
    ? `${namespace}.${path}`
    : path;

  const updatedDefaultValue = !defaultValue && typeof children === 'string'
    ? children
    : defaultValue;

  const updatedParams = prepareParams(params || rest, translate);
  const text = translate.get(finallPath, updatedParams, updatedDefaultValue) || '';

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

Translate.defaultProps = {
  defaultValue: undefined,
  description: undefined,
  params: undefined,
  children: undefined,
  html: false,
};
