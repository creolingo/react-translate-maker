import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
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

  @autobind
  handleChange(evn) {
    evn.stopPropagation();

    const { locales, onChange, onError, setLocale, onLocaleChange } = this.props;
    const translate = this.context.translate;

    const value = evn.target.value;

    for (let index = 0; index < locales.length; index += 1) {
      const { locale } = locales[index];
      if (locale !== value) {
        continue;
      }

      if (setLocale && !translate.props.controlled) {
        translate.setLocale(locale, (err) => {
          if (err && onError) {
            onError(err);
            return;
          }

          if (onLocaleChange) {
            setTimeout(() => onLocaleChange(locale), 0);
          }
        });
      }

      if (onChange) {
        onChange(locale);
      }

      return;
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
        onChange={this.handleChange}
      >
        {locales.map((option, pos) =>
          <option value={option.locale} key={pos}>{option.label}</option>
        )}
      </select>
    );
  }
}
