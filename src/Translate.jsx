// @flow
import { cloneElement, useContext, isValidElement, type Node } from 'react';
import NamespaceContext from './NamespaceContext';
import TranslateContext from './TranslateContext';

type Props = {
  path: string,
  $namespace?: Node,
  $localeProvider: Node,
  defaultValue?: string,
  params?: Object,
  children?: Function | string,
};

export default function Translate(props: Props) {
  const {
    path,
    description,
    defaultValue,
    params,
    children,
    ...rest
  } = props;

  const namespace = useContext(NamespaceContext);
  const { translate } = useContext(TranslateContext);
  const finallPath = namespace
    ? `${namespace}.${path}`
    : path;

  const updatedDefaultValue = !defaultValue && typeof children === 'string'
    ? children
    : defaultValue;

  const updatedParams = params || rest;
  const items = translate.get(finallPath, updatedParams, updatedDefaultValue, true);

  if (!items || !items.length) {
    return '';
  } else if (items.length === 1) {
    return items[0] || '';
  }

  // add keys for more items
  items.map((item, index) => {
    const isReactElement = isValidElement(item);
    if (isReactElement) {
      return cloneElement(item, {
        key: index,
      });
    }

    return item;
  });
}

Translate.defaultProps = {
  defaultValue: undefined,
  description: undefined,
  params: undefined,
  children: undefined,
};
