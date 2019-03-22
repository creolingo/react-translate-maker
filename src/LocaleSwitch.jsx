// @flow
import { useContext, useCallback } from 'react';
import TranslateContext from './TranslateContext';

type Props = {
  onError?: Function,
  onChange?: Function,
  children: Function,
};

function LocaleSwitch(props: Props) {
  const { onError, onChange, children } = props;
  const { translate } = useContext(TranslateContext);

  const handleChange = useCallback(async (locale: string) => {
    try {
      await translate.setLocale(locale);
      if (onChange) {
        onChange(locale);
      }
    } catch (e) {
      if (onError) {
        onError(e);
      }
    }
  }, []);

  return children({
    locale: translate.getLocale(),
    changeLocale: handleChange,
  });
}

LocaleSwitch.defaultProps = {
  onError: undefined,
  onChange: undefined,
};
