// @flow
import {
  cloneElement,
  useContext,
  isValidElement,
  type Node,
} from 'react';
import NamespaceContext from './NamespaceContext';
import TranslateContext from './TranslateContext';

function prepareItems(items) {
  if (!items || !items.length) {
    return '';
  }

  let stringsCount = 0;
  const values = items.map((item, index) => {
    const value = Array.isArray(item)
      ? prepareItems(item)
      : item;

    if (isValidElement(value)) {
      return cloneElement(value, {
        key: index,
      });
    }

    const type = typeof value;
    if (type === 'string') {
      stringsCount += 1;
      return value;
    } else if (type === 'number') {
      stringsCount += 1;
      return String(value);
    }

    return value;
  });

  return stringsCount === values.length
    ? values.join('')
    : values;
}

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
  const result = prepareItems(items);

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
