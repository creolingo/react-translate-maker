// @flow
import React, { forwardRef, Component, type Node } from 'react';
import { LocaleProviderContext } from './LocaleProvider';

type Props = {
  localeProvider: Node,
  onError?: Function,
  onChange?: Function,
  children: Function,
};

class LocaleSwitch extends Component<Props> {
  static defaultProps = {
    onError: undefined,
    onChange: undefined,
  };

  handleChange = async (locale: string) => {
    const { onError, onChange, localeProvider } = this.props;

    try {
      await localeProvider.setLocale(locale);
      if (onChange) {
        onChange(locale);
      }
    } catch (e) {
      if (onError) {
        onError(e);
      }
    }
  }

  render() {
    const { children, localeProvider } = this.props;

    return children({
      locale: localeProvider.getLocale(),
      changeLocale: this.handleChange,
    });
  }
}

export default forwardRef((props, ref) => (
  <LocaleProviderContext.Consumer>
    {({ localeProvider }) => (
      <LocaleSwitch
        {...props}
        localeProvider={localeProvider}
        ref={ref}
      />
    )}
  </LocaleProviderContext.Consumer>
));
