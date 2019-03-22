// @flow
import { useContext, useCallback } from 'react';
import TranslateContext from './TranslateContext';
import NamespaceContext from './NamespaceContext';

type Props = {
  children: Function,
  ignoreNamespace?: boolean,
};

function ProvideTranslate(props: Props) {
  const { children, ignoreNamespace } = props;
  const namespace = useContext(NamespaceContext);
  const translate = useContext(TranslateContext);

  const t = useCallback((path: string, ...args) => {
    const finallPath = namespace && !ignoreNamespace
      ? `${namespace}.${path}`
      : path;

    return translate.get(finallPath, ...args);
  }, [translate, namespace, ignoreNamespace]);

  return children(t);
}

ProvideTranslate.defaultProps = {
  ignoreNamespace: false,
};
