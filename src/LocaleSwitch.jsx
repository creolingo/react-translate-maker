import React, { Component, PropTypes } from 'react';
import LocaleProvider from './LocaleProvider';

export default class LocaleSwitch extends Component {
  static contextTypes = {
    ...LocaleProvider.childContextTypes,
  };

  static defaultProps = {
    setLocale: true,
  };

  static propTypes = {
    locales: PropTypes.array.isRequired,
    setLocale: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onLocaleChange: PropTypes.func,
    onError: PropTypes.func,
  };

  onChange = async (evn) => {
    evn.stopPropagation();

    const { locales, onChange, onError, setLocale, onLocaleChange } = this.props;
    const translate = this.context.translate;

    const value = evn.target.value;
    const exists = locales.find(l => l.locale === value);
    if (!exists) {
      return;
    }

    if (setLocale && !translate.props.controlled) {
      try {
        await translate.setLocale(value);
        if (onLocaleChange) {
          onLocaleChange(value);
        }
      } catch (e) {
        if (onError) {
          onError(e);
          return;
        }
      }
    }

    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const translate = this.context.translate;
    const locale = translate.getLocale();
    const { locales } = this.props;

    const selectProps = {
      ...this.props,
    };

    delete selectProps.setLocale;
    delete selectProps.locales;
    delete selectProps.onLocaleChange;

    return (
      <select
        {...selectProps}
        value={locale}
        onChange={this.onChange}
      >
        {locales.map((option, pos) => (
          <option value={option.locale} key={pos}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
}
