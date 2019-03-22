// @flow
import React, { useEffect, useState, type Node } from 'react';
import Translate from 'translate-maker';
import TranslateContext from './TranslateContext';
import useUpdate from './useUpdate';

type Props = {
  children: Node,
  controlled?: boolean,
  locale?: string,
  namespace?: string,
  locales?: string[],
  cache?: Object,
  data?: Object,
  adapter?: Object,
  dotNotation?: boolean,
  mode?: string,
  references?: boolean,
  variables?: boolean,
  combinations?: boolean,
  filters?: Object,
  translate?: Object,
};

export default function LocaleProvider(props: Props) {
  const {
    translate: defaultTranslate,
    locale,
    namespace,
    children,
    controlled,
    ...rest
  } = props;

  const [translate] = useState(defaultTranslate || new Translate(rest));
  const rerender = useUpdate();

  useEffect(() => {
    translate.on('locale', rerender);
    translate.on('changed', rerender);

    return () => {
      translate.removeListener('locale', rerender);
      translate.removeListener('changed', rerender);
    };
  }, [translate]);

  useEffect(() => {
    if (controlled && locale) {
      translate.setLocale(locale, namespace);
    }
  }, [controlled, locale, namespace]);

  return (
    <TranslateContext.Provider value={translate}>
      {children}
    </TranslateContext.Provider>
  );
}

LocaleProvider.defaultProps = {
  controlled: true,
  /*
  locale: undefined,
  namespace: undefined,
  locales: undefined,
  cache: undefined,
  data: undefined,
  adapter: undefined,
  dotNotation: undefined,
  mode: undefined,
  references: undefined,
  variables: undefined,
  combinations: undefined,
  filters: undefined,
  translate: undefined,
  */
};
