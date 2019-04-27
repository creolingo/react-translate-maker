// @flow
import {
  cloneElement,
  useContext,
  isValidElement,
  type Node,
} from 'react';
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

  let result = '';
  if (items && items.length === 1) {
    const item = items[0];
    result = item !== undefined ? item : '';
  } else if (items && items.length > 1) {
    // add keys for more items
    result = items.map((item, index) => {
      const isReactElement = isValidElement(item);
      if (isReactElement) {
        return cloneElement(item, {
          key: index,
        });
      }

      return item;
    });
  }

  return typeof children === 'function'
    ? children(result)
    : result;
}

Translate.defaultProps = {
  defaultValue: undefined,
  description: undefined,
  params: undefined,
  children: undefined,
};
